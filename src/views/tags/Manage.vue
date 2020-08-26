<template>
  <v-row justify="start">
    <!--  Tags  -->
    <v-col cols="4">
      <v-list rounded v-model="currentTag.id">
        <v-list-item-group color="primary">
          <v-list-item
            v-for="tag in tags"
            :key="tag.id"
            color="warning"
            @click="changeCurrentTag(tag.id)"
          >
            <v-list-item-icon>
              <v-icon v-text="tag.action"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="tag.title"></v-list-item-title>
            </v-list-item-content>
            <v-btn icon color="red"
                   class="ml-2"
                   @click.stop="deleteTag(tag.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>

    <!-- Form -->
    <v-col cols="8" class="pa-12" v-show="currentTag.id">
      <Form :tag="currentTag" type="modify"></Form>
    </v-col>
  </v-row>
</template>

<script>
import dialog from '@/utils/dialog';
import Form from '@/views/tags/Form.vue';

export default {
  name: 'Manage',
  components: { Form },
  data() {
    return {
      currentTag: {
        id: '',
      },
    };
  },
  computed: {
    tags() {
      return this.$store.state.tags.tags;
    },
    items() {
      return this.tags[this.currentTag].items;
    },
  },
  methods: {
    changeCurrentTag(id) {
      const chosenTag = this.$db.read().get('tags').find({ id }).value();
      this.currentTag = chosenTag.id === this.currentTag.id ? {} : chosenTag;
    },
    deleteTag(id) {
      const confirm = dialog.confirm('您确定要删除此分类？');
      if (confirm) {
        this.$db.read().get('tags').removeById(id).write();
        // 消息弹窗
        const info = { type: 'success', message: '删除成功' };
        this.$store.commit('Notification', info);
        // 刷新Tags
        this.$store.commit('tags/refreshTags');
      }
    },
  },
};
</script>

<style scoped>

</style>
