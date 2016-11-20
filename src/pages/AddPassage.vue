<template>
  <form>
    <div class="form-group">
      <label for="passageTitle">Title</label>
      <input type="text" class="form-control" id="passageTitle" v-model="title" placeholder="Anything you like">
    </div>
    <div class="form-group">
      <label for="passageTitle">Content</label>
      <textarea rows="20" class="form-control" id="passageTitle" v-model="content" placeholder="Anything you like">
      </textarea>
    </div>
    <button type="submit" class="btn btn-success" @click="onSubmit">Save</button>
  </form>
</template>

<script>
  export default {
    name: 'add-passage-page',
    data () {
      return {
        title: '',
        content: ''
      }
    },
    methods: {
      onSubmit () {
        this.http_post('passages', {
          title: this.title,
          content: this.content
        }).then(response => {
          alert('Saved')
        }, response => {
        })
      }
    }
  }
</script>
