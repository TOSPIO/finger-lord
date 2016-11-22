<template>
    <div class="row">
      <div class="text">
        <span v-for="char in internalText" :class="char.klass">{{ char.char }}</span>
      </div>
      <div class="input">
        <input type="text" v-model="input" ref="inputBox" @keydown="onKeyDown" v-bind:disabled="!isActive">
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
      },
      isLastRow: {
        type: Boolean,
        default: false  // If isLastRow, then allClear is emitted on the last char
                        // instead of an extra space/enter
      },
      isActive: {
        type: Boolean,
        default: false
      },
      mode: {
        type: String,
        default: 'western'
      }
    },
    data () {
      return {
        input: '',
        hasTyped: false,
        correctChars: 0
      }
    },
    mounted () {
      if (this.isActive) {
        this.focus()
      }
    },
    computed: {
      internalText () {
        return _.map(this.text.split(''), c => {
          return {
            char: c,
            klass: ''
          }
        })
      },
      isAllClear () {
        return this.text.length === this.input.length
      },
      totalInputChars () {
        return this.input.length
      },
      totalValidInputChars () {
        return Math.min(this.totalInputChars, this.text.length)
      }
    },
    watch: {
      input: function (newInput) {
        if (!this.hasTyped) {
          this.hasTyped = true
          this.$emit('typed')
        }
        let correctChars = 0
        for (let idx = 0; idx < this.internalText.length; ++idx) {
          let textChar = this.internalText[idx]
          let inputChar = newInput[idx]
          if (textChar.char === inputChar) {
            textChar.klass = 'correct'
            correctChars++
          } else if (inputChar === undefined) {
            textChar.klass = ''
          } else {
            textChar.klass = 'incorrect'
          }
        }
        this.correctChars = correctChars
        if (this.isAllClear) {
          switch (this.mode) {
            case 'western':
              if (this.isLastRow) {
                this.allClear()
              }
              break
            case 'cjk':
              this.allClear()
              break
          }
        }
      },
      isActive: function (newValue) {
        if (newValue) {
          this.focus()
        }
      }
    },
    methods: {
      activate () {
        this.isDisabled = false
      },
      focus () {
        Vue.nextTick(() => {
          this.$refs.inputBox.focus()
        })
      },
      onKeyDown (evt) {
        if (evt.code === 'Tab') {
          evt.preventDefault()
          return
        }
        if (evt.code === 'Backspace') {
          if (this.$refs.inputBox.selectionStart === 0) {
            this.moveUp()
          }
        }
        switch (this.mode) {
          case 'western':
            if (!this.isLastRow) {
              if (evt.code === 'Space' || evt.code === 'Enter') {
                if (this.isAllClear) {
                  evt.preventDefault()
                  this.allClear()
                }
              }
            }
            break
          case 'cjk':
            if (evt.code === 'Enter') {
              evt.preventDefault()
            }
            break
        }
      },
      allClear () {
        this.isDisabled = true
        this.$emit('allClear')
      },
      moveUp () {
        this.isDisabled = true
        this.$emit('moveUp')
      }
    }
  }
</script>

<style>
.row {
  border: gray;
  text-align: left;
  margin-bottom: 20px;
}

.text {
  font-family: monospace;
}
.input input[type=text] {
  color: gray;
  width: 100%;
  font-family: monospace;
}

.correct {
  color: green;
}

.incorrect {
  color: white;
  background-color: red;
}
</style>
