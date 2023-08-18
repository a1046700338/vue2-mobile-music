<template>
  <div class="play">
    <!-- 模糊背景 -->
    <div class="song_bg" :style="`background-image: url(${songInfo && songInfo.al && songInfo.al.picUrl}`">
    </div>
    <!-- 播放页头部导航 -->
    <div class="header">
      <van-icon name="arrow-left" color="#1989fa" @click="$router.back()" />
    </div>
    <!-- 唱片容器 -->
    <div class="song_wrap" >
      <!-- 唱片旋转动画 -->
      <div class="song_item">
        <!-- 歌曲封面 -->
        <div class="song_img  ani" :style="`animation-play-state:${playState ? 'running' : 'paused'}`">
          <img style="width: 100%;"
            :src="`${songInfo && songInfo.al && songInfo.al.picUrl}?imageView&thumbnail=360y360&quality=75&tostatic=0`"
            alt="">
        </div>
      </div>
      <!-- 播放按钮 -->
      <div class="start_box" @click="playAudio">
        <div class="song_start" v-show="!playState"></div>
      </div>
      <!-- 播放歌词容器 -->
      <div class="song_msg">
        <!-- 歌词名 -->
        <h2 class="m_song_h2">
          <span class="m_song_sname">{{ songInfo.name }}-{{
            songInfo && songInfo.ar && songInfo.ar[0].name
          }}</span>
        </h2>
        <!-- 歌词部分，随着时间切换展示一句歌词 -->
        <div class="lrcContent">
          <p class="lrc">{{ curLyric }}</p>
        </div>
      </div>
      <!-- 唱臂 -->
      <div class="needle" :style="`transform: rotate(${needleDeg});`"></div>
      <!-- 音乐播放器 -->
      <audio ref="audioPlayer" muted preload :src='musicUrl'>
      </audio>
    </div>
  </div>
</template>
    
<script>
import Vue from 'vue'
import { getSongByIdAPI, getLyricByIdAPI, getMusicUrlAPI } from '@/api'
import { Icon } from 'vant'
Vue.use(Icon)
export default {
  name: 'Play',
  data() {
    return {
      playState: false, /* 歌曲播放状态(false播放, true暂停) */
      id: this.$route.query.id, /* 上一页传过来的音乐id */
      songInfo: {}, /* 歌曲信息 */
      lyric: {},
      curLyric: '', /* 当前显示哪句歌词 */
      lastLy: '', /* 记录当前播放歌词 */
      timer: 0, /* 初始化定时器 */
      musicUrl: '', /* 歌曲url */
    }
  },
  computed: {
    needleDeg() { // 留声机-唱臂的位置属性
      return this.playState ? '-7deg' : '-40deg'
    }
  },
  methods: {
    /* 获得歌曲详情 */
    async getSong() {
      const songResult = await getSongByIdAPI(this.id)
      this.songInfo = songResult.data.songs[0]
      /* 状态码打印 */
      const status = songResult.data.code
      if (status === 200) {
        console.log('成功获取歌曲数据了O(∩_∩)O', status)
      }
      // 获取歌词并调用_formatLyr方法, 处理歌词
      const lyrContent = await getLyricByIdAPI({ id: this.id, timestamp: new Date().getTime() })
      const lyricStr = lyrContent.data.lrc.lyric
      this.lyric = this._formatLyr(lyricStr)
      this.curLyric = this.lyric[0]
      /* 歌曲url获取 */
      const getUrlRes = await getMusicUrlAPI({
        id: this.id,
        level: 'standard',
        timestamp: new Date().getTime()
      })
      this.musicUrl = getUrlRes.data.data[0].url
      /* 状态码打印 */
      const code = getUrlRes.data.code
      if (code === 200) {
        console.log('成功获取歌曲url数据了O(∩_∩)O' + ' ' + this.musicUrl)
      }
    },
    /* 播放按钮-点击事件 */
    playAudio() {
      // console.log('当前歌曲播放状态' + this.playState)
      // console.log('歌曲id:' + this.id + ',' + this.songInfo.id)
      // let { name, id, picUrl } = this.songInfo.al
      // let info = JSON.stringify({
      //   '歌单名': name,
      //   '歌单id': id,
      //   '歌曲封面': picUrl
      // })
      // console.log('歌曲详情信息:' + info)
      // console.log(this.$refs)

      const audio = this.$refs.audioPlayer

      if (!this.playState) { /* 状态为true播放音乐 */
        audio.muted = false
        this.$nextTick(function () {
          audio.play() // 调用audio标签的内置方法play可以继续播放声音
        })
        // this.$refs.msg.style.marginTop = "-130px"
      } else {
        this.$nextTick(function () {
          audio.pause() // 暂停audio的播放
        })
        // this.$refs.msg.style.marginTop = "-130px"
      }
      this.playState = !this.playState /* 点击设置对立状态 */
    },
    /* 处理歌曲歌词 */
    _formatLyr(lyricStr) {
      // 可以看network观察歌词数据是一个大字符串, 进行拆分.
      let reg = /\[.+?\]/g // 
      let timeArr = lyricStr.match(reg) // 匹配所有[]字符串以及里面的一切内容, 返回数组
      // console.log(timeArr); // ["[00:00.000]", "[00:01.000]", ......]
      let contentArr = lyricStr.split(/\[.+?\]/).slice(1) // 按照[]拆分歌词字符串, 返回一个数组(下标为0位置元素不要,后面的留下所以截取)
      // console.log(contentArr);
      let lyricObj = {} // 保存歌词的对象, key是秒, value是显示的歌词
      timeArr.forEach((item, index) => {
        // 拆分[00:00.000]这个格式字符串, 把分钟数字取出, 转换成秒
        let ms = item.split(':')[0].split('')[2] * 60
        // 拆分[00:00.000]这个格式字符串, 把十位的秒拿出来, 如果是0, 去拿下一位数字, 否则直接用2位的值
        let ss = item.split(':')[1].split('.')[0].split('')[0] === '0' ? item.split(':')[1].split('.')[0].split('')[1] : item.split(':')[1].split('.')[0]
        // 秒数作为key, 对应歌词作为value
        lyricObj[ms + Number(ss)] = contentArr[index]
      })
      // 返回得到的歌词对象
      // console.log(lyricObj)
      return lyricObj
    },
    showLyric() {
      // 监听播放audio进度, 切换歌词显示
      this.$refs.audioPlayer.addEventListener('timeupdate', () => {
        let curTime = Math.floor(this.$refs.audioPlayer.currentTime)
        // 避免空白出现
        if (this.lyric[curTime]) {
          this.curLyric = this.lyric[curTime]
          this.lastLy = this.curLyric
        } else {
          this.curLyric = this.lastLy
        }
      })
    }
  },
  mounted() {
    this.getSong()
    this.showLyric()
  }
}
</script>
    
<style scoped>
.play {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}

.song_bg {
  background-color: #161824;
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  transform: scale(1.5);
  transform-origin: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  z-index: -2;
  opacity: 0.8;
  filter: blur(25px);
  /*模糊背景 */
}

.song-bg::before {
  /*纯白色的图片做背景, 歌词白色看不到了, 在背景前加入一个黑色半透明蒙层解决 */
  content: " ";
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.header {
  text-align: left;
  padding: 10px;
  height: 50px;
}

.song_wrap {
  margin-top: 30px;
  /* background: #000; */
  padding: 10px;
}

/* 唱片 */
.song_item {
  background: url(@/assets/img/bg.png) no-repeat;
  /* background-size: cover; */
  background-size: 350px 350px;
  height: 400px;
  width: 100%;
}

/* 歌单封面 */
.song_img {
  position: relative;
  top: 64px;
  left: 64px;
  height: 222px;
  width: 222px;
  z-index: -99;
}

.start_box {
  width: 80px;
  height: 80px;
  position: relative;
  top: -270px;
  left: 138px;
  z-index: 999;
}

.song_start {
  /* background-color: black; */
  background: url(@/assets/img/start.png) no-repeat;
  background-size: 80px 80px;
  height: 100px;
  width: 100%;
}

.song_msg {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: auto;
  height: 150px;
  margin-top: -130px;
  /* padding: 5px; */
}

.m_song_h2 {
  text-align: center;
  color: white;
  font-size: 32px;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 1px;
}

.lrcContent {
  margin-top: 20px;
  padding: 10px;
}

.lrc {
  color: white;
  font-size: 20px;
}

.needle {
  position: absolute;
  top: 30px;
  left: 165px;
  height: 200px;
  width: 100px;
  background: url(@/assets/img/needle-ab.png) no-repeat;
  background-size: contain;
  transform: rotate(-7deg);
  transition: all 0.6s;
}

.comment_wrap:hover {
  color: lightskyblue;
}

/* 唱片动画 */
.ani {
  animation: song 5s linear infinite;
}

@keyframes song {
  0% {
    -webkit-transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}
</style>