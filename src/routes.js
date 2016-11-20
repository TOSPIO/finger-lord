import VueRouter from 'vue-router'
import PlaygroundPage from 'pages/Playground.vue'
import TypingPage from 'pages/Typing.vue'
import PassagesPage from 'pages/Passages.vue'
import AddPassagePage from 'pages/AddPassage.vue'

export default new VueRouter({
  routes: [
    { path: '/playground', component: PlaygroundPage },
    { path: '/typing/:passageId', component: TypingPage },
    { path: '/passages', component: PassagesPage },
    { path: '/add-passage', component: AddPassagePage }
  ]
})
