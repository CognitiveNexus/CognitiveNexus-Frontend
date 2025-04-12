import type { Course, CourseCategory } from '@/types/CourseTypes';
import bubbleSort from '@/courses/bubbleSort';
import ifStatement from '@/courses/ifStatement';
import forStatement from '@/courses/forStatement';
import pointer from '@/courses/pointer';

export const courseCategories: CourseCategory[] = [
  {
    name: '知识点详解',
    courses: [ifStatement, forStatement, pointer],
  },
  {
    name: '趣味实战',
    courses: [bubbleSort],
  },
];

export const courses: { [courseId: string]: Course } = courseCategories.reduce((acc, category) => {
  category.courses.forEach((course) => {
    acc[course.id] = course;
  });
  return acc;
}, {} as { [courseName: string]: Course });
export default courses;
