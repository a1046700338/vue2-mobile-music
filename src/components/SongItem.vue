<template>
  <van-cell class="song_item_wrap" :id="id" :title=name :label=author @click="getSongId()">
    <template #right-icon>
      <van-icon name="play-circle-o" class="search-icon" @touchstart="onPlay"/>
    </template>
  </van-cell>
</template>
  
<script>
import Vue from 'vue'
import { Cell } from 'vant'
Vue.use(Cell)
export default {
  name: 'SongItem',
  props: {
    name: String, /*歌曲名*/
    author: String, /*作者*/
    id: Number, /*歌曲id*/
  },
  methods: {
    onPlay(){
      this.$router.push({
        path: '/play',
        query: {
          id: this.id
        }
      })
    },
    getSongId() {
      // this.$store.state.songId = this.id
      this.$store.commit('getid',this.id)
      this.$router.push({
        path: '/comment',
        query: {
          id: this.id
        }
      })
    },
  }
}
</script>
  
<style scoped>
.song_item_wrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  padding-left: 20px;
}
.search-icon {
  font-size: 16px;
  line-height: inherit;
  vertical-align: middle;
}
</style>
  