/* 首页数据api */

import ajax from "@/utils/request";
/* 推荐歌单api */
export const recommendMusic = params => ajax({
    url: '/personalized',
    params
})
/* 最新音乐api */
export const newMusic = params => ajax({
    url: '/personalized/newsong',
    params
})
/*获取歌单所有歌曲*/
export const getAllSongs = params => ajax({
    url: '/playlist/track/all',
    params
})