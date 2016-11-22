<template>
  <form>
    <div class="form-group">
      <label for="passageTitle">Title</label>
      <input type="text" class="form-control" id="passageTitle" v-model="title" placeholder="Anything you like">
    </div>
    <div class="form-group">
      <label for="passageContent">Content</label>
      <textarea rows="20" class="form-control" id="passageContent" v-model="content" placeholder="Anything you like">
      </textarea>
    </div>
    <div class="form-group">
        <label for="passageMode">Mode</label>
        <div class="radio">
          <label>
            <input type="radio" id="passageModeWestern" value="western" v-model="mode">
            Western (Need an extra Space or Enter key to terminate each line (except the last line)
          </label>
        </div>
        <div class="radio">
          <label>
            <input type="radio" id="passageModeCJK" value="cjk" v-model="mode">
            CJK (Lines are terminated upon the input of the last characters)
          </label>
        </div>
      </select>
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
        content: '',
        mode: 'western'
      }
    },
    methods: {
      onSubmit () {
        this.http_post('passages', {
          title: this.title,
          content: this.content,
          mode: this.mode
        }).then(response => {
          alert('Saved')
        }, response => {
        })
      }
    }
  }
</script>
