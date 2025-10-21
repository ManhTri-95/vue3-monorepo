import { createApp } from 'vue';
import App from './App.vue';

import ElementPlus from 'element-plus';

import 'element-plus/theme-chalk/src/index.scss';

import '@manhtri/styles';


const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')