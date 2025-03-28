type elementType = "primary" | "success" | "info" | "warning" | "danger";

interface tagType {
  text: string;
  tagtype: elementType;
  effect: "dark" | "light" | "plain";
  size?: string;
}

//Reader 富文本类型约束
export type ContentItem =
  | {
      type: "image";
      src: string;
      alt?: string; // 可选属性
      width?: number;
      height?: number;
    }
  | {
      type: "link";
      url: string;
      text: string;
    }
  | {
      type: "text";
      content: string;
      class: string;
    }
  | {
      type: "break";
    }
  | {
      type: "tag";
      content: tagType[];
    };
