<template>
  <v-navigation-drawer
    :mini-variant.sync="mini"
    :mini-variant-width="50"
    permanent
    class="pl-1"
    dark
  >
    <v-list-item class="ml-2">
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
        Fun Work
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>
    <v-divider></v-divider>

    <v-list class="pl-1" dense>
      <v-list-group
        v-for="tag in tags"
        :key="tag.id"
        v-model="tag.active"
        :prepend-icon="tag.action"
        color="#2EA9DF"
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
          color="#FFFFFF">
          <v-list-item-content>
            <v-list-item-title
              v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// import db from '@/utils/db';

export default {
  name: 'Left',
  data() {
    return {
      mini: false,
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
