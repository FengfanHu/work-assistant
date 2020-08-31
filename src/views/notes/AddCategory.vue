<template>
  <v-row justify="center" align="center">
    <CategoryForm :category="category"></CategoryForm>
  </v-row>
</template>

<script>
import CategoryForm from '@/views/notes/CategoryForm'

export default {
  name: 'AddCategory',
  components: { CategoryForm },
  data () {
    return {
      category: {
        title: '',
        path: '',
        notes: []
      }
    }
  }
}
</script>

<style scoped>

</style>
