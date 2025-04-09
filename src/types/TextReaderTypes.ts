export type elementType = 'primary' | 'success' | 'info' | 'warning' | 'danger';

interface tagType {
  text: string;
  tagtype: elementType;
  effect: 'dark' | 'light' | 'plain';
  size?: string;
}

interface buttonType {
  buttontype: elementType;
  text: string;
  targetIndex: number;
  size?: string;
  ask?: boolean;
}

export type Mapping = {
  page: number;
  practice: number;
};

export type CodeTest = {
  stdin: string;
  expect: string;
};

//Reader 富文本类型约束
export type ContentItem =
  | {
      type: 'title';
      content: string;
    }
  | {
      type: 'text';
      content: string;
    }
  | {
      type: 'tag';
      content: tagType[];
    }
  | {
      type: 'button';
      content: buttonType[];
    }
  | {
      type: 'visualizer';
      name: string;
    };
