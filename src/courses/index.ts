import type { Course, CourseCategory } from '@/types/CourseTypes';
import bubbleSort from '@/courses/bubbleSort';
import ifStatement from '@/courses/ifStatement';
import forStatement from '@/courses/forStatement';
import pointer from '@/courses/pointer';

export const courseCategories: CourseCategory[] = [
  {
    name: '基础',
    courses: [ifStatement, forStatement],
  },
  {
    name: '进阶',
    courses: [pointer],
  },
  {
    name: '算法',
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
