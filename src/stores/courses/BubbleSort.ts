import { defineStore } from 'pinia';
import type { ContentItem, Mapping, CodeTest } from '@/types/TextReaderTypes';

export const useBubbleSortStore = defineStore('BubbleSort', {
  //数据存储
  state: () => ({
    map: [
      { page: 3, practice: 1, solved: false },
      { page: 4, practice: 2, solved: false },
      { page: 6, practice: 3, solved: false },
    ] as Mapping[],
    content: {
      1: [
        {
          type: 'title',
          content: `冒泡排序`,
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
          content: `欢迎来到**冒泡排序**章节！在本章节中，我们会跟随小骑士进行一场奇幻的冒险，挑选最好的武器和装备，向远处的目的地进发。\n如果你准备好了的话，就点击右边的翻页箭头，让我们开始这一章节的冒险吧！\n> **TIPS**：本章节会大量用到**for循环**以及**if判断**的知识，请确保你已经熟练掌握了这两个语句`,
        },
      ],
      2: [
        {
          type: 'title',
          content: '🔮前言：算法的圣约',
        },
        {
          type: 'text',
          content: `在古老的算法大陆上，流传着一卷褪色的羊皮手札：\n"当混乱吞噬秩序时，持盾者将用**布尔之眼**甄选真理，执剑者将以**极值之光**劈开迷雾，而真正的勇者，会让人群如气泡般轻盈归位。"\n你，一名刚获得编程纹章的见习骑士，在月夜收到神秘信笺——羊皮纸上跳动的不是文字，而是一串未排序的数组。信末烙印着魔王的狂笑："若连村民的身高都无法理顺，如何破解我的混沌结界？"\n推开吱呀作响的城堡图书馆大门，尘封的《排序圣典》自动翻页，泛着蓝光的代码如星河倾泻。原来早在千年前，先知们就将对抗混沌的魔法藏在最朴素的逻辑里：\n\` 比较、交换、循环直至有序 \`
          \n此刻，你腰间的铜钥匙突然发热变形，化作一柄可擦拭的代码剑。命运的齿轮开始转动——这趟征程，每个抉择都在揭示算法的本质，而魔王城堡尖塔上闪烁的，正是无数程序员终其一生追寻的真理：以优雅逻辑，驯服无序世界。`,
        },
      ],
      3: [
        {
          type: 'title',
          content: '🗡️武器店的试炼 I',
        },
        {
          type: 'text',
          content: `你为了做好讨伐魔王的准备，决定前往武器店买一点趁手的装备防身，于是你走向村子西面的武器店，那里住着一位年迈的铁匠，他的手艺很好，他铸出的剑斩铁如泥，他铸造的盾坚如磐石。\n但是早有听闻要获得这优质的装备并非没有代价，过去不少人觊觎这精良的武器，却被铁匠的重重考验拒之门外，失望而归，你不禁怀疑，你真的能通过铁匠的考验吗？\n\n走进武器店，老铁匠擦拭着柜台，两枚盾牌在烛光下泛着寒光："年轻的骑士啊，左边青铜盾防御力85，右边白银盾防御力93，但每人只能选一枚..."你知道是时候拔出你的代码剑了，该如何比较这两个盾牌哪个更好呢？\n>**TIPS**:盾牌的防御力一般**越高越好**，我们应该如何选出防御力**高**的那个盾牌呢？尝试使用if语句去比较吧，这是铁匠老板为你设置的第一道考验，翻到下一页，用你的代码剑写出你的答案吧！`,
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
          type: 'title',
          content: '🗡️武器店的试炼 II',
        },
        {
          type: 'text',
          content: `你抽出代码剑，在空中绘出几行代码，眨眼间两个盾牌漂浮在空中，犹如被放置在天平的两端，一段时间后，品质更好的那个盾牌便飞入了你的手中，看来是你的比较大小的代码确实生效了！\n老铁匠眯起眼睛："看来你懂得比较的智慧。但真正的考验在这里——"他推出一本泛黄的古籍，上面密密麻麻记录着999把武器的攻击数值。当你翻开时，数字像蚂蚁般在羊皮纸上爬动。\n你知道这又是一道考验，而且比上一道考验难上不少。\n老铁匠开口了：\n“这本书记载着999把武器，但你只能拿走这本书上记载的最后一把武器，但是我允许你交换相邻两把武器的顺序！请问你真的有实力取得那把勇者之剑吗？”\n\n>**TIPS**:这是实现冒泡排序的第一步，通过从头到尾遍历数组，交换相邻的元素，尝试仅通过一次遍历，把最大的元素放到数组最后吧！在试炼页中，我们会更深入地探讨实现的方法！\n\n`,
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
      5: [
        {
          type: 'title',
          content: '🗡️启程',
        },
        {
          type: 'text',
          content: `"原来如此！"你轻触剑纹，柜中暗格应声而开。老铁匠抚掌大笑："你找到了遍历的奥义！这把传说中攻击力999的圣剑，属于懂得记录极值之人。"\n历经重重考验，你终于获得了属于你的武器与盾牌，是时候向更远大的目标前行了！你看着远处天空弥漫的乌云，魔王城堡的塔尖直冲云端，道道雷电劈下，预示着危险的到来，你知道，不能再拖了。\n你骑上骏马，即刻启程！\n`,
        },
      ],
      6: [
        {
          type: 'title',
          content: `直面魔王`,
        },
        {
          type: 'text',
          content: `漆黑的城堡中，你奋力战斗，终于走到魔王的门前，你的心情忐忑不安。\n魔王缓缓走出，他的身上萦绕着闪亮的黑曜石护盾，看上去几乎坚不可摧，你斩出了伤害为{ 1, 2, 5, 4, 3 }的一套剑技，前三次的斩击似乎并没有被护盾反弹，但打到第四剑时，却被黑曜石护盾远远弹开。你急速后撤翻过石柱，思考着破局的思路。\n魔王哈哈大笑：“我的护盾坚不可摧，你可拥有如此强大的力量？我构筑的算法术式完美无缺！\n你似乎想到什么，攻击的威力必须是不断递增的，否则就会被护盾弹开，前功尽弃，你决定试一试这个方法，现在，你必须准备好下一套递增的剑技，该如何将乱序的排列变成有序的呢？`,
        },
        {
          type: 'button',
          content: [
            {
              text: `打败魔王！`,
              size: 'large',
              buttontype: 'primary',
              targetIndex: 3,
            },
          ],
        },
      ],
      7: [
        {
          type: 'title',
          content: `FIN`,
        },
      ],
    } as Record<number, ContentItem[]>,
    practice: {
      1: [
        {
          type: 'title',
          content: `武器店的试炼 I`,
        },
        {
          type: 'text',
          content: `你现在正在武器店内挑选合适的盾牌，请使用if语句选出最好的那一个盾牌！这对你未来的冒险十分重要！\n我们可以分别将两个盾的防御值设为a与b，通过输入a与b后比较a与b的大小得出结果！\n>**输入格式**：两个整数，中间用数字隔开，如“1 2”
>**输出格式**：青铜盾 或 白银盾 （若左边数字大则输出青铜盾，反之）\n\n!!! note 测试样例

1. 输入：\n 10 20\n  输出：\n白银盾\n
2. 输入：\n 20 10\n  输出：\n青铜盾\n

!!!`,
        },
        {
          type: 'button',
          content: [
            {
              text: `返回课程`,
              size: 'large',
              buttontype: 'info',
              targetIndex: 3,
            },
            {
              text: `继续旅途`,
              size: 'large',
              buttontype: 'primary',
              targetIndex: 4,
              ask: true,
            },
          ],
        },
      ],
      2: [
        {
          type: 'title',
          content: `武器店的试炼 II`,
        },
        {
          type: 'text',
          content: `我们再回顾一下老铁匠的要求：\n要求**只通过一次遍历**，仅能**交换相邻**的元素，实现将**最大的元素**移到数组的最后一位。\n首先我们解决以下交换相邻元素的问题，我们希望“**越大的值越往后**”，那么可不可以在比较的时候让最大的值往后走，即：\n**有a与b，比较a与b，若a比b大，则交换a与b的位置。**\n然后想想仅一次遍历吧，我们从数组开头比较到数组结尾，光说太枯燥了，我们举一个例子：\n!!! hint
对于数组{7,4,1,4,5,9,2,8}，我们从前到后，除开最后一个数没有后一位数，其他的数都进行刚才提到的比较，我们会发现最大的9已经走到最后一位了！最后的数组是{4,1,4,5,7,2,8,9}
!!!\n\n
为了方便理解，我们提供了上述数组比较的可视化图，试着跟着图示编写代码吧！`,
        },
        {
          type: 'visualizer',
          name: 'ColumnChart',
        },
        {
          type: 'text',
          content: `>**输入格式**：第一行为一个整数n，第二行为n个数，中间由空格隔开，如：\n3
1 2 3\n**输出格式**：仅一行，有n个数，中间由空格隔开，如：1 2 3\n

!!! note 测试样例
输入：\n 8 \n7 4 1 4 5 9 2 8\n
输出：\n4 1 4 5 7 2 8 9\n
!!!`,
        },
        {
          type: 'button',
          content: [
            {
              text: `返回课程`,
              size: 'large',
              buttontype: 'info',
              targetIndex: 4,
            },
            {
              text: `继续旅途`,
              size: 'large',
              buttontype: 'primary',
              targetIndex: 5,
              ask: true,
            },
          ],
        },
      ],
      3: [
        {
          type: 'title',
          content: `击败魔王！`,
        },
        {
          type: 'text',
          content: `让我们确定一下我们的目标：**将一个无序的数组排成一个升序（由小到大）的数组。**\n回忆一下我们前面学到的内容，我们开始尝试实现本课程的最终目标：**冒泡排序** 吧！\n我们明确一下我们要实现的步骤和难点：
1. 利用刚刚挑选武器的经验，将数组中**最大的元素**放到最后。
2. 这时候我们注意到数组最后一位已经在应该在的位置了，我们**不需要**再将它纳入排序，所以我们从这步开始将排序范围缩小到**从“数组开头”到“数组倒数第二个”**。
3. 在我们约定的排序范围内再次进行第一步，这时候我们就将整个数组中第二大的元素（因为最大的元素已经不在我们的排序范围内了），放到了我们排序范围的最后一个（即整个数组的倒数第二个）。
4. **重复**上述步骤直到我们的排序范围收缩到只有一个数，至此数组已经有序。\n\n
我们给出上一道考验的参考答案，希望能帮助你更好的思考：\n
\`\`\` C
for(int i=0;i<n-1;i++){
    if(a[i]>a[i+1]){
        //交换a[i]与a[i+1]
        int temp = a[i];
        a[i] = a[i+1];
        a[i+1] = temp;
    }
}
\`\`\`\n\n
>**输入格式**：第一行为一个整数n，第二行为n个数，中间由空格隔开，如：\n3
3 2 1\n**输出格式**：仅一行，有n个数，中间由空格隔开，如：1 2 3\n

!!! note 测试样例
输入：\n 8 \n7 4 1 4 5 9 2 8\n
输出：\n1 2 4 4 5 7 8 9\n
!!!`,
        },
        {
          type: 'button',
          content: [
            {
              text: `返回课程`,
              size: 'large',
              buttontype: 'info',
              targetIndex: 6,
            },
            {
              text: `继续旅途`,
              size: 'large',
              buttontype: 'primary',
              targetIndex: 7,
              ask: true,
            },
          ],
        },
      ],
    } as Record<number, ContentItem[]>,
    judge: {
      1: [
        {
          stdin: '10 20',
          expect: '白银盾',
        },
        {
          stdin: '2.5 1.5',
          expect: '青铜盾',
        },
      ],
      2: [
        {
          stdin: `8
7 4 1 4 5 9 2 8`,
          expect: '4 1 4 5 7 2 8 9',
        },
      ],
      3: [
        {
          stdin: `8
7 4 1 4 5 9 2 8`,
          expect: '1 2 4 4 5 7 8 9',
        },
      ],
    } as Record<number, CodeTest[]>,
    randomJudge: {
      1: (): CodeTest => {
        const a = Math.random() * 10;
        const b = Math.random() * 10;
        return { stdin: `${a} ${b}`, expect: a > b ? '青铜盾' : '白银盾' };
      },
      2: (): CodeTest => {
        let a = [];
        let b;
        const len = Math.ceil(Math.random() * 5) + 5;
        for (let i = 0; i < len; i++) {
          a.push(Math.ceil(Math.random() * 100));
        }
        b = a.join(' ');
        for (let i = 0; i < len - 1; i++) {
          if (a[i] > a[i + 1]) {
            [a[i], a[i + 1]] = [a[i + 1], a[i]];
          }
        }
        return { stdin: b, expect: a.join(' ') };
      },
      3: (): CodeTest => {
        let a = [];
        const len = Math.ceil(Math.random() * 5) + 5;
        for (let i = 0; i < len; i++) {
          a.push(Math.ceil(Math.random() * 100));
        }
        let b = a.sort((x, y) => x - y);
        console.log(b.join(' '));
        return { stdin: a.join(' '), expect: b.join(' ') };
      },
    },
  }),
});
