import VueRouter from 'vue-router'
import Playground from 'components/Playground.vue'

export default new VueRouter({
  routes: [
    { path: '/playground', component: Playground }
  ]
})
