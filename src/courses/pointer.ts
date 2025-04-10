import { createTitle, createText, createButtons, createTags, createTips, createCongratulation, createVideo } from '@/utils/CreateCourse';
import type { CoursePage } from '@/types/CourseTypes';

const pages: CoursePage[] = [
  {
    type: 'story',
    emblem: 'magicBook',
    contents: [
      createTitle(`指针`),
      createTags([{ text: '变量', type: 'primary', effect: 'dark', size: 'small' }]),
      createText(`指针是 C 语言的特色，也是一大难点。不过不用担心，通过本课程的学习，相信你能够熟练掌握指针的使用！`),
    ],
  },
  {
    type: 'story',
    emblem: 'magicBook',
    contents: [createVideo('bilibili', 'BV1YB4y1D7cS')],
  },
];

export default {
  name: '指针',
  id: 'pointer',
  pages: pages,
};
