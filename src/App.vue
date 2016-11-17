<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <timer ref="tmr" :decimals="1"></timer>
    <button type="button" @click="startTimer">Start timer</button>
    <button type="button" @click="stopTimer">Stop timer</button>
    <button type="button" @click="clearTimer">Clear timer</button>
    <button type="button" @click="restartTimer">Restart timer</button>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Timer from './components/Timer'

export default {
  name: 'app',
  created () {
  },
  methods: {
    startTimer () {
      this.$refs.tmr.start()
    },
    stopTimer () {
      this.$refs.tmr.stop()
    },
    clearTimer () {
      this.$refs.tmr.clear()
    },
    restartTimer () {
      this.$refs.tmr.restart()
    }
  },
  components: {
    Hello,
    Timer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
