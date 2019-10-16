import Vue from 'vue';
import Router from 'vue-router';
import Fetch from './components/Fetch.vue';
import Todos from './components/Todos.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/fetch',
      name: 'fetch',
      component: Fetch,
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos,
    },
  ],
});
