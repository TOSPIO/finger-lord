<template>
    <div class="row">
      <div class="text">
        <span v-for="char in internalText" :class="char.klass">{{ char.char }}</span>
      </div>
      <div class="input">
        <div class="form-group">
          <input type="text" class="form-control" v-model="input" ref="inputBox" @keydown="onKeyDown" v-bind:disabled="isDisabled">
        </div>
      </div>
    </div>
  </template>

<script>
  import _ from 'lodash'
  import Vue from 'vue'

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
        isDisabled: true,
        hasTyped: false
      }
    },
    watch: {
      input: function (newInput) {
        if (!this.hasTyped) {
          this.hasTyped = true
          this.$emit('typed')
        }
        for (let idx = 0; idx < this.internalText.length; ++idx) {
          let textChar = this.internalText[idx]
          let inputChar = newInput[idx]
          if (textChar.char === inputChar) {
            textChar.klass = 'correct'
          } else if (inputChar === undefined) {
            textChar.klass = ''
          } else {
            textChar.klass = 'incorrect'
          }
        }
        // if (allClear) {
        //   this.$emit('allClear')
        // }
      },
      isDisabled: function (newValue) {
        if (!newValue) {
          Vue.nextTick(() => {
            this.$refs.inputBox.focus()
          })
        }
      }
    },
    methods: {
      activate () {
        this.isDisabled = false
      },
      onKeyDown (evt) {
        if (evt.code === 'Tab') {
          evt.preventDefault()
        }
        if (evt.code === 'Space') {
          this.checkAllClear(evt)
        } else if (evt.code === 'Enter' || evt.code === 'Tab') {
          this.checkAllClear(evt)
        }
      },
      checkAllClear (evt) {
        if (this.input.length === this.internalText.length) {
          evt.preventDefault()
          this.allClear()
        }
      },
      allClear () {
        this.isDisabled = true
        this.$emit('allClear')
      }
    }
  }
</script>

<style>
.row {
  border: gray;
  text-align: left;
}

.text {
  font-family: monospace;
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
