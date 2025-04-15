import type { CSSProperties, DefineComponent } from 'vue';
import type { ChartStore } from '@/types/ChartStoreTypes';
import type { ModuleEvaluator } from 'vite/module-runner';

export type Course = {
  name: string;
  id: string;
  pages: CoursePage[];
};

export type CourseCategory = {
  name: string;
  courses: Course[];
  remark?: string[];
};

export type CoursePage = {
  type: 'story' | 'challenge';
  chapter: string;
  background?: string;
  character?: string | ImageConfig;
  contents: StoryContent[];
  columnChart?: {
    store: ChartStore;
    content: string[];
    theme?: string;
  };
  codeJudge?: {
    judge?: CodeTest[];
    randomJudge?: () => CodeTest[];
    defaultCode?: string;
    defaultLine?: number;
  };
  codeVisualize?: {
    defaultCode?: string;
    defaultLine?: number;
    defaultStdin?: string;
  };
  component?: DefineComponent<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>; // ???????
  componentProps?: { [prop: string]: any };
  componentStyle?: CSSProperties;
};

export type StoryContent = TitleContent | TextContent | TagGroup | ButtonGroup | CongratulationContent | VisualizationContent | VideoContent | SlideshowContent;

export type TitleContent = {
  type: 'title';
  content: string;
};
export type TextContent = {
  type: 'text';
  content: string;
};
export type TagGroup = {
  type: 'tag';
  tags: TagContent[];
};
export type ButtonGroup = {
  type: 'button';
  buttons: ButtonContent[];
};
export type CongratulationContent = {
  type: 'congratulation';
};
export type VisualizationContent = {
  type: 'visualization';
};
export type VideoContent = {
  type: 'video';
  platform: 'bilibili' | 'local';
  link: string;
};
export type SlideshowContent = {
  type: 'slideshow';
  filename: string;
};

export type TagContent = {
  text: string;
  effect: 'dark' | 'light';
  size: 'large' | 'medium' | 'small';
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info';
};
export type ButtonContent = {
  text: string;
  size: 'large' | 'medium' | 'small';
  type: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  targetIndex: number;
  relative?: boolean;
  requireSolved?: boolean;
};

export type CodeTest = {
  stdin: string;
  expect: string;
};

export type ImageConfig = {
  name: string;
  style?: CSSProperties;
};
