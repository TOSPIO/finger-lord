<template>
    <div>
        <div class="well timebox">
            Time elapsed: <timer ref="timer"></timer>
        </div>
        <type-pad @startTyping="onStartTyping" @allClear="onAllClear"></type-pad>
        <div class="well statistics" v-show="hasEnded">
            Too slow you idiot!
        </div>
    </div>

</template>

<script>
import Timer from 'components/Timer.vue'
import TypePad from 'components/TypePad.vue'

export default {
  name: 'playground',
  data () {
    return {
      hasEnded: false
    }
  },
  methods: {
    onStartTyping () {
      this.$refs.timer.start()
    },
    onAllClear () {
      this.$refs.timer.stop()
      this.hasEnded = true
    }
  },
  components: {
    Timer,
    TypePad
  }
}
</script>

<style>
.timebox {

}
</style>
