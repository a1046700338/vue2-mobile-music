/* 歌曲播放数据api */

import ajax from "@/utils/request";
/* 歌曲信息获取api */
export const getSongById = (id) => ajax({
    url: `/song/detail?ids=${id}`,
    method: "GET"
})
/* 歌词信息获取api */
export const getLyricById = params => ajax({
    // url: `/lyric?id=${id}`,
    url: '/lyric',
    params
    // method: "GET"
})

/* 歌曲url获取api */
export const getMusicUrl = params => ajax({
    url: '/song/url/v1',
    params
})