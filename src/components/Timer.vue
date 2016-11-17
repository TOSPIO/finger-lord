<template>
  <span>{{ elapsed.toFixed(decimals) }}</span>
</template>

<script>
  export default {
    name: 'timer',
    props: {
      unit: {
        type: Number,
        default: 0.01
      },
      decimals: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        elapsed: 0,
        decimals: 0
      }
    },
    methods: {
      start () {
        this.tmr = setInterval(() => {
          this.elapsed += this.unit
        }, this.unit * 1000)
      },
      stop () {
        if (this.tmr !== undefined) {
          clearInterval(this.tmr)
        }
      },
      clear () {
        this.stop()
        this.elapsed = 0
      },
      restart () {
        this.clear()
        this.start()
      }
    }
  }
</script>
