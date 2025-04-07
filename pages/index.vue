<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-07 17:30:35
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-07 17:23:54
 * @FilePath: /micro-child-nuxt3-home/pages/index.vue
 * @Description: 根路由页面
-->
<template>
  <div>重定向中...</div>
</template>

<script setup lang="ts">
// 使用 navigateTo 进行重定向
onMounted(() => {
  navigateTo('/child-home', { replace: true });
});
</script>
