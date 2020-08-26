<template>
  <v-row class="mx-0">
    <!-- Left -->
    <v-card
      width="250"
      class="invisible-scrollbar"
      style="max-height: 100vh; overflow-y: scroll"
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img :src="user.avatarUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            {{ user.nickname }}
          </v-list-item-title>
          <v-list-item-subtitle>
            生日：{{ new Date(parseInt(user.birthday)).toLocaleDateString() }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            性别：{{ user.gender === 1 ? '男' : '女' }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-subheader>我的歌单</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="play in playList"
            :key="play.id"
            :to="{ name: 'PlayList', params: { id: play.id } }"
          >
            <v-list-item-icon>
              <v-img :src="play.coverImgUrl" contain width="20px"></v-img>
            </v-list-item-icon>
            <v-list-item-content class="px-0">
              <v-list-item-title v-text="play.name"></v-list-item-title>
              <v-list-item-subtitle>
                {{ play.trackCount }}首-By {{ play.creator.nickname }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
    <!-- Main -->
    <router-view></router-view>
  </v-row>
</template>

<script>
import { getUserDetail, getPlayList } from '@/api/user';

export default {
  name: 'Show',
  data() {
    return {
      user: {
        avatarUrl: '',
        nickname: 'userName',
        birthday: '0000/0/0',
      },
      playList: [],
    };
  },
  created() {
    const uid = sessionStorage.getItem('uid');
    // 获取用户信息
    getUserDetail({ uid })
      .then((response) => {
        this.user = response.data.profile;
      })
      .catch((error) => {
        console.log(error);
      });
    // 获取歌单
    getPlayList({ uid })
      .then((response) => {
        console.log('歌单加载成功');
        this.playList = response.data.playlist;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.invisible-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
