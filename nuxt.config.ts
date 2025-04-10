/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2025-04-01 22:14:11
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2025-04-10 19:23:37
 * @FilePath: /child-nuxt2-home/nuxt.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@element-plus/nuxt',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
  ],

  elementPlus: {
    /** Options */
    importStyle: 'css',
  } as Record<string, unknown>,
  css: ['@/assets/scss/main.scss'],

  runtimeConfig: {
    apiSecret: '',
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:4523',
      useCloudMock: process.env.NUXT_PUBLIC_USE_CLOUD_MOCK === 'true',
      cloudMockUrl:
        process.env.NUXT_PUBLIC_CLOUD_MOCK_URL ||
        'https://m1.apifoxmock.com/m1/6169012-5861146-default',
      prodApiBase:
        process.env.NUXT_PUBLIC_PROD_API_BASE || 'https://api.your-domain.com',
      baseRoute: '/',
    },
  },

  devServer: {
    port: 3000,
    host: '0.0.0.0',
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    },
  },

  nitro: {
    devProxy: {
      '/api': {
        target: process.env.NUXT_PUBLIC_API_BASE || 'http://127.0.0.1:4523',
        changeOrigin: true,
        prependPath: true,
        ws: true,
        secure: false,
      },
    },
  },

  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
    head: {
      script: [
        {
          innerHTML: 'window.__MICRO_APP_ENVIRONMENT__=true;',
        },
      ],
    },
  },

  experimental: {
    externalVue: true,
  },

  routeRules: {
    '/**': { cors: true },
  },

  vite: {
    server: {
      cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      },
      strictPort: true,
      origin: 'http://localhost:3000',
      hmr: {
        clientPort: 3000,
        protocol: 'ws',
      },
    },
    build: {
      cssCodeSplit: false,
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          format: 'umd',
        },
      },
    },
    optimizeDeps: {
      include: ['vue', '@vue/runtime-core'],
    },
    define: {
      'process.env.__MICRO_APP_ENVIRONMENT__': true,
    },
  },

  build: {
    transpile: ['vue', '@vue/runtime-core'],
  },
});
