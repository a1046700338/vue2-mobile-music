<template>
    <p class="title" :str="str">{{ str }}</p>
</template>
    
<script>
export default {
    /* p标签组件化 */
    name: 'NodeP',
    props: {
        str: String /* 内容Str */
    }
}
</script>
    
<style scoped>
.title {
    color: black;
    background: rgb(237, 237, 237);
    text-align: left;
    font-size: 20px;
    padding: 10px;
    margin-bottom: 5px;
}
</style>
    