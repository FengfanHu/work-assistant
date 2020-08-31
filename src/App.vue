<template>
  <v-app>
    <Message></Message>
    <Music></Music>
    <v-row>
      <left style="height: 100vh"></left>
      <router-view style="height: 100vh"></router-view>
    </v-row>
  </v-app>
</template>

<script>
import Left from '@/views/layout/Left.vue'
import Music from '@/views/layout/Music.vue'
import Message from '@/views/layout/Message.vue'

export default {
  name: 'App',
  components: { Message, Music, Left },
  data () {
    return {
      tags: this.$db.read().value()
    }
  }
}
</script>

<style scoped>
</style>
