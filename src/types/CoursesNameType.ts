export type CourseName = 'bubble' | 'select' | 'if' | 'for';

export type CourseDiff = 'basic' | 'normal';

export type CourseMeta = {
  title: string;
  diff: CourseDiff;
};

export type DiffProgress = {
  diff: CourseDiff;
  totalPercent: number;
  detail: DiffProgressDetail[];
};

export type DiffProgressDetail = {
  name: String;
  percent: number;
};
