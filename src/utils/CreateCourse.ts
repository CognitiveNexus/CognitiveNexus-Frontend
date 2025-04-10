import type { ButtonContent, ButtonGroup, CongratulationContent, TagContent, TagGroup, TextContent, TitleContent } from '@/types/CourseTypes';

export const createTitle = (content: string): TitleContent => ({ type: 'title', content });
export const createText = (content: string): TextContent => ({ type: 'text', content });
export const createButtons = (buttons: ButtonContent[]): ButtonGroup => ({ type: 'button', buttons });
export const createTags = (tags: TagContent[]): TagGroup => ({ type: 'tag', tags });
export const createCongratulation = (): CongratulationContent => ({ type: 'congratulation' });

export const createTips = (inputFormat?: string, outputFormat?: string, examples?: { input: string; output: string }[]): TextContent => {
  let tips = '';
  if (inputFormat) tips += `!!! tip 输入格式\n${inputFormat}\n!!!\n\n`;
  if (outputFormat) tips += `!!! tip 输出格式\n${outputFormat}\n!!!\n\n`;
  if (examples) {
    tips += `!!! hint 测试样例\n`;
    for (const example of examples) {
      tips += `输入：\n${example.input}\n输出：\n${example.output}\n\n`;
    }
    tips += `!!!\n\n`;
  }
  return createText(tips.trim());
};
