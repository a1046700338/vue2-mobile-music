/* 封装请求库 axios */
/* 创建axios实例 */
import axios from 'axios'
const ajax = axios.create({
    // baseURL: 'http://localhost:3000',
    baseURL: 'http://192.168.2.52:3000/'
    // timeout: 1000
})

export default ajax