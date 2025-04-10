export const createTitle = (content: string) => ({ type: 'title', content });
export const createText = (content: string) => ({ type: 'text', content });
export const createTips = (inputFormat?: string, outputFormat?: string, examples?: { input: string; output: string }[]) => {
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
export const createCongratulation = () => ({}); // TODO
export const createContent = (type: string, content: any) => ({ type: type, content });
