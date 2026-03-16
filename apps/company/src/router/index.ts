import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: { name: 'applicants-create' },
    },
    {
      path: '/applicants/create',
      name: 'applicants-create',
      component: () => import('#/views/applicants/create.vue'),
    },
  ],
});

