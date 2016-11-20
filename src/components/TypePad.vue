<template>
    <div>
        <type-pad-row v-for="(row, idx) in rows" :text="row" @allClear="rowClear(row, idx)" @typed="onTyped" ref="typePadRow"></type-pad-row>
    </div>
</template>

<script>
import TypePadRow from './TypePadRow'

export default {
  name: 'type-pad',
  created () {
  },
  data () {
    return {
      content: '',
      hasTyped: false,
      currentRow: 0
    }
  },
  computed: {
    rows () {
      if (this.content === undefined) {
        return []
      }
      return this.content.split('\n')
    },
    correctChars () {
      let correctChars = 0
      for (let rowIdx = 0; rowIdx < this.rows.length; rowIdx++) {
        let row = this.$refs.typePadRow[rowIdx]
        correctChars += row.correctChars
      }
      return correctChars
    }
  },
  watch: {
    content (newContent) {
      if (this.$refs.typePadRow !== undefined) {
        let firstRow = this.$refs.typePadRow[0]
        if (firstRow !== undefined) {
          firstRow.activate()
        } else {
        }
      }
    }
  },
  methods: {
    onTyped () {
      if (!this.hasTyped) {
        this.hasTyped = true
        this.$emit('startTyping')
      }
    },
    loadContent (content) {
      this.content = content
    },
    rowClear (row, idx) {
      let nextTypePadRow = this.$refs.typePadRow[idx + 1]
      if (nextTypePadRow !== undefined) {
        this.currentRow += 1
        nextTypePadRow.activate()
      } else {
        this.$emit('allClear')
      }
    }
  },
  components: {
    TypePadRow
  }
}
</script>
