import type { Ref } from 'vue';
import type { StoreDefinition } from 'pinia';

export type Command = {
  type: string;
  index1: number;
  index2: number;
};

export type ChartStoreState = {
  colorScheme: string;
  data: { value: number }[] | { value: number }[][];
  command: Command[];
  current_page: number;
};

export type ChartStoreGetters = {
  total_page: () => number;
  current_data: () => { value: number }[];
};

export type ChartStoreActions = {
  isAvailableIndex: (index: number) => boolean;
  isAvailablePage: (page: number) => boolean;
  swap: (a: number, b: number) => void;
  nextPage: () => void;
  prevPage: () => void;
};

export type ChartStore = StoreDefinition<string, ChartStoreState, ChartStoreGetters, ChartStoreActions>;
