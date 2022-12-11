<template>
    <div>
        <s-header :title="'修改账号密码'" :back="'/user'"></s-header>
        <van-cell-group inset>
            <van-cell title="用户名" :value="username" size="large" style="font-size: 20px" />
            <van-field v-model="newpassword" type="password" label="新密码" size="large"
                @touchstart.native.stop="show = true" />
            <van-number-keyboard v-model="newpassword" :show="show" @blur="show = false" />
        </van-cell-group>
        <van-button round type="primary" size="large" @click="onUpdate">修改</van-button>
    </div>
</template>

<script>
import sHeader from '@/components/simpleheader.vue'
import { Notify } from 'vant'
const axios = require('axios')
export default {
    components: { sHeader },
    data() {
        return {
            // 获取回调值
            username: this.$route.query.username,
            newpassword: '',
            show: false,
        }
    },
    methods: {
        onUpdate() {
            let _this = this
            axios({
                method: 'post',
                url: 'http://zmcicloud.cn:1234/mall/v1/user/updatepass',
                headers: {
                    'x-token': window.localStorage.getItem('x-token')
                },
                data: {
                    newpassword: this.newpassword
                }
            }).then(function (response) {
                if(response.data.resultCode == 200) {
                    Notify({ type: 'success', message: response.data.msg });
                    _this.$router.push({path: '/user'})
                }
                else if(response.data.msg == '令牌已失效，请重新登录！') {
                    Notify({type: 'danger', message: response.data.msg})
                    window.localStorage.removeItem('x-token')
                    _this.$router.push({path:'/login'})
                } 
                else{
                    Notify({ type: 'warning', message: response.data.msg });
                }
            })
        }
    }
}
</script>