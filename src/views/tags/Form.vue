<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy">
      <v-text-field
        v-model="tag.title"
        counter="10"
        :rules="nameRules"
        label="TagName"
        :append-icon="tag.action"
        outlined
      ></v-text-field>
      <v-text-field
        v-model="tag.description"
        counter="10"
        :rules="descriptionRules"
        label="Description"
        outlined
      ></v-text-field>
      <!-- 添加标签 -->
      <v-btn
        v-if="type==='modify'"
        color="success"
        class="mr-4"
        @click="modifyTag">
        更新标签
      </v-btn>
      <v-btn
        v-if="type==='add'"
        color="success"
        class="mr-4"
        @click="addTag"
        :disabled="!valid"
      >
        新增标签
      </v-btn>
      <!-- 选择图标 -->
      <v-menu
        :close-on-content-click="false"
        :nudge-width="200"
        offset-x
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="indigo"
            dark
            v-bind="attrs"
            v-on="on">
            选择图标
          </v-btn>
        </template>
        <v-card max-width="300px">
          <v-list>
            <v-list-item>
              <v-row>
                <v-col v-for="icon in icons" :key="icon">
                  <v-btn text @click="selectIcon(icon)">
                    <v-icon>{{ icon }}</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'Form',
  props: {
    tag: Object,
    type: String
  },
  data () {
    return {
      valid: false,
      lazy: false,
      icons: ['mdi-map-marker', 'mdi-train-car', 'mdi-brightness-5',
        'mdi-food', 'mdi-school', 'mdi-run',
        'mdi-stethoscope', 'mdi-briefcase', 'mdi-cart'],
      nameRules: [
        (v) => !!v || '请输入分类名称',
        (v) => (v && v.length <= 10) || '标签名必须在10字以内'
      ],
      descriptionRules: [
        (v) => ((v) ? v.length <= 10 : true) || '请精简您的描述信息哦～'
      ]
    }
  },
  methods: {
    selectIcon (icon) {
      this.tag.action = icon
    },
    addTag () {
      if (this.valid) {
        this.$db.read()
          .get('tags')
          .insert(this.tag)
          .write()
        // 消息弹窗
        const info = { type: 'success', message: '添加成功' }
        this.$store.commit('message/Notification', info)
        // 清空表单
        this.$refs.form.reset()
        // 刷新Tags组件
        this.$store.commit('tags/refreshTags')
      }
    },
    modifyTag () {
      const obj = this.$db.read().get('tags').getById(this.tag.id)
      obj.assign(this.tag).write()
      // 消息弹窗
      const info = { type: 'success', message: '修改成功' }
      this.$store.commit('message/Notification', info)
      // 刷新
      this.$store.commit('tags/refreshTags')
    }
  }
}
</script>

<style scoped>

</style>
