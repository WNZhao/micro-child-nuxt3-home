// 空的 service worker 文件
self.addEventListener('install', () => {
  // 跳过等待，直接激活
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  // 立即控制所有页面
  self.clients.claim();
}); 