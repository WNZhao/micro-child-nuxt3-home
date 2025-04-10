import type { RouteLocationNormalized } from 'vue-router';

interface RouterChangeData {
  to: RouteLocationNormalized;
  from: RouteLocationNormalized;
  fullPath: string;
  baseRoute: string;
}

interface AppMountedData {
  name: string;
  route: RouteLocationNormalized;
}

declare global {
  interface Window {
    __MICRO_APP_ENVIRONMENT__?: boolean;
    __MICRO_APP_BASE_ROUTE__?: string;
    microApp?: {
      dispatch: (name: string, data: RouterChangeData | AppMountedData) => void;
    };
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.client) {
    const router = useRouter();
    const isMicroApp = window.__MICRO_APP_ENVIRONMENT__;
    const baseRoute = window.__MICRO_APP_BASE_ROUTE__ || '/';

    // 路由守卫
    router.beforeEach((to, from) => {
      if (isMicroApp) {
        // 在微前端环境中运行
        if (!to.path.startsWith(baseRoute)) {
          // 如果路径不是以基础路由开头，添加基础路由
          return baseRoute + to.fullPath;
        }

        // 通知基座应用路由变化
        window.microApp?.dispatch?.('router-change', {
          to,
          from,
          fullPath: to.fullPath,
          baseRoute,
        });
      }
    });

    // 监听来自基座应用的消息
    if (isMicroApp) {
      nuxtApp.hook('app:mounted', () => {
        // 通知基座应用子应用已挂载
        window.microApp?.dispatch?.('app-mounted', {
          name: 'child-app-home',
          route: router.currentRoute.value,
        });
      });
    }
  }
});
