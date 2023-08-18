<template>
  <div class="comment">
    <!-- 导航栏 -->
    <van-nav-bar :title='$route.meta.title' fixed left-arrow @click-left="$router.back()" />
    <!-- 评论列表 -->
    <div class="comment">
      <NodeP :str="titleList.hotComment"/>
      <CommentItem v-for="(obj, index) in hotCommentList" :key="index" :name="obj.user.nickname"
        :headImg="obj.user.avatarUrl" :timeStr="obj.timeStr" :content="obj.content" :likeCount="obj.likedCount" />
    </div>

    <!--  
    <div class="item">
      <div class="img_wrap">
        <img src="@/assets/logo.png" alt="">
      </div>
      <div class="content_wrap">
        <div class="info_wrap">
          <p class="name">昵称</p>
          <p class="time">2023</p>
        </div>
        <div class="content">我在北方的寒冬里</div>
        <div class="good">12点赞</div>

      </div>
    </div>
    -->
  </div>
</template>

<script>
import Vue from 'vue'
import { commentMusicAPI } from '@/api'
import CommentItem from '@/components/CommentItem'
import NodeP from '@/components/NodeP'
import { NavBar,Toast } from 'vant'
Vue.use(NavBar)
Vue.use(Toast)
export default {
  name: 'Comment',
  components: { CommentItem,NodeP },
  async created() {
    await commentMusicAPI({
      id: this.id,
      limit: 20,
      timestamp: new Date().getTime(),
      // offset分页
    }).then((res) => {
      console.log(res)
      /* 热评数据添加进data */
      this.hotCommentList.push(...res.data.hotComments)
      // 热评 hotComments.push(...res.data.hotComments) 
      // 热评用户头像 hotComments.user.avatarUrl
      // 热评用户昵称 hotComments.user.nickname
      // 热评评论内容 hotComments.content
      // 热评时间 hotComments.timeStr
      // 热评评论点赞数 hotComments.likedCount
      // res.data.comment
      const code = res.data.code
      if (code === 200) {
        console.log('成功获取评论数据了O(∩_∩)O')
      }
    }).catch((error) => {
      Toast.fail('加载评论失败了，请刷新重试')
      console.error(error)
    })
  },
  data() {
    return {
      /* title文本 */
      titleList: {
        hotComment: this.$store.state.titleList.hotComment,
        comment: this.$store.state.titleList.comment,
      },
      id: this.$store.state.songId,
      comList: [], /* 评论数据 */
      hotCommentList: [], /* 热评数据 */
    }
  }
}
</script>

<style scoped>
.comment {
  margin-top: 40px;
}
</style>