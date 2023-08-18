/* 评论数据api */

import ajax from "@/utils/request";
/* 评论歌曲api */
export const getCommentMusic = params => ajax({
    url: '/comment/music',
    params
})
