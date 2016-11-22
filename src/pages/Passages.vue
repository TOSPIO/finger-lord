<template>
  <div>
    <template v-for="passage in passages">
      <div class="list-group">
        <div class="list-group-item">
          <div class="row-action-primary">
            <router-link :to="`/typing/${passage.id}`">
              <i class="material-icons" style="background-color: #009688">{{ passage.title[0] }}</i>
            </router-link>
          </div>
          <div class="row-content">
            <div class="least-content">{{ passage.mode }}</div>
            <h4 class="list-group-item-heading">
              <router-link :to="`/typing/${passage.id}`">{{ passage.title }}</router-link>
            </h4>
            <p class="list-group-item-text">The first 30 words or so of the passage...</p>
          </div>
        </div>
      <div class="list-group-separator"></div>
    </template>
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
    },
    methods: {
    }
  }
</script>
