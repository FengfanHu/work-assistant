<template>
  <v-row justify="center" align="center">
    <v-card min-width="400px" min-height="200px" class="pa-10">
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-subtitle>{{ item.type }}</v-card-subtitle>
      <v-card-text>
        <span class="blue--text text-button">描述信息: </span>
        {{ item.description ? item.description : '您尚未添加描述信息' }}
      </v-card-text>
      <v-card-text class="py-0" v-if="time!=='-'">
        <span class="blue--text text-button">项目时间: </span>
        {{ time }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          color="red accent-4"
          @click="deleteItem"
        >
          删除项目
        </v-btn>
        <v-btn
          text
          color="primary accent-4"
          :to="{ name: 'EditItem'} "
        >
          编辑项目
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-row>
</template>

<script>
import dialog from '@/utils/dialog';

export default {
  name: 'Show',
  data() {
    return {
    };
  },
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
    time() {
      return `${this.item.time.start}-${this.item.time.end}`;
    },
  },
  methods: {
    deleteItem() {
      const confirm = dialog.confirm(':< 你真的要删除此项目吗？');
      if (confirm) {
        this.$db.read()
          .get('tags')
          .getById(this.item.parent)
          .get('items')
          .removeById(this.item.id)
          .write();
        // 刷新Tags
        this.$store.commit('tags/refreshTags');
        // 跳转
        this.$router.push({ name: 'Home' });
      }
    },
  },
};
</script>

<style scoped>

</style>
