import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-material-design/dist/css/bootstrap-material-design.css'
import 'bootstrap-material-design/dist/css/ripples.css'
import 'bootstrap'
import 'arrive'
import 'bootstrap-material-design'
import 'bootstrap-material-design/dist/js/ripples'
import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import {VueExt} from './fl-util'
import router from './routes'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueExt)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router
})

$(document).ready(function () {
  $.material.init()
})
