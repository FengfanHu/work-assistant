<template>
  <v-navigation-drawer
    :mini-variant.sync="mini"
    :mini-variant-width="50"
    permanent
    class="pl-1"
    dark
  >
    <v-list class="pl-2" dense>
      <v-list-item>
        <!-- 选项菜单 -->
        <v-menu offset-x transition="slide-x-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon>
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <v-list color="transparent" dense>
            <v-list-item
              v-for="(option, index) in options"
              :key="index"
              class="text-center"
              style="width: 150px;">
              <v-btn :to="{ name: option.to }">
                <v-icon>{{ option.icon }}</v-icon>
                <v-list-item-title>{{ option.title }}</v-list-item-title>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn class="ml-2" :to="{ name: 'Home' }" text dark>
          FRANK'S KIT
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <!--  类型选择 计划 or 笔记  -->
    <v-list class="pl-2" dense>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon>mdi-apps</v-icon>
        </v-list-item-avatar>
        <v-list-item-content v-for="type in types" :key="type.id">
          <v-btn text
                 @click="currentType = type.id"
                 v-text="type.title"
                 :color="currentType === type.id ? 'warning' : null">
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list class="pl-2" dense v-if="currentType === 0">
      <v-list-group
        v-for="tag in $store.state.tags.tags"
        :key="tag.id"
        v-model="tag.active"
        :prepend-icon="tag.action"
        color="#2EA9DF"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-badge inline :content="tag.items.length" dark>
              <v-list-item-title v-text="tag.title"></v-list-item-title>
            </v-badge>
          </v-list-item-content>
        </template>
        <v-list-item v-if="tag.description">
          <v-subheader class="pl-0 mr-3">{{ tag.description }}</v-subheader>
        </v-list-item>
        <v-list-item
          v-for="subItem in tag.items"
          :key="subItem.id"
          :to="{ name: 'ShowItem', params: { id: subItem.id } }"
          color="#FFFFFF">
          <v-list-item-content>
            <v-list-item-title
              v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-list
      class="pl-2"
      v-if="currentType === 1"
      dense>
      <v-list-group
        v-for="category in $store.state.categories.categories"
        :key="category.id"
        prepend-icon="mdi-note"
        color="#2EA9DF">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="category.title "></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item
          v-for="note in category.notes"
          :key="note.id"
          :to="{ name: 'ShowNote', params: { id: note.id } }"
          color="#FFFFFF">
          <v-list-item-content>
            <v-list-item-title
              v-text="note.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-row>
              <v-col class="pa-0">
                <v-btn
                  icon
                  :to="{ name: 'EditNote', params: { cid: category.id, nid: note.id } }">
                  <v-icon>mdi-pen</v-icon>
                </v-btn>
              </v-col>
              <v-col class="pa-0">
                <v-btn
                  icon
                  @click.stop="deleteNote(category.id, note.id)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

import dialog from '@/utils/dialog'

export default {
  name: 'Left',
  data () {
    return {
      mini: false,
      TagOptions: [
        {
          title: '新增分类',
          icon: 'mdi-plus',
          to: 'AddTag'
        },
        {
          title: '新增任务',
          icon: 'mdi-plus',
          to: 'AddItem'
        },
        {
          title: '管理分类',
          icon: 'mdi-microsoft-xbox-controller-menu',
          to: 'ManageTag'
        }
      ],
      CategoryOptions: [
        {
          title: '新增目录',
          icon: 'mdi-plus',
          to: 'AddCategory'
        },
        {
          title: '新增笔记',
          icon: 'mdi-plus',
          to: 'AddNote'
        },
        {
          title: '管理目录',
          icon: 'mdi-microsoft-xbox-controller-menu',
          to: 'ManageCategory'
        }
      ],
      types: [
        {
          id: 0,
          title: '计划'
        },
        {
          id: 1,
          title: '笔记'
        }
      ],
      currentType: 0
    }
  },
  computed: {
    options () {
      return this.currentType === 0 ? this.TagOptions : this.CategoryOptions
    }
  },
  methods: {
    deleteNote (categoryId, noteId) {
      const confirm = dialog.confirm(':< 你真的要删除该笔记吗？')
      if (confirm) {
        this.$db.read()
          .get('categories')
          .getById(categoryId)
          .get('notes')
          .removeById(noteId)
          .write()
        // 消息弹窗
        const info = { type: 'success', message: '删除成功' }
        this.$store.commit('message/Notification', info)
        // 刷新Tags
        this.$store.commit('categories/refreshCategories')
        // 跳转
        this.$router.push({ name: 'Home' })
      }
    }
  }
}
</script>

<style scoped>
</style>
