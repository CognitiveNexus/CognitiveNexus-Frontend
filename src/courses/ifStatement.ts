import { createTitle, createText, createButtons, createTags, createTips, createCongratulation } from '@/utils/CreateCourse';
import type { CoursePage } from '@/types/CourseTypes';

const pages: CoursePage[] = [
  {
    type: 'story',
    emblem: 'shield',
    contents: [createTitle(`if 语句`), createText(`if 语句`)],
  },
];

export default {
  name: 'if 语句',
  id: 'ifStatement',
  pages: pages,
};
