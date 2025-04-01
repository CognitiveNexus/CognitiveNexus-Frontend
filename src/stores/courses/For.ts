import { defineStore } from 'pinia';
import type { ContentItem, Mapping } from '@/types/TextReaderTypes';

export const useForStore = defineStore('For', {
  //数据存储
  state: () => ({
    map: [] as Mapping[],
    content: {
      1: [
        {
          type: 'text',
          content: 'For循环',
          class: 'title',
        },
      ],
      2: [],
    } as Record<number, ContentItem[]>,
    practice: {
      1: [
        {
          type: 'text',
          content: `for练习1`,
          class: 'content',
        },
      ],
    } as Record<number, ContentItem[]>,
  }),
});
