import { createApp } from "vue";
import * as VueRouter from 'vue-router';
import App from "./App.vue";
import Login from "./Login.vue";

// import "tailwindcss/tailwind.css"
import "./styles/index.scss";

const routes = [
    { path: '/auth/:id', component: Login },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const app = createApp(App);
app.use(router)
app.mount("#app");

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.unmount();
  });
}
