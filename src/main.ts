import '@/styles/index.scss';
import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import App from './App.vue';

library.add(fas);

createApp(App).mount('#app');
