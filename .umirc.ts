import { defineConfig } from 'umi';

export default defineConfig({
  title: "专家确认",
  history: { type: "hash" },
  hash: true,
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  fastRefresh: true,
  mfsu: false,
  alias: {
    assets: '/src/assets',
},
  routes: [
    {
      path: '/', component: '@/pages',
      routes: [
        { path: '/page/project', component: '@/pages/Project' },
        { path: '/page/projectDetail', component: '@/pages/ProjectDetail' },
      ]
    },
    { path: '/login', component: '@/pages/Login' },
    { path: '/404', component: '@/pages/404' },
  ],
});
