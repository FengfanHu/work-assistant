<template>
  <v-app>
      <left></left>
      <router-view class="main-wrap"></router-view>
  </v-app>
</template>

<script>
import Left from '@/views/layout/Left.vue';

export default {
  name: 'App',
  components: { Left },
  data() {
    return {
      tags: this.$db.read().value(),
    };
  },
};
</script>

<style scoped>
.main-wrap {
  position: fixed;
  left: 300px;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
