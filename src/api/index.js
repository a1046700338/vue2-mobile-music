/* api统一调用出口 */
import { recommendMusic,newMusic,getAllSongs } from '@/api/Home'
import { searchSong,hotSearchList } from '@/api/Search'
import { getSongById,getLyricById,getMusicUrl } from '@/api/Play'
import { getCommentMusic } from '@/api/Comment'
export const recommendMusicAPI = recommendMusic/*推荐歌单*/
export const newMusicAPI = newMusic/*最新音乐*/
export const getAllSongsAPI = getAllSongs/*获取歌单所有歌曲*/
export const searchAPI = searchSong/*搜索音乐*/
export const hotSearchAPI = hotSearchList/*热搜*/
export const getSongByIdAPI = getSongById/*获取歌曲id*/
export const getLyricByIdAPI = getLyricById/*获取歌词id*/
export const commentMusicAPI = getCommentMusic/*获取歌曲评论信息*/
export const getMusicUrlAPI = getMusicUrl/*歌曲url获取*/