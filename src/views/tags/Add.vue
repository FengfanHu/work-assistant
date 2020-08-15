<template>
  <v-row justify="center" align="center">
    <Form :tag="tag" type="add"></Form>
  </v-row>
</template>

<script>
import Form from '@/views/tags/Form.vue';

export default {
  name: 'Add',
  components: { Form },
  data() {
    return {
      snackbar: false,
      tag: {
        action: 'mdi-emoticon',
        title: '',
        items: [],
        description: '',
      },
    };
  },
};
</script>

<style scoped>

</style>
