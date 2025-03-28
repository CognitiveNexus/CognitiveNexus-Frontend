import { defineStore } from "pinia";
import type { ContentItem } from "@/types/TextReaderTypes";

export const useBubbleSortStore = defineStore("BubbleSort", {
  //数据存储
  state: () => ({
    content: {
      1: [
        {
          type: "text",
          content: "冒泡排序",
          class: "title",
        },
        {
          type: "text",
          content: `欢迎来到冒泡排序的章节！！！`,
          class: "content",
        },
        {
          type: "break",
        },
        {
          type: "tag",
          content: [
            {
              text: "for循环",
              tagtype: "primary",
              effect: "dark",
              size: "small",
            },
            {
              text: "if判断",
              tagtype: "primary",
              effect: "dark",
              size: "small",
            },
          ],
        },
        {
          type: "text",
          content: `在本章节中，我们会跟随小骑士进行一场奇幻的冒险，挑选最好的武器和装备，向远处的目的地进发`,
          class: "content",
        },
        {
          type: "text",
          content: `让我试试高亮`,
          class: "highlight",
        },
      ],
      2: [],
    } as Record<number, ContentItem[]>,
  }),
});
