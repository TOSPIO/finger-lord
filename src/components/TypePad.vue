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
      rows: [
        'Hello world',
        'The quick brown fox jumps over the lazy dog.'
      ],
      hasTyped: false
    }
  },
  methods: {
    onTyped () {
      if (!this.hasTyped) {
        this.hasTyped = true
        this.$emit('startTyping')
      }
    },
    rowClear (row, idx) {
      let nextTypePadRow = this.$refs.typePadRow[idx + 1]
      if (nextTypePadRow !== undefined) {
        nextTypePadRow.activate()
      } else {
        this.$emit('allClear')
      }
    }
  },
  mounted () {
    let firstRow = this.$refs.typePadRow[0]
    if (firstRow !== undefined) {
      firstRow.activate()
    } else {
    }
  },
  components: {
    TypePadRow
  }
}
</script>
