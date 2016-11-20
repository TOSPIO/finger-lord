<template>
    <div>
        <div class="well timebox">
            Time elapsed: <timer ref="timer"></timer>
            <span v-show="hasEnded">
                Too slow you idiot!
            </span>
        </div>
        <type-pad @startTyping="onStartTyping" @allClear="onAllClear"></type-pad>
    </div>

</template>

<script>
import Timer from 'components/Timer.vue'
import TypePad from 'components/TypePad.vue'

export default {
  name: 'playground-page',
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
