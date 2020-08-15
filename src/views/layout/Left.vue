<template>
  <v-card
    height="100%"
    style="position: fixed; width: 300px;"
  >
    <v-toolbar
      class="px-3"
      flat
    >
      <v-toolbar-title>Work Assistant</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- 选项菜单 -->
      <v-menu offset-x transition="slide-x-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list color="transparent">
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
    </v-toolbar>
    <v-divider></v-divider>
    <v-list class="px-3">
      <v-list-group
        v-for="tag in tags"
        :key="tag.id"
        v-model="tag.active"
        :prepend-icon="tag.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="tag.title"></v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item v-if="tag.description">
          <v-subheader class="pl-0 mr-3">{{ tag.description }}</v-subheader>
        </v-list-item>
        <v-list-item
          v-for="subItem in tag.items"
          :key="subItem.id"
          :to="{ name: showItem, params: { id: subItem.id } }"
          color="success">
          <v-list-item-content>
            <v-list-item-title
              v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
// import db from '@/utils/db';

export default {
  name: 'Left',
  data() {
    return {
      options: [
        {
          title: '新增分类',
          icon: 'mdi-plus',
          to: 'AddTag',
        },
        {
          title: '新增任务',
          icon: 'mdi-plus',
          to: 'AddItem',
        },
        {
          title: '管理分类',
          icon: 'mdi-microsoft-xbox-controller-menu',
          to: 'ManageTag',
        },
      ],
      showItem: 'ShowItem',
    };
  },
  computed: {
    tags() {
      return this.$store.state.tags.tags;
    },
  },
};
</script>

<style scoped>
</style>
