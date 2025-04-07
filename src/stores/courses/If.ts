import { defineStore } from 'pinia';
import type { ContentItem, Mapping, CodeTest } from '@/types/TextReaderTypes';

export const useIfStore = defineStore('If', {
  //数据存储
  state: () => ({
    map: [] as Mapping[],
    content: {
      1: [
        {
          type: 'text',
          content: 'If判断',
        },
      ],
      2: [],
    } as Record<number, ContentItem[]>,
    practice: {
      1: [
        {
          type: 'text',
          content: `if练习1`,
        },
      ],
    } as Record<number, ContentItem[]>,
    judge: {} as Record<number, CodeTest[]>,
    randomJudge: {},
  }),
});
