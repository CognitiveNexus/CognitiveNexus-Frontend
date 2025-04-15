import { createTitle, createText, createButtons, createTips, createCongratulation } from '@/utils/CreateCourse';
import type { CoursePage } from '@/types/CourseTypes';

import { weaponStoreContent } from '@/courses/weaponStoreChart';
import { finalBossContent } from '@/courses/finalBossChart';
import { useWeaponStoreChartStore } from '@/stores/WeaponStoreChart';
import { useFinalBossChartStore } from '@/stores/FinalBossChart';
import ShieldSwap from '@/components/ShieldSwap.vue';
import CodeDemonstrator from '@/components/CodeDemonstrator.vue';
import CodeRunner from '@/components/CodeRunner.vue';

const pages: CoursePage[] = [
  {
    type: 'story',
    chapter: '序章',
    background: 'parchment',
    contents: [
      createTitle(`🔮序章：混沌降临`),
      createText(`在古老的算法大陆上，流传着一卷褪色的羊皮手札：
> “当混乱吞噬秩序时，持盾者将用**布尔之眼**甄选真理，执剑者将以**极值之光**劈开迷雾，而真正的勇者，会让秩序如气泡般轻盈归位。”

你，刚获编程纹章的见习骑士，月夜收到神秘信笺，羊皮纸上是一排**混沌数字**。

正在你疑惑这些不断变化的数字的意义时，天空被一道绿光撕裂，魔王的城堡在远山显现。
于此同时，村庄的秩序似乎开始逐渐崩塌——刚出生不久的婴儿变得有两米高，守卫村庄的士兵却变成了婴儿体型。

你意识到，魔王的**混沌结界**已经降临在村庄上。
你决心找到魔王，打破结界，拯救村庄，成为预言中的勇者。`),
    ],
  },
  {
    type: 'story',
    chapter: '盾牌的考验',
    background: 'weaponShop',
    character: 'shopkeeper1',
    contents: [
      createTitle(`🛡️盾牌的考验`),
      createText(`为了做好讨伐魔王的准备，你决定前往武器店**买一点趁手的装备**防身。
  
你走向村子西面的武器店。
那里住着一位年迈的铁匠，他的手艺很好，他铸出的剑斩铁如泥，他铸造的盾坚如磐石。
但是早有听闻要获得这优质的装备**并非没有代价**，过去不少人觊觎这精良的武器，却被铁匠的重重考验拒之门外，失望而归。
你不禁怀疑，你真的能通过铁匠的考验吗？

走进武器店，映入眼帘的是两个特制展示架：
左侧是带凹槽的**木制架**，右侧是带卡扣的**金属架**。一枚青铜盾卡在金属架上，白银盾却歪斜地陷在木架里。
“这情况持续三天了。”老铁匠无奈地说，“学徒搬运时**弄混了位置**。现在青铜盾卡在金属架取不出，白银盾在木架上会滑动，根本没法正常出售。”`),
    ],
  },
  {
    type: 'challenge',
    chapter: '盾牌的考验',
    background: 'weaponShop',
    contents: [
      createTitle(`🛡️盾牌的考验`),
      createText(`青铜盾和白银盾的位置**放反了**，老铁匠和学徒都取不下来。

你思索着，或许自己有力气**帮助**老铁匠把盾牌换回正确的位置？

但是，盾牌很重，你**一次只能拿动一个**盾牌。要怎么操作呢？

（拖动右侧的盾牌进行操作吧~）`),
    ],
    component: ShieldSwap,
  },
  {
    type: 'story',
    chapter: '盾牌的考验',
    background: 'weaponShop',
    character: 'shopkeeper2',
    contents: [
      createTitle(`🛡️盾牌的考验`),
      createText(`太好了！聪明的你想到了先把其中一个盾**暂放在地板上**，之后就有足够的空间进行交换了。

老铁匠点头称赞：“我就知道你能做到！这把**白银盾**是你的了！”

但是，光有盾牌、没有武器，似乎也很难打倒魔王。
老铁匠似乎看出了你想说什么，拿出了一本泛黄的古籍…`),
    ],
  },
  {
    type: 'story',
    chapter: '圣剑的考验',
    background: 'weaponShop',
    character: 'shopkeeper3',
    contents: [
      createTitle(`🗡️圣剑的考验`),
      createText(`古籍上面密密麻麻画着**999把武器**的图像。当你翻开时，数字像蚂蚁般在羊皮纸上爬动，让你眼花缭乱。

“这些武器中，有一把，是传说中的‘**秩序之锋**’。传说中的勇者，正是用这把剑**击败了魔王**。”

你随意翻动着这本古籍，无意间就翻到了传说中的“秩序之锋”，这把剑看着如此逼真，你不禁用手触动，竟然摸到了金属冰凉的触感。
老铁匠解释道：“这不只是一本目录，还是一个魔法收纳册，称为‘**千刃轴卷**’。你所看到的剑都真真切切地存放在轴卷内部。只不过，次元符文在最后一页，也就是说，你**只能拿出最后一页的剑**。”

你翻到最后一页，发现页面上方确实有一个异样的符文。只不过，下方的图案上只有一把生锈的水果刀…难道你要拿着它去打魔王吗？

“不用担心，这本‘千刃轴卷’还有一个特性。只需要**抖动书页**，就可以**交换**这一页上的两把剑。”

看来，你需要通过这种方式，把“秩序之锋”挪到最后一页。
你知道这又是一道考验，而且比上一道考验难上不少。`),
    ],
  },
  {
    type: 'story',
    chapter: '圣剑的考验',
    background: 'weaponShop',
    contents: [
      createTitle(`🗡️圣剑的考验`),
      createText(`总结一下，“千刃轴卷”的特性是：
1. 只能**交换相邻**两把剑；
2. 只能**取出最后**一把剑。

那么，该如何取出传说中的“秩序之锋”呢？

我们先考虑一下更简单的情况。
假设我们现在有 8 把剑，攻击力各不相同。

（在这里，你一眼就可以看到攻击力最高的那一把。但是，在 999 把剑里面，很难做到“一眼看出”。）

让我们看看，怎么用类似的方式，把攻击力最高的剑移动到最后吧！

| 剑序号 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :-----: | :------: | :-----: | :-----: | :-----: | :------: | :-----: | :-----: | :-----: |
| 攻击力 | 7 | 4 | 1 | 4 | 5 | 9 | 2 | 8 |
`),
    ],
    columnChart: {
      store: useWeaponStoreChartStore,
      content: weaponStoreContent,
      theme: 'warm',
    },
  },
  {
    type: 'story',
    chapter: '直面魔王',
    background: 'castle',
    character: {
      name: 'shopkeeper0',
      style: {
        width: '300px',
      },
    },
    contents: [
      createTitle(`🏰启程`),
      createText(`经过一番操作后，你成功将“秩序之锋”交换到了最后一页。
轻触轴卷上圣剑的图案，你不紧“握”住了剑柄。顷刻间，圣剑变大变高，出现在你手中。

你轻轻抚摸着这把圣剑。圣剑拥有着某种神秘的纹路，看上去**象征着秩序**。老铁匠抚掌大笑：“这把‘秩序之锋’，只属于传说中的勇士。我果然没有看错你。”

历经重重考验，你终于获得了属于你的武器与盾牌，是时候向**更远大的目标**前行了！
你看着远处天空弥漫的乌云，魔王城堡的塔尖直冲云端，道道雷电劈下，预示着更大的危险的到来，你知道，不能再拖了。

你骑上骏马，即刻**启程**！
`),
    ],
  },
  {
    type: 'story',
    chapter: '直面魔王',
    background: 'monster',
    contents: [
      createTitle(`🏰直面魔王`),
      createText(`漆黑的城堡中，你奋力战斗，终于走到魔王的门前，心情忐忑。

魔王缓缓走出，他的身上萦绕着闪亮的**黑曜石护盾**。
你没有犹豫，顷刻间，你斩出了伤害为 **{ 59, 874, 1238, 124, 103 }** 的一套剑技。
前三次斩击**成功击中**了护盾，护盾开始出现**裂纹**。但到第四剑时，剑却被黑曜石护盾**远远弹开**，护盾也瞬间**恢复如初**。

你心中一惊，魔王的护盾似乎有着**混沌的力量**，你必须想办法打破它。
你急速后撤翻过石柱，思考着破局的思路。

魔王哈哈大笑：“我的护盾坚不可摧，你可拥有如此强大的力量？”

你似乎想到什么：混沌的力量，唯有**秩序**才能击破。每次攻击的威力必须**高于前一次**，否则就会被护盾弹开，前功尽弃。
你决定试一试。现在，你必须准备好递增的剑技，该如何将乱序的排列变成有序的呢？`),
    ],
  },
  {
    type: 'story',
    chapter: '直面魔王',
    background: 'monster',
    contents: [
      createTitle(`🏰直面魔王`),
      createText(`要让我们的攻击数值从无序**变为有序**，还真是一个难题。

不过，还记得在武器店中**拿到圣剑**的经历吗？
当时，我们掌握了一种能够**将最大的数移动到最后**的方法。这个方法现在已经成为了你的“**技能**”，只需要**触发技能**，就能够实现这个效果，不需要考虑具体的步骤。

能不能使用这个技能，实现**有序化**呢？

在我们第一次使用技能时，攻击力**最高**的攻击就被我们**排到最后**了。
只是，这好像还不够，因为**前面其他攻击**仍然是无序的。

等等…那如果我们对“**前面其他攻击**”触发技能，会发生什么事情呢？
这样一来，攻击力**第二高**的攻击就被放在了“前面其他攻击”的最后。
而他的后面，是“攻击力**最高**”的攻击。
换句话说，“攻击力**前两高**”的攻击已经**变得有序**了，只有更前面的攻击才是无序的。

如果我们**不断触发**技能，每次触发技能后都**缩短下次技能的范围**，会发生什么呢？`),
    ],
  },
  {
    type: 'story',
    chapter: '直面魔王',
    background: 'monsterDim',
    contents: [
      createTitle(`🏰直面魔王`),
      createText(`像之前一样，我们考虑一个简化的版本：
| 攻击序号 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| :-----: | :------: | :-----: | :-----: | :-----: | :------: | :-----: | :-----: | :-----: |
| 攻击力 | 7 | 4 | 1 | 4 | 5 | 9 | 2 | 8 |

【技能】将技能范围内最大的数放到范围最后`),
    ],
    columnChart: {
      store: useFinalBossChartStore,
      content: finalBossContent,
      theme: 'dark',
    },
  },
  {
    type: 'story',
    chapter: '直面魔王',
    background: 'finish',
    contents: [
      createTitle(`🎉终结魔王！`),
      createText(`你挥舞着“秩序之锋”，剑光闪烁，剑势如虹，直逼魔王的护盾。

魔王的护盾在**秩序加持**的攻击前，如同纸糊一般，瞬间被击碎。
魔王发出一声不甘的怒吼，化作一阵黑雾消散在空中。

城堡的阴霾逐渐散去，阳光洒满大地，村民们的欢呼声从远处传来。你做到了！`),
      createCongratulation(),
    ],
  },
  {
    type: 'story',
    chapter: '旅途回顾',
    background: 'parchment',
    character: {
      name: 'task',
      style: {
        width: '25vw',
      },
    },
    contents: [
      createTitle('🔎旅途回顾'),
      createText(`回到村庄，老村长拄着杖走来，

“孩子，你施展的并非魔法，而是古老的「**冒泡排序**」算法——
它像**气泡上浮**，让最大值一步步升至末尾；
又似**筛去砂砾**，每轮缩减排序的疆域；
**循环往复**，直至所有元素各归其位。”

这正应证了传说中所说的：
> “比较 → 交换 → 循环，直至有序。”

是的，这就是算法中的**冒泡排序**。正如他的名字那样，数字像气泡般，根据自身大小上浮；重复“冒泡”，就可以简单地将数据排列整齐。

冒泡排序是一种经典的排序算法，使用最**朴素的逻辑**（比较、交换），驯服无序。`),
    ],
  },
  {
    type: 'story',
    chapter: '旅途回顾',
    background: 'parchment',
    contents: [
      createTitle(`📜修复符文`),
      createText(`老村长交给你一个纹章，上面浮现出奇怪的符号——它们像某种**古老的语言**，记录着你刚刚施展的**算法**。
回到图书馆，村长交给你一卷破译后的纹章铭文。

\`if\`、\`for\`… 这些不是魔法咒语，而是组成「冒泡排序」需要用到的**代码逻辑**！
但是，这些逻辑**散乱在各处**，无法发挥应有的作用。

让我们一起**修复**这些符文，将村庄中被魔王的咒语扰乱的秩序，重新排列整齐吧！`),
    ],
  },
  {
    type: 'story',
    chapter: '任务Ⅰ 交换',
    background: 'parchment',
    contents: [
      createTitle(`📜任务Ⅰ 交换`),
      createText(`还记得我们在武器店中**交换盾牌**的经历吗？
盾牌架一次**只能安放一个**盾牌，同时我们一次**只能拿取一个**盾牌。
在这种情况下，我们把一个盾牌先暂时存放在地板上，就能够完成交换。

这和我们 C 语言中的**变量**是类似的。
变量中，一次只能储存一个数值；同样，我们一条语句也只能够给一个变量赋值。

因此，我们可以用**临时变量**来存储一个数值，然后再进行交换。

点击右侧的运行按钮，看看运行过程吧。`),
    ],
    component: CodeRunner,
    componentProps: {
      code: `#include <stdio.h>

int main() {
    int a = 1, b = 2, t;
    t = a; // 利用临时变量储存一个值
    a = b; // 解放了一个变量，用它存另一个变量值
    b = t; // 把临时变量暂存的值存入正确位置
    printf("%d %d", a, b); // 输出：2 1
    return 0;
}`,
      defaultLine: 1,
    },
    componentStyle: {
      backgroundColor: '#ffffff',
      border: 'solid 10px #672917',
      borderRadius: '5px',
      height: '80vh',
      marginRight: '48px',
    },
  },
  {
    type: 'challenge',
    chapter: '任务Ⅰ 交换',
    background: 'parchment',
    contents: [
      createTitle(`📜任务Ⅰ 交换`),
      createText(`现在，亲自试试交换变量值吧！`),
      createTips('两个整数，中间用数字隔开，如“1 2”', '交换顺序后输出，如“2 1”', [{ input: '10 20', output: '20 10' }]),
    ],
    codeJudge: {
      judge: [{ stdin: '10 20', expect: '20 10' }],
      randomJudge: () => {
        const a = Math.ceil(Math.random() * 100);
        const b = Math.ceil(Math.random() * 100);
        return [{ stdin: `${a} ${b}`, expect: `${b} ${a}` }];
      },
      defaultCode: `#include <stdio.h>

int main(){
    int a, b;

    // 输入
    scanf("%d %d", &a, &b);

    // 在这里编写您的代码吧！
    

    // 输出
    printf("%d %d", a, b);
    return 0;
}`,
      defaultLine: 10,
    },
  },
  {
    type: 'story',
    chapter: '任务Ⅱ 冒泡',
    background: 'parchment',
    contents: [
      createTitle(`📜任务Ⅱ 冒泡`),
      createText(`再来回忆一下我们在武器店中**取得圣剑**的经历：

“千刃轴卷”记载的武器中，只能**取出最后**一把，但可以**交换相邻**的两把武器。

首先，我们看看如何实现交换相邻元素。
我们希望“**越大的值越往后**”，可以在比较的时候让最大的值往后走，即：
有 a 与 b，比较 a 与 b。**若 a > b**，**则交换** a 与 b 的位置，**否则保持不变**。
这样，更大的数就会被交换到靠后的位置。

如果我们重复这个行为，对数组中的数，从前到后都如此比较、交换一遍，最大的数是不是就在最后了呢？

对照右边的执行过程，尝试理解这一过程吧～`),
    ],
    component: CodeDemonstrator,
    componentProps: {
      columnChart: {
        store: useWeaponStoreChartStore,
        content: weaponStoreContent,
        theme: 'warm',
      },
      code: `int arr[8] = { 7, 4, 1, 4, 5, 9, 2, 8 }, t;

for(int i = 0; i < 7; i++) {
    if(arr[i] > arr[i + 1]) {
        t = arr[i]; arr[i] = arr[i + 1]; arr[i + 1] = t;
    }
}`,
      codeLine: (step: number) => {
        return ((step + (step > 9 ? 0 : 1)) % 2) + 4;
      },
    },
  },
  {
    type: 'challenge',
    chapter: '任务Ⅱ 冒泡',
    background: 'parchment',
    contents: [
      createTitle(`📜任务Ⅱ 冒泡`),
      createText(`为了实现**把最大的元素放在最后**，我们的代码逻辑是这样的：
\`\`\`C
for(从左到右遍历数组) {
    if(左边的数比右边大) {
        交换;
    }
}
\`\`\`

现在，自己尝试实现一下这段代码吧！
> **TIPS**：遍历时需要**两两比较**，需要特别注意数组的边界情况，不要发生数组越界。`),
      createTips('第一行为一个整数 n，第二行为 n 个数，中间由空格隔开，如：\n3\n1 2 3', '仅一行，有 n 个数，中间由空格隔开，如：1 2 3', [
        { input: '8\n7 4 1 4 5 9 2 8', output: '4 1 4 5 7 2 8 9' },
      ]),
    ],
    codeJudge: {
      judge: [{ stdin: '8\n7 4 1 4 5 9 2 8', expect: '4 1 4 5 7 2 8 9' }],
      randomJudge: () => {
        const len = Math.floor(Math.random() * 5) + 6;
        const arr = Array.from({ length: len }, () => Math.ceil(Math.random() * 100));
        const sorted = [...arr];

        for (let i = 0; i < sorted.length - 1; i++) {
          if (sorted[i] > sorted[i + 1]) [sorted[i], sorted[i + 1]] = [sorted[i + 1], sorted[i]];
        }

        return [{ stdin: `${len}\n${arr.join(' ')}`, expect: sorted.join(' ') }];
      },
      defaultCode: `#include <stdio.h>

int main(){
    // 输入数据
    int n;
    scanf("%d", &n);
    int a[n];
    for(int i = 0; i < n; i++) {
      scanf("%d", &a[i]);
    }

    // 在这里编写您的代码吧！
    

    // 输出数组
    for(int i = 0; i < n; i++) {
      printf("%d ", a[i]);
    }
    return 0;
}`,
      defaultLine: 13,
    },
  },
  {
    type: 'story',
    chapter: '任务Ⅲ 排序',
    background: 'parchment',
    contents: [
      createTitle(`📜任务Ⅲ 排序`),
      createText(`恭喜你，你已经掌握了我们的“**技能**”：将最大的数放在最后。

现在，明确一下我们的最终目标：**将一个无序的数组排成升序。**

再次回忆一下打倒魔王时，我们的思路。
我们可以将数组看成一个**排序范围**，在这个范围内，我们要做的就是：
1. **找到**这个范围内的最大值；
2. 将这个最大值**放到范围的最后**；
3. 将这个最大值**移出排序范围**。
4. **重复**上述步骤，直到排序范围只剩下一个数。

那么，这样的操作要**循环多少次**呢？

我们可以将数组的长度 n 作为循环的条件，**每次**循环都将排序范围**缩小一位**，直到排序范围只剩一位。也就是说，我们需要循环 **n - 1** 次。
我们可以用一个简单的 for 循环来实现这个过程。

对照右边的执行过程，尝试理解这一过程吧～`),
    ],
    component: CodeDemonstrator,
    componentProps: {
      columnChart: {
        store: useFinalBossChartStore,
        content: finalBossContent,
        theme: 'warm',
      },
      code: `int arr[8] = { 7, 4, 1, 4, 5, 9, 2, 8 };

// 循环条件中 i-- 即缩减排序范围
for(int i = 7; i >= 1; i--) {
    // 排序范围 arr[0]~arr[i]
    将范围内最大的数放到最后;
}`,
      codeLine: (step: number) => (step % 2 ? 6 : 4),
    },
  },
  {
    type: 'challenge',
    chapter: '任务Ⅲ 排序',
    background: 'parchment',
    contents: [
      createTitle(`📜任务Ⅲ 排序`),
      createText(`现在，亲自试试实现**完整的**冒泡排序过程吧！

\`\`\`C
// 循环条件中 i-- 即缩减排序范围
for(int i = 7; i >= 1; i--) {
    // 排序范围 arr[0]~arr[i]
    将范围内最大的数放到最后;
}
\`\`\``),
      createTips('第一行为一个整数n，第二行为n个数，中间由空格隔开，如：\n3\n3 2 1', '仅一行，有n个数，中间由空格隔开，如：1 2 3', [
        { input: '8\n7 4 1 4 5 9 2 8', output: '1 2 4 4 5 7 8 9' },
      ]),
    ],
    codeJudge: {
      judge: [{ stdin: '8\n7 4 1 4 5 9 2 8', expect: '1 2 4 4 5 7 8 9' }],
      randomJudge: () => {
        const len = Math.floor(Math.random() * 5) + 6;
        const arr = Array.from({ length: len }, () => Math.ceil(Math.random() * 100));
        const sorted = [...arr].sort((x, y) => x - y);
        return [{ stdin: `${len}\n${arr.join(' ')}`, expect: sorted.join(' ') }];
      },
      defaultCode: `#include <stdio.h>

int main(){
    // 输入
    int n;
    scanf("%d", &n);
    int a[n];
    for(int i = 0; i < n; i++) {
      scanf("%d", &a[i]);
    }

    // 在这里编写您的代码吧！
    

    // 输出
    for(int i = 0; i < n; i++) {
      printf("%d ", a[i]);
    }
    return 0;
}`,
      defaultLine: 13,
    },
  },
  {
    type: 'story',
    chapter: '结局',
    background: 'finish',
    contents: [
      createTitle('🎖️真正的勇者'),
      createText(`你已用秩序之光**驱散混沌**，成为真正的**算法勇者**！
剑锋上的符文仍在闪烁，那是算法大陆永恒的馈赠——
每一次「比较」都是智慧的碰撞，每一轮「冒泡」皆是秩序的觉醒。

此刻的你，已能：
▸ 用三个木桶在酒馆表演「数值调酒术」，让围观矮人目瞪口呆
▸ 命令暴躁的火焰史莱姆按身高排队领晚餐
▸ 把魔王掉落的混乱龙鳞瞬间叠成扑克牌顺子

但城堡外仍有迷雾笼罩：
当万剑齐鸣时，如何**更快**唤醒秩序？
当元素躁动时，是否存在**更优雅**的驯服之道？
答案就藏在「千刃轴卷」下一页的晨光中…

收剑入鞘吧，年轻的排序大师——
这柄「**冒泡之锋**」，终将成为你算法征途的起点。`),
      createCongratulation(),
    ],
  },
];

export default {
  name: '冒泡排序',
  id: 'bubbleSort',
  pages: pages,
};
