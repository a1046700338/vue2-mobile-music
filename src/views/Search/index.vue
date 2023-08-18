<template>
  <div class="search_main">
    <!-- 搜索栏 -->
    <van-search @blur="handleVal()" v-model.trim="searchValue" placeholder="搜索关键词" maxlength="30">
      <template #action>
        <van-button type="info">搜索</van-button>
      </template>
    </van-search>
    <!-- 热门搜索 -->
    <div class="search_item_wrap" v-show="search.hot">
      <p class="title">热门搜索</p>
      <ul class="hot">
        <li class="hot_item_tag" v-for="(obj, index) in hotList" :key="index" @click="onBtn(obj.first)">{{ obj.first
        }}
        </li>
      </ul>
    </div>
    <!-- 历史搜索 -->
    <div class="search_item_wrap" v-show="search.history">
      <p class="title">历史搜索</p>
      <ul class="hot">
        <li class="hot_item_tag history_tag" v-for="(obj, index) in historyList" :key="index">
          {{ obj }}
          <span class="del_btn" @click="onDel(index)"><van-icon name="close" /></span>
        </li>
      </ul>
    </div>
    <!-- 搜索结果 -->
    <p class="title" v-show="display">最佳匹配</p>
    <div class="" v-for="(obj, index) in resultList" v-if="resultList.length !== 0">
      <SongItem :name="obj.name" :author="obj.ar[0].name + '《' + obj.name + '》'" :id="obj.id" :key="index"></SongItem>
    </div>
    <!-- 盒子布局的列表块（参考）
    <div class="search_result" v-if="resultList.length !== 0">
      <p class="title">最佳匹配</p>
      <div class="song_item_wrap" v-for="obj in resultList" :key="obj.id">
        <div class="song_left">
          <p>{{ obj.name }}</p>
          <p>{{ obj.ar[0].name }}</p>
        </div>
        <div class="song_right">
          <van-icon name="play-circle-o" />
        </div>
      </div>
    </div>
    -->
  </div>
</template>
    
<script>
import Vue from 'vue'
import SongItem from '@/components/SongItem.vue'
import { searchAPI, hotSearchAPI } from '@/api'
import { Search, Button, Icon } from 'vant'
Vue.use(Search)
Vue.use(Button)
Vue.use(Icon)
export default {
  async created() {
    const hotSearch = await hotSearchAPI({ timestamp: new Date().getTime() })
    this.hotList = hotSearch.data.result.hots
  },
  mounted() {
    /* 将本地存储历史搜索数据传入 */
    if (localStorage.getItem('searchValue')) {
      try {
        this.historyList = JSON.parse(localStorage.getItem('searchValue'))
      } catch (e) {
        localStorage.removeItem('searchValue')
      }
    }
  },
  data() {
    return {
      searchValue: '',
      hotList: [], /* 热搜列表 */
      resultList: [], /* 搜索结果列表 */
      timer: null,
      historyList: [], /* 历史搜索记录 */
      /* 显示隐藏块 */
      search: {
        hot: true,
        history: true,
      },
      display: false, /* 显示 最佳匹配 文本 */
    }
  },
  methods: {
    /* 点击热搜标签事件 */
    onBtn(str) {
      this.searchValue = str
    },
    /* 焦点离开事件添加val到historyList */
    handleVal() {
      if (this.searchValue == '') {
        return
      }
      this.historyList.push(this.searchValue)
      this.saveHistoryList()
    },
    /* 保存历史搜索记录 */
    saveHistoryList() {
      const parsed = JSON.stringify(this.historyList)
      localStorage.setItem('searchValue', parsed)
    },
    /* 点击删除历史搜索标签事件 */
    onDel(index) {
      this.historyList.splice(index, 1)
      this.saveHistoryList()
    }
  },
  watch: {
    searchValue(val) {
      /* 清除定时器 */
      if (this.timer) clearTimeout(this.timer)
      /* 当searchValue值为空时，这些块展示 */
      this.search.hot = this.search.history = true
      this.display = false
      /* 当searchValue值为空时，resultList不再展示 */
      if (val === '') return this.resultList = []
      /* 防抖 */
      this.timer = setTimeout(async () => {
        const res = await searchAPI({
          type: 1,
          keywords: val,
          timestamp: new Date().getTime()
        })
        this.resultList = res.data.result.songs
        console.log(this.resultList);
        /* 当searchValue值不为空时，这些块不展示 */
        this.search.hot = this.search.history = false
        this.display = true
      }, 1000)
    },
  },
  components: { SongItem }
}
</script>
    
<style scoped>
.search_main {
  margin-top: 50px;
}

.title {
  margin: 5px 0px 0px 10px;
  text-align: left;
  font-size: 18px;
  color: rgb(168, 177, 184);
}

.hot {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  flex-grow: 10;
  align-items: center;
  line-height: 20px;
  padding: 8px;
  margin-right: 0.213rem;
}

.hot_item_tag {
  background: rgb(25, 137, 250);
  color: white;
  border-radius: 15px;
  font-size: 10px;
  padding: 5px;
  margin-bottom: 5px;
}

.song_item_wrap {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  margin-bottom: 5px;
  padding: 5px;
  border-bottom: 1px solid rgb(249, 250, 251);
}

.song_left {
  text-align: left;
  padding-left: 10px;
}

.song_left>p:nth-child(2) {
  text-align: left;
  font-size: 10px;
  color: rgb(168, 177, 184);
}

.song_right {
  padding-right: 20px;
}

.history_tag {
  padding: 10px;
  background: white;
  border: 1px solid rgb(25, 137, 250);
  color: black;
}

.del_btn {
  padding-left: 2px;
}

.tips {
  margin: 5px 0px 0px 10px;
  text-align: left;
  font-size: 10px;
  color: rgb(168, 177, 184);
  padding-left: 20px;
}
</style>