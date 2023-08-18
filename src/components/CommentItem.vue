<template>
    <!-- 评论列表 -->
    <div class="item">
        <div class="content_wrap">
            <div class="header_wrap">
                <div class="left">
                    <div class="img_wrap">
                        <img :src=headImg alt="">
                    </div>
                    <div class="info_wrap">
                        <p class="name">{{ name }}</p>
                        <p class="timeStr">{{ timeStr }}</p>
                    </div>
                </div>
                <div class="good">{{ likeCount }}点赞</div>
            </div>
            <div class="footer_wrap">
                <p>{{ content }}</p>
            </div>
        </div>
    </div>
</template>
    
<script>
export default {
    name: 'CommentItem',
    props: {
        // id: Number, /*歌曲id*/
        name: String, /*评论者昵称*/
        headImg: String, /*评论者头像*/
        timeStr: String, /*评论时间*/
        content: String, /*评论内容*/
        likeCount: Number, /*点赞数量*/
    }
}
</script>
  
<style scoped>
.item {
    width: 100%;
    height: auto;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid lightblue;
}

.img_wrap {
    width: 60px;
    height: 60px;
    /* padding-right: 3px; */
    padding-top: 8px;
    margin-right: 5px;
    text-align: left;
    /* background: #8b0a0a; */
}

.img_wrap>img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.content_wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    line-height: 50%;
    padding: 2px;
}

.header_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    line-height: 50%;
}

.left {
    display: flex;
    justify-content: center;
    align-items: center;
}

.info_wrap {
    text-align: left;
    line-height: 50%;
    margin-right: 80px;
}

.name {
    font-size: 16px;
    color: #0C73C2;
}

.timeStr {
    margin-top: 10px;
    line-height: 50%;
    font-size: 12px;
    color: #999999;
}

.footer_wrap {
    text-align: center;
    font-size: 16px;
    line-height: 100%;
    padding: 10px;
}

.footer_wrap>p {
    padding-top: 4px;
}

.good {
    font-size: 14px;
    text-align: right;
    color: #333333;
}

</style>
    