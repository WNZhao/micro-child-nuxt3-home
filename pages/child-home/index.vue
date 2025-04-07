<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-07 17:30:35
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-07 20:34:40
 * @FilePath: /micro-child-nuxt3-home/pages/child-home/index.vue
 * @Description: 子页面
-->
<template>
  <div>
    <h1>home子页面</h1>
    <div v-if="pending">加载中...</div>
    <div v-else-if="error">加载出错: {{ error }}</div>
    <div v-else>
      <!-- 轮播图数据 -->
      <div v-if="data?.data?.indexBannerList">
        <h2>轮播图</h2>
        <pre>{{ data.data.indexBannerList }}</pre>
      </div>

      <!-- 热门关键词 -->
      <div v-if="data?.data?.hotKeyList">
        <h2>热门关键词</h2>
        <pre>{{ data.data.hotKeyList }}</pre>
      </div>

      <!-- 名企列表 -->
      <div v-if="data?.data?.famousEnterpriseList">
        <h2>名企列表</h2>
        <pre>{{ data.data.famousEnterpriseList }}</pre>
      </div>

      <!-- 职位列表 -->
      <div v-if="data?.data?.jobList">
        <h2>职位列表</h2>
        <pre>{{ data.data.jobList }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getIndexData } from '~/api/homeApi';
import type { ApiResponse, HomePageData } from '~/types/home';

// 使用 useAsyncData 在服务端获取数据
const { data, pending, error } = await useAsyncData<ApiResponse<HomePageData>>(
  'home-data',
  () => getIndexData(),
  {
    server: true,
    lazy: false,
  }
);

// 监听数据变化
watch(data, (newData) => {
  console.log('数据更新:', newData);
});

// 监听错误
watch(error, (newError) => {
  if (newError) {
    console.error('监听到错误:', newError);
  }
});

// 页面挂载时
onMounted(() => {
  console.log('页面挂载完成，当前数据:', {
    data: data.value,
    pending: pending.value,
    error: error.value,
  });
});
</script>

<style scoped></style>
