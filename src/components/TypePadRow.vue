<template>
    <div class="row">
      <div class="text">
        <span v-for="char in internalText" :class="char.klass">{{ char.char }}</span>
      </div>
      <div class="input">
        <input type="text" v-model="input" ref="inputBox">
      </div>
    </div>
  </template>

<script>
  import _ from 'lodash'

  export default {
    name: 'type-pad-row',
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        internalText: _.map(this.text.split(''), c => {
          return {
            char: c,
            klass: ''
          }
        }),
        input: '',
        hasTyped: false
      }
    },
    watch: {
      input: function (newInput) {
        if (!this.hasTyped) {
          this.hasTyped = true
          this.$emit('typed')
        }
        let allClear = true
        for (let idx = 0; idx < this.internalText.length; ++idx) {
          let textChar = this.internalText[idx]
          let inputChar = newInput[idx]
          if (textChar.char === inputChar) {
            textChar.klass = 'correct'
          } else if (inputChar === undefined) {
            textChar.klass = ''
            allClear = false
          } else {
            textChar.klass = 'incorrect'
            allClear = false
          }
        }
        if (allClear) {
          this.$emit('allClear')
        }
      }
    },
    methods: {
      focus () {
        this.$refs.inputBox.focus()
      }
    }
  }
</script>

<style>
  .row {
  border: gray;
  text-align: left;
  }

  .input input[type=text] {
  color: gray;
  width: 100%;
  }

  .correct {
  color: green;
  }

  .incorrect {
      color: white;
      background-color: red;
  }
</style>
