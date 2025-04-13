import type { CSSProperties } from 'vue';

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

export type CoursePage = StoryPage | PracticePage;
export type StoryPage = {
  type: 'story';
  background?: string;
  character?: string | CharacterConfig;
  contents: StoryContent[];
  /**
   * @deprecated emblem 属性已弃用，无作用。
   */
  emblem?: string;
};
export type PracticePage = {
  type: 'practice';
  contents: StoryContent[];
  judge?: CodeTest[];
  randomJudge?: () => CodeTest[];
  defaultCode?: string;
  defaultLine?: number;
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

export type CharacterConfig = {
  name: string;
  style?: CSSProperties;
};
