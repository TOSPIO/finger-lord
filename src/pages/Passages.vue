<template>
  <div>
    <h3>Select one passage from below to test your typing speed!</h3>
    <ul class="list-group">
      <li class="list-group-item" v-for="passage in passages">
        <router-link :to="`/typing/${passage.id}`">{{ passage.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'passages-page',
    data () {
      return {
        passages: []
      }
    },
    created () {
      this.http_get('passages').then(response => {
        this.passages = response.body
      }, response => {
      })
    }
  }
</script>
