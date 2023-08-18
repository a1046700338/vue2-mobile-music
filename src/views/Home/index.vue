<template>
  <div class="home">
    <!-- 推荐歌单 -->
    <NodeP :str="titleList.song" />
    <van-row gutter="5" type="flex" justify="space-between">
      <van-col span="7" v-for="(obj, index) in recommendList" :key="index" @click="handleMaskPanel(index)">
        <van-image width="100" height="100" :src="obj.picUrl" />
        <p class="song_name">{{ obj.name }}</p>
      </van-col>
      <!-- test start
      <van-col span="7" >
        <van-image width="100" height="100" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <p class="song_name">test</p>
      </van-col>
      <van-col span="7" >
        <van-image width="100" height="100" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <p class="song_name">test</p>
      </van-col>
      <van-col span="7" >
        <van-image width="100" height="100" src="https://img01.yzcdn.cn/vant/cat.jpeg" />
        <p class="song_name">test</p>
      </van-col>
      -->
    </van-row>
    <!-- 最新音乐列表 -->
    <NodeP :str="titleList.music" />
    <van-cell-group v-for="(obj, index) in newMusicList" :key="index">
      <SongItem :name="obj.name" :author="obj.song.artists[0].name + '《' + obj.name + '》'" :id="obj.id" />
      <!--
      <van-cell class="song_item_wrap" :title="obj.name" 
      :label="obj.song.artists[0].name + '《' + obj.name + '》'">
        <template #right-icon>
          <van-icon name="play-circle-o" class="search-icon"/>
        </template>
      </van-cell>
      -->
    </van-cell-group>
    <!-- 遮罩层 -->
    <van-action-sheet v-model="showMaskPanel" title="歌曲列表" @close="closeMaskPanel">
      <div class="content">
        <SongItem v-for="(obj, index) in songList" :key="index" :name="obj.name"
          :author="obj.ar[0].name + '《' + obj.name + '》'" :id="obj.id" />
      </div>
    </van-action-sheet>
  </div>
</template>
    
<script>
import Vue from 'vue'
import { Col, Row, Image as VanImage, Cell, CellGroup, Icon, ActionSheet, Toast } from 'vant'
import SongItem from '@/components/SongItem'
import NodeP from '@/components/NodeP'
import { recommendMusicAPI, newMusicAPI, getAllSongsAPI } from '@/api'
Vue.use(Col)
Vue.use(Row)
Vue.use(VanImage)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Icon)
Vue.use(ActionSheet)
Vue.use(Toast)
export default {
  async created() {
    const res = await recommendMusicAPI({ limit: 6, timestamp: new Date().getTime() })
    this.recommendList = res.data.result
    const songRes = await newMusicAPI({ limit: 10, timestamp: new Date().getTime() })
    this.newMusicList = songRes.data.result
    // res.data.result.picUrl 歌单封面
    // res.data.result.name 歌单介绍
    // res.data.result.name 歌单介绍
    /* 最新音乐 */
    // songRes.data.result.name 歌曲名
    // songRes.data.result.id 歌曲id
  },
  name: 'Home',
  data() {
    return {
      /* title文本 */
      titleList: {
        song: this.$store.state.titleList.song,
        music: this.$store.state.titleList.music
      },
      recommendList: [],/* 推荐歌单 */
      newMusicList: [],/* 最新音乐 */
      songList: [],/* 推荐歌单的歌曲列表 */
      song: {
        name: '歌曲名',
        singer: '歌手',
      },
      showMaskPanel: false, /* 是否弹出遮罩层 */
    }
  },
  components: { SongItem, NodeP },
  methods: {
    /* 弹出遮罩层-点击事件 */
    handleMaskPanel(index) {
      this.showMaskPanel = true
      this.getAllSongList(index)
    },
    /* 关闭弹出遮罩层-点击事件 */
    closeMaskPanel() {
      this.showMaskPanel = false
      this.songList = []
    },
    /*获取指定歌单内所有歌曲*/
    async getAllSongList(index) {
      await getAllSongsAPI({
        /* 传入参数 */
        id: this.recommendList[index].id, /* 歌单id */
        limit: 30, /* 限制获取歌曲的数量 */
        /* offset 后续 分页 参数 */
        timestamp: new Date().getTime() /* 时间戳(传入时间戳，防止api缓存) */
      }).then((listRes) => {
        /* 遍历歌曲列表 */
        /* 将歌单id对应的歌曲列表数据传给data */
        this.songList.push(...listRes.data.songs)
        /*  老方法
        const songArr = []
        for (let i = 0; i < list.length; i++) {
          songArr.push(list[i])
        }
        this.songList = songArr
        */
        // listRes.data.songs
        // list[i].name /*歌名*/
        // list[i].id /*歌曲id*/
        // list[i].al.name /*作者*/
        // list[i].al.picUrl /*歌曲封面*/
        // listRes.data.code 状态码
      }).catch((error) => {
        Toast.fail('抱歉未能获取到歌曲数据QAQ')
        console.log(error)
      })
    }
  }
}
</script>
    
<style scoped lang="less">

.home {
  margin-top: 50px;
}

.song_name {
  font-size: 0.346rem;
  padding: 0 0.08rem;
  margin-bottom: 0.267rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>