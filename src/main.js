import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-material-design/dist/css/bootstrap-material-design.css'
import 'bootstrap-material-design/dist/css/ripples.css'
import 'bootstrap'
import 'bootstrap-material-design'
import 'bootstrap-material-design/dist/js/ripples'

import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './routes'

Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router
})
