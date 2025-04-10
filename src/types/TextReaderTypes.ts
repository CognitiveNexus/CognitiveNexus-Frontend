export type StoryPage =
  | {
      type: 'story';
      contents: StoryContent[];
    }
  | {
      type: 'practice';
      contents: StoryContent[];
      judge?: CodeTest[];
      randomJudge?: () => CodeTest[];
      defaultCode?: string;
      defaultLine?: number;
    };

export type StoryContent = Object; // TODO

export type CodeTest = {
  stdin: string;
  expect: string;
};
