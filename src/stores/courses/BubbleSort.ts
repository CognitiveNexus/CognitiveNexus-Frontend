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
          content: `欢迎来到冒泡排序章节！在本章节中，我们会跟随小骑士进行一场奇幻的冒险，挑选最好的武器和装备，向远处的目的地进发。`,
          class: "content",
        },
        {
          type: "text",
          content: `如果你准备好了的话，就点击右边的翻页箭头，让我们开始这一章节的冒险吧！`,
          class: "content",
        },
        {
          type: "text",
          content: `TIPS：本章节会大量用到for循环以及if判断的知识，请确保你已经熟练掌握了这两个语句`,
          class: "highlight",
        },
      ],
      2: [
        {
          type: "text",
          content: "🔮前言：算法的圣约",
          class: "title",
        },
        {
          type: "text",
          content: `在古老的算法大陆上，流传着一卷褪色的羊皮手札：`,
          class: "content",
        },
        {
          type: "text",
          content: `"当混乱吞噬秩序时，持盾者将用布尔之眼甄选真理，执剑者将以极值之光劈开迷雾，而真正的勇者，会让人群如气泡般轻盈归位。"`,
          class: "highlight",
        },
        {
          type: "text",
          content: `你，一名刚获得编程纹章的见习骑士，在月夜收到神秘信笺——羊皮纸上跳动的不是文字，而是一串未排序的数组。信末烙印着魔王的狂笑："若连村民的身高都无法理顺，如何破解我的混沌结界？"`,
          class: "content",
        },
        {
          type: "text",
          content: `推开吱呀作响的城堡图书馆大门，尘封的《排序圣典》自动翻页，泛着蓝光的代码如星河倾泻。原来早在千年前，先知们就将对抗混沌的魔法藏在最朴素的逻辑里：`,
          class: "content",
        },
        {
          type: "text",
          content: "比较、交换、循环直至有序",
          class: "highlight",
        },
        {
          type: "text",
          content: `此刻，你腰间的铜钥匙突然发热变形，化作一柄可擦拭的代码剑。命运的齿轮开始转动——这趟征程，每个抉择都在揭示算法的本质，而魔王城堡尖塔上闪烁的，正是无数程序员终其一生追寻的真理：以优雅逻辑，驯服无序世界。`,
          class: "content",
        },
      ],
      3: [
        {
          type: "text",
          content: "🗡️第一章：武器店的试炼",
          class: "title",
        },
        {
          type: "text",
          content: `你为了做好讨伐魔王的准备，决定前往武器店买一点趁手的装备防身，于是你走向村子西面的武器店，那里住着一位年迈的铁匠，他的手艺很好，他铸出的剑斩铁如泥，他铸造的盾坚如磐石。`,
          class: "content",
        },
        {
          type: "text",
          content: `但是早有听闻要获得这优质的装备并非没有代价，过去不少人觊觎这精良的武器，却被铁匠的重重考验拒之门外，失望而归，你不禁怀疑，你真的能通过铁匠的考验吗？`,
          class: "content",
        },
        {
          type: "break",
        },
        {
          type: "text",
          content: `走进武器店，老铁匠擦拭着柜台，两枚盾牌在烛光下泛着寒光："年轻的骑士啊，左边青铜盾防御力85，右边白银盾防御力93，但每人只能选一枚..."你知道是时候拔出你的代码剑了，该如何比较这两个盾牌哪个更好呢？`,
          class: "content",
        },
        {
          type: "break",
        },
        {
          type: "text",
          content: `TIPS:盾牌的防御力一般越高越好，我们应该如何选出防御力高的那个盾牌呢？尝试使用if语句去比较吧，这是铁匠老板为你设置的第一道考验，翻到下一页，用你的代码剑写出你的答案吧！`,
          class: "highlight",
        },
      ],
    } as Record<number, ContentItem[]>,
  }),
});
