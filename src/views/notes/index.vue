<template>
  <v-row justify="center">
    <router-view class="pa-5"></router-view>
  </v-row>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      value: ''
    }
  }
}
</script>

<style scoped>

</style>
