import { defineStore } from 'pinia';
import type { ContentItem } from '@/types/TextReaderTypes';

export const useSelectSortStore = defineStore('SelectSort', {
  //数据存储
  state: () => ({
    content: {
      1: [
        {
          type: 'text',
          content: '选择排序',
          class: 'title',
        },
      ],
      2: [],
    } as Record<number, ContentItem[]>,
    practice: {
      1: [
        {
          type: 'text',
          content: `选择排序练习1`,
          class: 'content',
        },
      ],
    } as Record<number, ContentItem[]>,
  }),
});
