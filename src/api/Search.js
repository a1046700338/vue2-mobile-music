/* 搜索页数据api */
import ajax from "@/utils/request";

/* 搜索歌曲api */
export const searchSong = params => ajax({
    url: '/cloudsearch',
    params
})

/* 热搜列表api */
export const hotSearchList = params => ajax({
    url: '/search/hot',
    params
})
