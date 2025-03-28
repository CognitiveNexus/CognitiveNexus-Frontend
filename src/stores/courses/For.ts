import { defineStore } from "pinia";
import type { ContentItem } from "@/types/TextReaderTypes";

export const useForStore = defineStore("For", {
  //数据存储
  state: () => ({
    content: {
      1: [
        {
          type: "text",
          content: "For循环",
          class: "title",
        },
      ],
      2: [],
    } as Record<number, ContentItem[]>,
  }),
});
