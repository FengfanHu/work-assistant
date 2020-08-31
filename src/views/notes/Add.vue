<template>
  <Form :note="note"></Form>
</template>

<script>

import Form from '@/views/notes/Form'
export default {
  name: 'add',
  components: { Form },
  data () {
    return {
      note: {
        parent: '',
        title: '',
        html: '',
        markdown: ''
      }
    }
  }
}
</script>

<style scoped>
.invisible-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
