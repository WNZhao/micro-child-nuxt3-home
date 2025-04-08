/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-07 16:29:35
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-08 17:24:05
 * @FilePath: /micro-child-nuxt3-home/api/homeApi.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useRequest } from '~/utils/request';
import type { ApiResponse, HomePageData } from '~/types/home';

// 获取首页数据
export const getIndexData = (params?: Record<string, unknown>) => {
  return useRequest().get<ApiResponse<HomePageData>>(
    '/api/index/getIndexData',
    { params }
  );
};
