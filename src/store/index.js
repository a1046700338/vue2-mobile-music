/* Vuex配置 */
import Vue from 'vue'
import Vuex from 'vuex'
/* 注册Vuex */
Vue.use(Vuex)

/* 实例化Vuex对象 */
const store = new Vuex.Store({
    state: {
        count: 0,
        songId: '', /* 当前歌曲ID */
        /* title文本 */
        titleList: {
            song: '推荐歌单',
            music: '最新音乐',
            hotComment: '热评',
            comment: '评论'
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },
        getid(state, id) {
            state.songId = id
        }
    }
})

export default store