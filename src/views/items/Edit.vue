<template>
  <v-row justify="center" align="center">
    <Form :item="item" type="modify"></Form>
  </v-row>
</template>

<script>
import Form from '@/views/items/Form.vue';

export default {
  name: 'Edit',
  components: { Form },
  computed: {
    item() {
      const allItems = this.$store.state.tags.tags;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < allItems.length; i++) {
        const { items } = allItems[i];
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < items.length; j++) {
          const item = items[j];
          if (item.id === this.$route.params.id) {
            return item;
          }
        }
      }
      // :TODO 没有找到，程序出错（一般不会出现）
      return '';
    },
  },
};
</script>

<style scoped>

</style>
