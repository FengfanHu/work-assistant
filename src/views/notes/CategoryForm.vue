<template>
  <v-form ref="form" v-model="valid">
    <v-container>
      <v-row align="center">
        <v-col cols="6">
          <v-text-field label="目录名称"
                        v-model="category.title"
                        counter="15"
                        :rules="nameRules">
          </v-text-field>
        </v-col>
        <v-col cols="4">
          <v-btn @click="selectDir" text>
            <v-icon>mdi-briefcase</v-icon>
            <span class="ml-2">选择目录</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-card-subtitle>所选路径：{{ category.path }}</v-card-subtitle>
      </v-row>
      <v-row>
        <v-col>
          <v-btn color="success" @click="onSubmit" :disabled="!category.path">
            {{ type==='edit' ? '更新目录' : '创建目录' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import dialog from '@/utils/dialog'

export default {
  name: 'CategoryForm',
  props: {
    category: Object,
    type: String
  },
  data () {
    return {
      valid: false,
      nameRules: [
        (v) => !!v || '请输入目录名称',
        (v) => (v && v.length <= 15) || '目录名称必须在10字以内'
      ]
    }
  },
  methods: {
    selectDir () {
      this.category.path = dialog.selectDirectory()[0]
    },
    onSubmit () {
      if (this.valid) {
        let info
        if (this.type === 'edit') {
          this.$db.read()
            .get('categories')
            .updateById(this.category.id, this.category)
            .write()
          this.$store.commit('categories/refreshCategories')
          // eslint-disable-next-line no-unused-vars
          info = { type: 'success', message: '更新成功' }
        } else {
          this.$db.read()
            .get('categories')
            .insert(this.category)
            .write()
          this.$store.commit('categories/refreshCategories')
          // eslint-disable-next-line no-unused-vars
          info = { type: 'success', message: '添加成功' }
        }
        // eslint-disable-next-line no-undef
        this.$store.commit('message/Notification', info)
        // 清空表单
        this.$refs.form.reset()
      }
    }
  }
}
</script>

<style scoped>

</style>
