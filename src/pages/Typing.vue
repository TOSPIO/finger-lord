<template>
    <div>
        <div class="well timebox">
            Time elapsed: <timer ref="timer"></timer>
            Speed: {{ currentSpeed }} kpm
            <span v-show="hasEnded">
                Too slow you idiot!
            </span>
        </div>
        <type-pad @startTyping="onStartTyping" @allClear="onAllClear" ref="typePad"></type-pad>
    </div>

</template>

<script>
import Timer from 'components/Timer.vue'
import TypePad from 'components/TypePad.vue'

export default {
  name: 'typing-page',
  data () {
    return {
      hasEnded: false,
      speedMeter: null,
      currentSpeed: 0
    }
  },
  created () {
    let passageId = this.$route.params.passageId
    this.http_get(`passages/${passageId}`).then(response => {
      this.content = response.body.content
      this.$refs.typePad.loadContent(this.content)
    }, response => {
    })
  },
  computed: {
  },
  methods: {
    onStartTyping () {
      this.$refs.timer.start()
      this.speedMeter = setInterval(() => {
        this.currentSpeed = this.getCurrentSpeed()
      }, 100)
    },
    onAllClear () {
      this.$refs.timer.stop()
      clearInterval(this.speedMeter)
      this.hasEnded = true
    },
    getCurrentSpeed () {
      let elapsed = this.$refs.timer.elapsed
      let correctChars = this.$refs.typePad.correctChars
      return Math.round(correctChars / elapsed * 60)
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
