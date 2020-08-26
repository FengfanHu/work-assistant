<template>
  <div>
    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
    >
      <v-row>
        <v-col cols="3" class="py-10">
          <v-btn
            v-if="type === 'add'"
            :disabled="!valid"
            color="success"
            @click="addItem"
            class="mb-5">
            添加项目
          </v-btn>
          <v-btn
            v-if="type === 'modify'"
            :disabled="!valid"
            color="success"
            @click="modifyItem"
            class="mb-5">
            更新项目
          </v-btn>
          <v-btn
            color="error"
            @click="reset">
            重置表单
          </v-btn>
        </v-col>

        <v-col cols="8">
          <v-radio-group
            v-model="item.type"
            row
            required>
            <v-radio label="任务" value="task"></v-radio>
            <v-radio label="计划" value="schedule"></v-radio>
          </v-radio-group>

          <v-text-field
            v-model="item.title"
            counter="10"
            :rules="nameRules"
            label="ItemName"
            outlined
            required
          ></v-text-field>

          <v-select
            v-model="item.parent"
            :items="tags"
            :rules="selectRules"
            label="Tags"
            item-text="title"
            item-value="id"
            outlined
            required
          ></v-select>

          <v-textarea
            solo
            v-model="item.description"
            counter="120"
            :rules="descriptionRules"
            label="Description"
          ></v-textarea>

          <!-- 选取开始与结束时间 -->
          <v-row v-show="item.type === 'task'">
            <!-- Start -->
            <v-col>
              <v-menu
                v-model="startMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="item.time.start"
                    label="Pick start time"
                    prepend-icon="mdi-clock"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hint="根据需要设置起始时间"
                    persistent-hint
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="item.time.start"
                  landscape
                  scrollable
                  :max="item.time.end"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <!-- End -->
            <v-col>
              <v-menu
                v-model="endMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="item.time.end"
                    label="Pick end time"
                    prepend-icon="mdi-clock"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    hint="根据需要设置结束时间"
                    persistent-hint
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="item.time.end"
                  landscape
                  scrollable
                  :min="item.time.start"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>

export default {
  name: 'Form',
  props: {
    item: Object,
    type: String,
  },
  data() {
    return {
      valid: false,
      startMenu: false,
      endMenu: false,
      picker: '',
      nameRules: [
        (v) => !!v || '请输入项目名称',
        (v) => (v && v.length <= 10) || '项目名称超过限制字数',
      ],
      selectRules: [
        (v) => !!v || '您必须选择一个分类',
      ],
      descriptionRules: [
        (v) => ((v) ? v.length <= 120 : true) || '项目描述超过限制字数',
      ],
      lazy: false,
      tags: this.$store.state.tags.tags,
      originTag: this.item.parent,
    };
  },
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    addItem() {
      if (this.valid) {
        // 获取对应的Tag的Items
        const items = this.$db.read()
          .get('tags')
          .getById(this.item.parent)
          .get('items');
        // 插入新的Item
        items.insert(this.item).write();
        // 消息弹窗
        const info = { type: 'success', message: '添加成功' };
        this.$store.commit('Notification', info);
        // 清空表单
        this.$refs.form.reset();
        // 刷新Tags
        this.$store.commit('tags/refreshTags');
        // 跳转到Home
        this.$router.push({ name: 'Home' });
      }
    },
    modifyItem() {
      if (this.valid) {
        if (this.originTag !== this.item.parent) {
          // 若分类改变则先删除
          this.$db.read()
            .get('tags')
            .getById(this.originTag)
            .get('items')
            .removeById(this.item.id)
            .write();
          // 获取最新Tag的Items
          const items = this.$db.read()
            .get('tags')
            .getById(this.item.parent)
            .get('items');
          // 插入新的Item
          items.insert(this.item).write();
        } else {
          const items = this.$db.read()
            .get('tags')
            .getById(this.originTag)
            .get('items');
          items.updateById(this.item.id, this.item).write();
        }
        // 消息弹窗
        const info = { type: 'success', message: '修改成功' };
        this.$store.commit('Notification', info);
        // 清空表单
        this.$refs.form.reset();
        // 刷新Tags
        this.$store.commit('tags/refreshTags');
        // 回退
        this.$router.back();
      }
    },
  },
};
</script>

<style scoped>

</style>
