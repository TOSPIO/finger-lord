<template>
    <div>
        <div class="well timebox">
            <div>
            Time elapsed: <timer ref="timer"></timer> |
            Speed: {{ currentSpeed.toFixed(1) }} kpm |
            Accuracy: {{ (currentAccuracy * 100).toFixed(1) }}%
            <span v-show="hasEnded">
                Too slow you idiot!
            </span>
            </div>
            <div class="progress reverse-margin">
              <div class="progress-bar" :style="`width: ${progress * 100}%`"></div>
            </div>
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
      currentSpeed: 0,
      currentAccuracy: 0
    }
  },
  created () {
    let passageId = this.$route.params.passageId
    this.http_get(`passages/${passageId}`).then(response => {
      this.passage = response.body
      let typePad = this.$refs.typePad
      typePad.setMode(this.passage.mode)
      typePad.loadContent(this.passage.content)
    }, response => {
    })
  },
  computed: {
  },
  methods: {
    onStartTyping () {
      this.$refs.timer.start()
      this.speedMeter = setInterval(() => {
        this.refreshStatistics()
      }, 100)
    },
    onAllClear () {
      this.$refs.timer.stop()
      this.refreshStatistics()
      this.hasEnded = true
      clearInterval(this.speedMeter)
    },
    refreshStatistics () {
      this.currentSpeed = this.getCurrentSpeed()
      this.currentAccuracy = this.getCurrentAccuracy()
      this.progress = this.getProgress()
    },
    getCurrentSpeed () {
      let elapsed = this.$refs.timer.elapsed
      let correctChars = this.$refs.typePad.correctChars
      let speed = correctChars / elapsed * 60
      if (isNaN(speed)) {
        speed = 0
      }
      return speed
    },
    getCurrentAccuracy () {
      let correctChars = this.$refs.typePad.correctChars
      let totalInputChars = this.$refs.typePad.totalInputChars
      let accuracy = correctChars / totalInputChars
      if (isNaN(accuracy)) {
        accuracy = 0
      }
      return accuracy
    },
    getProgress () {
      let totalValidInputChars = this.$refs.typePad.totalValidInputChars
      let totalChars = this.$refs.typePad.content.length
      let progress = totalValidInputChars / totalChars
      if (isNaN(progress)) {
        progress = 0
      }
      return progress
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

.reverse-margin {
    margin-bottom: 0;
    margin-top: 10px;
}
</style>
