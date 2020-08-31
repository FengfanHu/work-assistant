<template>
  <v-row justify="start">
    <!--  Tags  -->
    <v-col cols="4">
      <v-list rounded v-model="currentCategory.id">
        <v-list-item-group color="primary">
          <v-list-item
            v-for="category in categories"
            :key="category.id"
            color="warning"
            @click="changeCurrentCategory(category.id)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="category.title"></v-list-item-title>
            </v-list-item-content>
            <v-btn icon color="red"
                   class="ml-2"
                   @click.stop="deleteCategory(category.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>

    <!-- Form -->
    <v-col cols="8" class="px-12" v-show="currentCategory.id">
      <CategoryForm :category="currentCategory" type="edit"></CategoryForm>
    </v-col>
  </v-row>
</template>

<script>
import dialog from '@/utils/dialog'
import CategoryForm from '@/views/notes/CategoryForm.vue'

export default {
  name: 'Manage',
  components: { CategoryForm },
  data () {
    return {
      currentCategory: {
        id: ''
      }
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories.categories
    },
    notes () {
      return this.categories[this.currentTag].notes
    }
  },
  methods: {
    changeCurrentCategory (id) {
      const chosenCategory = this.$db.read().get('categories').find({ id }).value()
      this.currentCategory = chosenCategory.id === this.currentCategory.id ? {} : chosenCategory
    },
    deleteCategory (id) {
      const confirm = dialog.confirm('您确定要删除此分类？')
      if (confirm) {
        this.$db.read().get('categories').removeById(id).write()
        // 消息弹窗
        const info = { type: 'success', message: '删除成功' }
        this.$store.commit('message/Notification', info)
        // 刷新Tags
        this.$store.commit('categories/refreshCategories')
      }
    }
  }
}
</script>

<style scoped>

</style>
