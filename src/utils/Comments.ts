import { ElNotification } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/Auth';
import sendRequest from '@/utils/SendRequest';

export type Comment = {
  id: number;
  username: string;
  content: string;
  createdAt: Date;
  totalLikes: number;
  ownRate: CommentRate;
};
export type CommentRate = 0 | 1 | -1;

export const getComments = async (courseName: string): Promise<Comment[]> => {
  const { isAuthenticated } = storeToRefs(useAuthStore());
  if (!isAuthenticated.value) return [];
  try {
    const response = await sendRequest(true, `/api/comments/${courseName}`);
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    return result.comments.map((comment: any) => ({
      ...comment,
      createdAt: new Date(comment.createdAt),
    }));
  } catch (err) {
    ElNotification({
      title: '错误',
      message: `获取评论时出现问题：${(err as Error).message}`,
      type: 'error',
    });
    return [];
  }
};

export const addComment = async (courseName: string, content: string): Promise<boolean> => {
  try {
    const response = await sendRequest(true, `/api/comments/${courseName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    return true;
  } catch (err) {
    ElNotification({
      title: '错误',
      message: `添加评论时出现问题：${(err as Error).message}`,
      type: 'error',
    });
    return false;
  }
};

export const likeComment = async (courseName: string, commentId: number, rate: CommentRate): Promise<boolean> => {
  try {
    const response = await sendRequest(true, `/api/comments/${courseName}/${commentId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rate }),
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    return true;
  } catch (err) {
    ElNotification({
      title: '错误',
      message: `点赞评论时出现问题：${(err as Error).message}`,
      type: 'error',
    });
    return false;
  }
};
