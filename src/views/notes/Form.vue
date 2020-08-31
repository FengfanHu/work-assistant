<template>
  <div class="pa-0">
    <v-row>
      <v-col cols="8">
        <v-text-field placeholder="请输入笔记标题"
                      v-model="note.title"
                      :rules="titleRules">
        </v-text-field>
      </v-col>
      <v-col>
        <v-select
          v-model="note.parent"
          :items="categories"
          :rules="selectRules"
          label="Categories"
          item-text="title"
          item-value="id"
        ></v-select>
      </v-col>
    </v-row>
    <v-row justify="center" class="my-5 invisible-scrollbar" style="max-height: 650px; overflow-y: scroll">
      <mavon-editor v-model="note.markdown"
                    :subfield="false"
                    @save="save"
                    style="max-width: 900px; z-index: 0"/>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'Form',
  props: {
    note: Object
  },
  data () {
    return {
      selectRules: [
        (v) => !!v || '您必须选择一个分类'
      ],
      titleRules: [
        (v) => !!v || '您必须选择一个分类'
      ]
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories.categories
    }
  },
  methods: {
    save (value, render) {
      this.note.html = render
      this.$db.read()
        .get('categories')
        .getById(this.note.parent)
        .get('notes')
        .insert(this.note)
        .write()
      // 消息弹窗
      const info = { type: 'success', message: '添加成功' }
      this.$store.commit('message/Notification', info)
      // 刷新目录
      this.$store.commit('categories/refreshCategories')
    }
  }
}
</script>

<style scoped>
.invisible-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
