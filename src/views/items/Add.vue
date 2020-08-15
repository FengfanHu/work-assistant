<template>
  <v-row justify="center" align="center">
    <Form :item="item" type="add"></Form>
  </v-row>
</template>

<script>
import Form from '@/views/items/Form.vue';

export default {
  name: 'Add',
  components: { Form },
  data() {
    return {
      item: {
        title: '',
        description: '',
        type: 'task',
        time: {
          start: '',
          end: '',
        },
        parent: '',
      },
    };
  },
};
</script>

<style scoped>

</style>
