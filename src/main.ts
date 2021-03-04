// import * as Vant from 'vant';
import 'vant/lib/index.css';
import { createApp } from 'vue';
// TypeScript error? Run VSCode command
// TypeScript: Select TypeScript version - > Use Workspace Version
import App from './App';
import router from './router';
import store from './store';

const app = createApp(App);

app.use(store);
app.use(router);
// app.use(Vant);

app.mount('#app');
