<template>
    <div class="login">
        <van-form @submit="onSubmit">
            <van-field v-model="username" name="用户名" label="用户名" placeholder="请输入6位以上的数字用户名" :rules="[{ pattern, required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>
    
<script>
import Vue from 'vue'
import { Form, Field } from 'vant'
Vue.use(Form)
Vue.use(Field)
export default {
    name: 'Login',
    data() {
        return {
            username: '',
            password: '',
            pattern: /\d{6}/,
        };
    },
    methods: {
        onSubmit(values) {
            console.log('submit', values);
        },
    },
}
</script>
    
<style scoped></style>