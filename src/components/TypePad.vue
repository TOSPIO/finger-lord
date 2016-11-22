<template>
    <div>
        <type-pad-row v-for="(row, idx) in rows" :text="row" :isLastRow="idx === rows.length - 1" :mode="mode" :isActive="currentRowIdx === idx" @allClear="onRowClear(row, idx)" @typed="onTyped" @moveUp="onMoveUp(row, idx)" @vomit="onVomit(row, idx, $event)" ref="typePadRow"></type-pad-row>
    </div>
</template>

<script>
import TypePadRow from './TypePadRow'

export default {
  name: 'type-pad',
  created () {
  },
  props: {
  },
  data () {
    return {
      content: '',
      hasTyped: false,
      currentRowIdx: 0,
      mode: 'western'
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
    },
    totalInputChars () {
      let totalInputChars = 0
      for (let rowIdx = 0; rowIdx < this.rows.length; rowIdx++) {
        let row = this.$refs.typePadRow[rowIdx]
        totalInputChars += row.totalInputChars
      }
      return totalInputChars
    },
    totalValidInputChars () {
      let totalValidInputChars = 0
      for (let rowIdx = 0; rowIdx < this.rows.length; rowIdx++) {
        let row = this.$refs.typePadRow[rowIdx]
        totalValidInputChars += row.totalValidInputChars
      }
      return totalValidInputChars
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
    loadContent (content) {
      this.content = content
    },
    setMode (mode) {
      this.mode = mode
    },
    onTyped () {
      if (!this.hasTyped) {
        this.hasTyped = true
        this.$emit('startTyping')
      }
    },
    onRowClear (row, idx) {
      this.currentRowIdx = idx + 1
      let nextTypePadRow = this.$refs.typePadRow[idx + 1]
      if (nextTypePadRow === undefined) {
        this.$emit('allClear')
      }
    },
    onMoveUp (row, idx) {
      let prevTypePadRow = this.$refs.typePadRow[idx - 1]
      if (prevTypePadRow !== undefined) {
        this.currentRowIdx = idx - 1
      }
    },
    onVomit (row, idx, s) {
      let nextTypePadRow = this.$refs.typePadRow[idx + 1]
      if (nextTypePadRow !== undefined) {
        nextTypePadRow.input = s + nextTypePadRow.input
      }
    }
  },
  components: {
    TypePadRow
  }
}
</script>
