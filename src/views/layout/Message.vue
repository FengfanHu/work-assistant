<template>
  <v-snackbar
    :color="snackbarType"
    top
    v-model="snackbar"
    timeout="3000">
    <p class="text-center mb-0 font-weight-black">{{ snackbarMessage }}</p>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Message',
  computed: {
    snackbarMessage () {
      return this.$store.state.message.snackbarMessage
    },
    snackbarType () {
      return this.$store.state.message.snackbarType
    },
    snackbar: {
      get () {
        return this.$store.state.message.snackbar
      },
      set (newValue) {
        console.log(newValue)
        this.$store.commit('message/refreshNoti')
      }
    }
  }
}
</script>

<style scoped>
</style>
