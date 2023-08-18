<template>
  <div>
    <van-nav-bar :title='activeTitle' fixed />
    <div class="bottom-bar">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>

    <van-tabbar route>
      <van-tabbar-item replace to="/layout/home" :icon="tabBarItem.icon.home">{{ tabBarItem.home }}</van-tabbar-item>
      <van-tabbar-item replace to="/layout/search" :icon="tabBarItem.icon.search">{{ tabBarItem.search }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
    
<script>
import Vue from 'vue';
import { NavBar, Tabbar, TabbarItem } from 'vant'
Vue.use(NavBar)
Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  name: '',
  data() {
    return {
      /* nav标签 */
      activeTitle: this.$route.meta.title,
      /* 底部栏元素配置 */
      tabBarItem: {
        home: '首页',
        search: '搜索',
        icon: {
          search: 'search',
          home: 'home-o'
        }
      }
    }
  },
  components: {},
  methods: {},
  watch: {
    /* 路由监听 */
    $route() {
      this.activeTitle = this.$route.meta.title
    }
  }
}
</script>
    
<style scoped></style>