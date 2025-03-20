//可辨识联合类型
export type ContentItem =
  |{
    type: 'image';
    src: string;
    alt?: string;    // 可选属性
    width?: number;
    height?: number;
  }
  | {
    type: 'link';
    url: string;
    text: string;
  }
  | {
    type: 'text';
    content: string;
    class: string;
  }
  | {
    type: 'break';
  };