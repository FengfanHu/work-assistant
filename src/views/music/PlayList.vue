<template>
    <div class="mx-auto" style="height: 100vh; max-width: 600px">
      <v-card class="mt-3" height="22%" min-height="180px">
        <v-row justify="center">
          <v-col cols="3" class="d-flex align-center">
            <v-img
              :src="playList.coverImgUrl"
              contain
              width="350px"></v-img>
          </v-col>
          <v-col cols="8" class="px-0">
            <v-card-title class="py-2 d-flex align-center my-2">
              <h4>{{ trimStr(playList.name, 12, 12) }}</h4>
            </v-card-title>

            <v-card color="#f5f5f5" class="mx-4 py-2" outlined>
              <v-row justify="center" align="center">
                <v-col cols="2">
                  <v-img :src="playList.creator.avatarUrl" width="50px"></v-img>
                </v-col>
                <v-col cols="6">
                  <v-card-title class="py-0" style="font-size: 12px">
                    歌单创建人：{{ trimStr(playList.creator.nickname, 8, 6) }}
                  </v-card-title>
                  <v-card-text class="py-0" style="font-size: 10px">
                    该歌单共有：{{ playList.trackCount }} 首歌
                  </v-card-text>
                </v-col>
                <v-col cols="2">
                  <v-btn color="red" fab dark elevation="1"
                         small
                         @click="playSong(playList.tracks[0].id)">
                    <v-icon>mdi-play</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
      <v-card class="mt-3 invisible-scrollbar" max-height="72%" style="overflow-y: scroll">
        <v-list-item-group color="primary" v-model="$store.state.music.item">
          <v-list-item
            v-for="track in playList.tracks"
            :key="track.id"
            @click="playSong(track.id, track.al.picUrl, track.name)"
            dense>
            <v-list-item-avatar>
              <v-img :src="track.al.picUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-title v-text="track.name"></v-list-item-title>
            <v-list-item-title>
              {{ track.ar.map((ele) => ele.name).join('-') }}
              《{{ track.al.name }}》
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-card>
    </div>
</template>

<script>
import { playListDetail } from '@/api/music'
import playMethod from '@/views/music/playMethod'

export default {
  mixins: [playMethod],
  name: 'PlayList',
  data () {
    return {
      playList: {
        creator: {}
      }
    }
  },
  methods: {
    getPlayList () {
      return playListDetail({ id: this.$route.params.id })
        .then((response) => {
          this.playList = response.data.playlist
          const list = []
          const listDetail = []
          this.playList.tracks.forEach((ele) => {
            list.push(ele.id)
            listDetail.push({ coverUrl: ele.al.picUrl, name: ele.name })
          })
          this.$store.commit('music/setPlayList', list)
          this.$store.commit('music/setListDetail', listDetail)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    trimStr (str, max, length) {
      return str && str.length > max ? `${str.slice(0, length)}..` : str
    }
  },
  created () {
    this.getPlayList()
  },
  // 组件的复用意味着 即使路由变换 生命周期的钩子不再被调用
  watch: {
    $route () {
      this.getPlayList()
    }
  }
}
</script>

<style scoped>
.invisible-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
