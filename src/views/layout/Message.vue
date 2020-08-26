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
    snackbarMessage() {
      return this.$store.state.snackbarMessage;
    },
    snackbarType() {
      return this.$store.state.snackbarType;
    },
    snackbar: {
      get() {
        return this.$store.state.snackbar;
      },
      set(newValue) {
        console.log(newValue);
        this.$store.commit('refreshNoti');
      },
    },
  },
};
</script>

<style scoped>
</style>
