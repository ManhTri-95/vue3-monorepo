import type { App } from 'vue';
import ElementPlus from 'element-plus';

import 'element-plus/theme-chalk/src/index.scss';
import '@manhtri/styles';

import { router } from '#/router';

export function bootstrap(app: App) {
  app.use(ElementPlus);
  app.use(router);
  return app;
}

