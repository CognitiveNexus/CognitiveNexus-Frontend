import { defineStore } from 'pinia';
import type { ContentItem, Mapping } from '@/types/TextReaderTypes';

export const useSelectSortStore = defineStore('SelectSort', {
  //数据存储
  state: () => ({
    map: [] as Mapping[],
    content: {
      1: [
        {
          type: 'text',
          content: '选择排序',
        },
      ],
      2: [],
    } as Record<number, ContentItem[]>,
    practice: {
      1: [
        {
          type: 'text',
          content: `选择排序练习1`,
        },
      ],
    } as Record<number, ContentItem[]>,
  }),
});
