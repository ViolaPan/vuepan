import { createRouter, createWebHistory } from 'vue-router'
  import AddData from '../views/AddDataView.vue';
 import HomeView from '../views/HomeView.vue';
 import Bootstrap from '../views/Bootstrap.vue';


const routes = [
  
  {
    path: '/AddDataView',
    name: 'AddDataView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: AddData
  },
  {
    path: '/HomeView',
    name: 'HomeView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: HomeView
  },
  {
    path: '/Bootstrap',
    name: 'Bootstrap',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Bootstrap
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
