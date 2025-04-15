import { createTitle, createText, createButtons, createTags, createTips, createCongratulation, createSlideshow } from '@/utils/CreateCourse';
import type { CoursePage } from '@/types/CourseTypes';

const pages: CoursePage[] = [
  {
    type: 'story',
    chapter: '',
    contents: [createTitle(`if 语句`), createText(`if 语句`)],
  },
  {
    type: 'story',
    chapter: '',
    contents: [createSlideshow('ifStatement.pptx')],
  },
];

export default {
  name: 'if 语句',
  id: 'ifStatement',
  pages: pages,
};
