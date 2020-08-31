<template>
  <Form :note="note"></Form>
</template>

<script>

import Form from '@/views/notes/Form'
export default {
  name: 'Edit',
  components: { Form },
  computed: {
    note () {
      return this.$db
        .read().get('categories')
        .getById(this.$route.params.cid)
        .get('notes')
        .getById(this.$route.params.nid)
        .value()
    }
  }
}
</script>

<style scoped>
.invisible-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
