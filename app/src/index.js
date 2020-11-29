import { createApp } from "vue";
import * as VueRouter from 'vue-router';
import App from "./App.vue";
import Login from "./Login.vue";
import Callback from "./Callback.vue";
import Setup from './Setup.vue';

// import "tailwindcss/tailwind.css"
import "./styles/index.scss";

const routes = [
    { path: '/auth/:id', component: Login },
    { path: '/auth/google/handler', component: Callback },
    { path: '/setup', component: Setup },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const app = createApp(App);
app.use(router)
app.mount("#app");

if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.unmount();
  });
}
