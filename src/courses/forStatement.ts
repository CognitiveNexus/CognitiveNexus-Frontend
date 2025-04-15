import { createTitle, createText, createButtons, createTags, createTips, createCongratulation } from '@/utils/CreateCourse';
import type { CoursePage } from '@/types/CourseTypes';

const pages: CoursePage[] = [
  {
    type: 'story',
    chapter: '',
    contents: [createTitle(`for 语句`), createText(`for 语句`)],
  },
];

export default {
  name: 'for 语句',
  id: 'forStatement',
  pages: pages,
};
