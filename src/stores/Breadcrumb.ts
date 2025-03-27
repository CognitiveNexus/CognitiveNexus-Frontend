import { defineStore } from "pinia";

type pathItem = {
  name: string;
  path: string;
};

export const useBreadcrumbStore = defineStore("Breadcrumb", {
  state: () => ({
    pathArray: [{ name: "课程主页", path: "/course" }] as pathItem[],
  }),
  actions: {},
});
