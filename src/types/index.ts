//数组可视化柱状图 单个柱子数据
export interface array_column_value  {
    index: number,
    value: number,
}

export type array_list = array_column_value[]

export const color = {
    deault_color: "rgb(121.3, 187.1, 255)",
    default_color_r: 121.3,
    default_color_g: 187.1,
    default_color_b: 255,

    highlight_color: "rgb(51.2, 126.4, 204)",
    highlight_color_r: 51.2,
    highlight_color_g: 126.4,
    highlight_color_b: 204,

    dim_color: "rgb(115.2, 117.6, 122.4)",
    dim_color_r: 115.2,
    dim_color_g: 117.6,
    dim_color_b: 122.4,
}