<template>
  <div id="app">
    <img src="./assets/logo.png">
    <hello></hello>
    <div class="time">Time elapsed: <timer ref="tmr" :decimals="1"></timer></div>
    <type-pad @startTyping="startTimer" @allClear="allClear"></type-pad>
    <div class="result" v-show="hasCleared">All clear in {{ elapsedTime }} seconds!</div>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Timer from './components/Timer'
import TypePad from './components/TypePad'

export default {
  name: 'app',
  data () {
    return {
      hasCleared: false,
      clearedInTime: 0
    }
  },
  created () {
  },
  methods: {
    startTimer () {
      this.$refs.tmr.start()
    },
    stopTimer () {
      this.$refs.tmr.stop()
    },
    allClear () {
      this.stopTimer()
      this.hasCleared = true
      this.elapsedTime = this.$refs.tmr.getElapsed()
    }
  },
  components: {
    Hello,
    Timer,
    TypePad
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

.time {
    text-align: left;
}

.result {
    text-align: left;
}
</style>
