export type CourseName = "bubble" | "select" | "if" | "for";

export type CourseMeta = {
  title: string;
  path: string;
  diff: "basic" | "normal";
  // 可以添加其他元数据字段
};
