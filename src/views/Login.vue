<template>
    <div>
        <s-header :title="status == 'signup' ? '注册' : '登录'"></s-header>
        <div v-if="status == 'signin'">
            <van-form @submit="onSignIn">
                <van-field v-model="userinfo.username" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="userinfo.password" type="password" name="密码" label="密码" placeholder="密码"
                    @touchstart.native.stop="show = true" :rules="[{ required: true, message: '请填写密码' }]" />
                <van-number-keyboard v-model="userinfo.password" :show="show" @blur="show = false" />
                <div style="margin: 16px;">
                    <div @click="changetype('signup')" style="color:blue">没有账号？立即注册</div>
                    <van-button round block type="info" native-type="submit">登录</van-button>
                </div>
            </van-form>
        </div>
        <div v-else>
            <van-form @submit="onSignup">
                <van-field v-model="userinfo.username" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="userinfo.password" type="password" name="密码" label="密码" placeholder="密码"
                    @touchstart.native.stop="show = true" :rules="[{ required: true, message: '请填写密码' }]" />
                <van-number-keyboard v-model="userinfo.password" :show="show" @blur="show = false" />
                <div style="margin: 16px;">
                    <div @click="changetype('signin')" style="color:blue">已有账号，立即登录</div>
                    <van-button round block type="info" native-type="submit">注册</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
const axios = require('axios')
import { Toast } from 'vant'
import { Notify } from 'vant'
import sHeader from '@/components/simpleheader.vue'
export default {
    name: "userLogin",
    components: {sHeader},
    data() {
        return {
            title: '',
            status: 'signin',   // 状态
            userinfo: {
                username: '',       // 用户名
                password: '',       // 密码
            },
            show: false,        // 密码输入键盘
        }
    },
    methods: {
        // 登录
        onSignIn() {
            let _this = this
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
            axios.post("api/mall/v1/user/Login", this.userinfo).then(function (response) {
                var signInInfo = response.data
                if(signInInfo.data == null) {
                    Toast.fail('登录失败！')
                } 
                else {
                    _this.setStorage(signInInfo.data.token)
                    Toast.success('登录成功！')
                    window.location.href = '#/home'
                }
            })
        },
        // 注册
        onSignup() {
            let _this = this
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
            axios.post("api/mall/v1/user/signup", this.userinfo).then(function (response) {
                // 注册成功
                if(response.data.resultCode == 200) {
                    Toast.success('注册成功！')
                    Notify({ type: 'success', message: '请返回登录！' });
                    // return signup
                    _this.status = 'signin'
                }
                else {
                    Toast.fail(response.data.msg)
                }
                // console.log(response.data)
            })
        },
        // 更换登录 or 注册状态
        changetype(value) {
            this.status = value;
        },
        // 存入storage
        setStorage(value) {
            window.localStorage.setItem("x-token", value)
        }
    }
}
</script>