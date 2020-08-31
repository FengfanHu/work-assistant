<template>
  <v-row class="invisible-scrollbar"
         justify="start"
         align="start"
         style="max-width: 800px; max-height: 100vh; overflow-y: scroll">
    <div v-html="note.html"></div>
  </v-row>
</template>

<script>

export default {
  name: 'ShowNote',
  data () {
    return {
    }
  },
  computed: {
    note () {
      const categories = this.$store.state.categories.categories
      for (let i = 0; i < categories.length; i++) {
        const { notes } = categories[i]
        for (let j = 0; j < notes.length; j++) {
          const note = notes[j]
          if (note.id === this.$route.params.id) {
            return note
          }
        }
      }
      return ''
    }
  }
}
</script>

<style scoped>
.invisible-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
