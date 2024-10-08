import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

createApp(App)
  .use(createPinia())
  .use(
    createRouter({
      history: createWebHistory(),
      routes,
    })
  )
  .mount("#app");
