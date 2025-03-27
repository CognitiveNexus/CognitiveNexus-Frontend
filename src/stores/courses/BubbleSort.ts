import { defineStore } from 'pinia'
import { getImage } from '@/utils'
import type { ContentItem } from '@/types/TextReaderTypes';

export const useBubbleSortStore = defineStore("BubbleSort", {
  //数据存储
  state: () => ({
    content: {
      1: [
        {
          type: "text",
          content: "冒泡排序",
          class: "title"
        },
        {
          type: "text",
          content: `冒泡排序（Bubble Sort）是一种简单的排序算法，它通过重复地遍历待排序的列表，比较相邻的元素并交换它们的位置来实现排序。该算法的名称来源于较小的元素会像"气泡"一样逐渐"浮"到列表的顶端。`,
          class: "content"
        },
        {
          type: "break",
        },
        {
          type: "text",
          content: `在本章节中，我们会一步一步，模块化地学习如何实现这个最基础的排序算法，点击右边的箭头，前往下一页吧！`,
          class: "content"
        },
        {
          type: "text",
          content: `让我试试高亮`,
          class: "highlight"
        },
        {
          type: "image",
          src: getImage("../assets/9.png"),
          height: "50"
        }
      ],
      2: [
        
      ]
    } as Record<number, ContentItem[]>,
  })
})