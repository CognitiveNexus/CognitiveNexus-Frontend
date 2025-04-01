import { defineStore } from 'pinia';
import type { ContentItem, Mapping } from '@/types/TextReaderTypes';

export const useBubbleSortStore = defineStore('BubbleSort', {
  //数据存储
  state: () => ({
    map: [
      { page: 3, practice: 1, solved: false },
      { page: 4, practice: 2, solved: false },
    ] as Mapping[],
    content: {
      1: [
        {
          type: 'text',
          content: '冒泡排序',
          class: 'title',
        },
        {
          type: 'tag',
          content: [
            {
              text: 'for循环',
              tagtype: 'primary',
              effect: 'dark',
              size: 'small',
            },
            {
              text: 'if判断',
              tagtype: 'primary',
              effect: 'dark',
              size: 'small',
            },
          ],
        },
        {
          type: 'text',
          content: `欢迎来到冒泡排序章节！在本章节中，我们会跟随小骑士进行一场奇幻的冒险，挑选最好的武器和装备，向远处的目的地进发。`,
          class: 'content',
        },
        {
          type: 'text',
          content: `如果你准备好了的话，就点击右边的翻页箭头，让我们开始这一章节的冒险吧！`,
          class: 'content',
        },
        {
          type: 'text',
          content: `TIPS：本章节会大量用到for循环以及if判断的知识，请确保你已经熟练掌握了这两个语句`,
          class: 'highlight',
        },
      ],
      2: [
        {
          type: 'text',
          content: '🔮前言：算法的圣约',
          class: 'title',
        },
        {
          type: 'text',
          content: `在古老的算法大陆上，流传着一卷褪色的羊皮手札：`,
          class: 'content',
        },
        {
          type: 'text',
          content: `"当混乱吞噬秩序时，持盾者将用布尔之眼甄选真理，执剑者将以极值之光劈开迷雾，而真正的勇者，会让人群如气泡般轻盈归位。"`,
          class: 'highlight',
        },
        {
          type: 'text',
          content: `你，一名刚获得编程纹章的见习骑士，在月夜收到神秘信笺——羊皮纸上跳动的不是文字，而是一串未排序的数组。信末烙印着魔王的狂笑："若连村民的身高都无法理顺，如何破解我的混沌结界？"`,
          class: 'content',
        },
        {
          type: 'text',
          content: `推开吱呀作响的城堡图书馆大门，尘封的《排序圣典》自动翻页，泛着蓝光的代码如星河倾泻。原来早在千年前，先知们就将对抗混沌的魔法藏在最朴素的逻辑里：`,
          class: 'content',
        },
        {
          type: 'text',
          content: '比较、交换、循环直至有序',
          class: 'highlight',
        },
        {
          type: 'text',
          content: `此刻，你腰间的铜钥匙突然发热变形，化作一柄可擦拭的代码剑。命运的齿轮开始转动——这趟征程，每个抉择都在揭示算法的本质，而魔王城堡尖塔上闪烁的，正是无数程序员终其一生追寻的真理：以优雅逻辑，驯服无序世界。`,
          class: 'content',
        },
      ],
      3: [
        {
          type: 'text',
          content: '🗡️第一章：武器店的试炼',
          class: 'title',
        },
        {
          type: 'text',
          content: `你为了做好讨伐魔王的准备，决定前往武器店买一点趁手的装备防身，于是你走向村子西面的武器店，那里住着一位年迈的铁匠，他的手艺很好，他铸出的剑斩铁如泥，他铸造的盾坚如磐石。`,
          class: 'content',
        },
        {
          type: 'text',
          content: `但是早有听闻要获得这优质的装备并非没有代价，过去不少人觊觎这精良的武器，却被铁匠的重重考验拒之门外，失望而归，你不禁怀疑，你真的能通过铁匠的考验吗？`,
          class: 'content',
        },
        {
          type: 'break',
        },
        {
          type: 'text',
          content: `走进武器店，老铁匠擦拭着柜台，两枚盾牌在烛光下泛着寒光："年轻的骑士啊，左边青铜盾防御力85，右边白银盾防御力93，但每人只能选一枚..."你知道是时候拔出你的代码剑了，该如何比较这两个盾牌哪个更好呢？`,
          class: 'content',
        },
        {
          type: 'break',
        },
        {
          type: 'text',
          content: `TIPS:盾牌的防御力一般越高越好，我们应该如何选出防御力高的那个盾牌呢？尝试使用if语句去比较吧，这是铁匠老板为你设置的第一道考验，翻到下一页，用你的代码剑写出你的答案吧！`,
          class: 'highlight',
        },
        {
          type: 'button',
          content: [
            {
              text: `接受试炼`,
              size: 'large',
              buttontype: 'primary',
              targetIndex: 1,
            },
          ],
        },
      ],
      4: [
        {
          type: 'text',
          content: '🗡️第一章：武器店的试炼',
          class: 'title',
        },
        {
          type: 'text',
          content: `你抽出代码剑，在空中绘出几行代码，眨眼间两个盾牌漂浮在空中，犹如被放置在天平的两端，一段时间后，品质更好的那个盾牌便飞入了你的手中，看来是你的比较大小的代码确实生效了！`,
          class: 'content',
        },
        {
          type: 'text',
          content: `老铁匠眯起眼睛："看来你懂得比较的智慧。但真正的考验在这里——"他推出一本泛黄的古籍，上面密密麻麻记录着999把武器的攻击数值。当你翻开时，数字像蚂蚁般在羊皮纸上爬动。`,
          class: 'content',
        },
        {
          type: 'text',
          content: `你知道这又是一道考验，而且比上一道考验难上不少。`,
          class: 'content',
        },
        {
          type: 'text',
          content: `老铁匠开口了：`,
          class: 'content',
        },
        {
          type: 'text',
          content: `“这本书记载着999把武器，但你只能拿走这本书上记载的最后一把武器，但是我允许你交换相邻两把武器的顺序！请问你真的有实力取得那把勇者之剑吗？”`,
          class: 'highlight',
        },
        {
          type: 'break',
        },
        {
          type: 'text',
          content: `TIPS:这是实现冒泡排序的第一步，通过从头到尾遍历数组，交换相邻的元素，尝试仅通过一次遍历，把最大的元素放到数组最后吧！在试炼页中，我们会更深入地探讨实现的方法！`,
          class: 'highlight',
        },
        {
          type: 'break',
        },
        {
          type: 'button',
          content: [
            {
              text: `接受试炼`,
              size: 'large',
              buttontype: 'primary',
              targetIndex: 2,
            },
          ],
        },
      ],
      5: [],
    } as Record<number, ContentItem[]>,
    practice: {
      1: [
        {
          type: 'text',
          content: `武器店的试炼 I`,
          class: 'title',
        },
        {
          type: 'text',
          content: `你现在正在武器店内挑选合适的盾牌，请使用if语句选出最好的那一个盾牌！这对你未来的冒险十分重要！`,
          class: 'content',
        },
        {
          type: 'text',
          content: `我们可以分别将两个盾的防御值设为a与b，通过输入a与b后比较a与b的大小得出结果！`,
          class: 'content',
        },
        {
          type: 'break',
        },
        {
          type: 'text',
          content: `输入格式：`,
          class: 'highlight',
        },
        {
          type: 'text',
          content: `两个整数，中间用空格隔开，如“1 2”。`,
          class: 'content',
        },
        {
          type: 'break',
        },
        {
          type: 'text',
          content: `测试样例：`,
          class: 'highlight',
        },
        {
          type: 'text',
          content: `输入：13 21    输出：白银盾`,
          class: 'content',
        },
        {
          type: 'text',
          content: `输入：31 21    输出：青铜盾`,
          class: 'content',
        },
        {
          type: 'button',
          content: [
            {
              text: `返回课程`,
              size: 'large',
              buttontype: 'primary',
              targetIndex: 4,
            },
          ],
        },
      ],
      2: [
        {
          type: 'text',
          content: `武器店的试炼 II`,
          class: 'title',
        },
        {
          type: 'text',
          content: `我们再回顾一下老铁匠的要求：`,
          class: 'content',
        },
        {
          type: 'text',
          content: `要求只通过一次遍历，仅能交换相邻的元素，实现将最大的元素移到数组的最后一位。`,
          class: 'highlight',
        },
        {
          type: 'break',
        },
        {
          type: 'text',
          content: `首先我们解决以下交换相邻元素的问题，我们希望“越大的值越往后”，那么可不可以在比较的时候让最大的值往后走，即：`,
          class: 'content',
        },
        {
          type: 'text',
          content: `有a与b，比较a与b，若a比b大，则交换a与b的位置。`,
          class: 'highlight',
        },
        {
          type: 'text',
          content: `然后想想仅一次遍历吧，我们从数组开头比较到数组结尾，光说太枯燥了，我们举一个例子：`,
          class: 'content',
        },
        {
          type: 'text',
          content: `比如数组{7,4,1,4,5,9,2,8}，我们从前到后，除开最后一个数没有后一位数，其他的数都进行刚才提到的比较，我们会发现最大的9已经走到最后一位了！最后的数组是{4,1,4,5,7,2,8,9}`,
          class: 'highlight',
        },
        {
          type: 'break',
        },
        {
          type: 'text',
          content: `为了方便理解，我们提供了上述数组比较的可视化图，尝试去理解一下它的妙处吧！`,
          class: 'content',
        },
        {
          type: 'visualizer',
          name: 'ColumnChart',
        },
        {
          type: 'button',
          content: [
            {
              text: `返回课程`,
              size: 'large',
              buttontype: 'primary',
              targetIndex: 5,
            },
          ],
        },
      ],
    } as Record<number, ContentItem[]>,
  }),
});
