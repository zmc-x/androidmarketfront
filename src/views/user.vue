<template>
    <div class="user-box">
        <s-header :title="'个人中心'" :back="'/'"></s-header>
        <div class="user-info">
            <div class="info">
                <img src="https://img01.yzcdn.cn/vant/cat.jpeg" />
                <div class="user-desc">
                    <span>用户名：{{ username }}</span>
                </div>
            </div>
        </div>
        <van-cell-group inset>
            <van-cell title="我的订单" is-link to="/user/myorder"/>
            <van-cell title="账号管理" is-link @click="show = true" />
            <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
            <van-cell title="地址管理" is-link to="/user/addresses" />
        </van-cell-group>
        <nav-bar></nav-bar>
        <RouterView></RouterView>
    </div>
</template>
<script>
import { Toast } from 'vant';
import { RouterLink, RouterView } from 'vue-router';
import { Notify } from 'vant';
import navBar from '@/components/NavBar.vue'
import sHeader from '@/components/simpleheader.vue'
const axios = require('axios')
axios.defaults.baseURL = 'api'
// axios.defaultes.baseURL = 'http://101.35.48.153:1234'
export default {
    methods: {
        // 账号操作
        onSelect(item) {
            // 默认情况下点击选项时不会自动收起
            // 可以通过 close-on-click-action 属性开启自动收起
            this.show = false;
            // 退出登录
            if (item.name == '退出登录') {
                window.localStorage.removeItem('x-token')
                this.$router.push({ path: '/login' })
                Toast(item.name);
            }
            else {
                this.$router.push({
                    path: '/updatepassword', query: {
                        username: this.username
                    }
                })
            }
        },
    },
    mounted: function () {
        let _this = this
        axios({
            method: 'get',
            url: '/mall/v1/user/info',
            headers: {
                'x-token': window.localStorage.getItem('x-token')
            }
        }).then(function (response) {
            if (response.data.resultCode == 200) {
                _this.username = response.data.data.username
                console.log(_this.username)
            }
            if (response.data.msg == '令牌已失效，请重新登录！') {
                Notify({ type: 'danger', message: response.data.msg })
                window.localStorage.removeItem('x-token')
                _this.$router.push({ path: '/login' })
            }
        })
    },
    data() {
        return {
            // username
            username: '',
            show: false,
            actions: [{ name: '修改密码' }, { name: '退出登录' }],
        }
    },
    components: { RouterLink, RouterView, navBar, sHeader },
}
</script>

<style lang="less" scoped>
@import '../common/style/mixin';

.user-box {

    .user-info {
        width: 94%;
        margin: 10px;
        height: 115px;
        background: linear-gradient(90deg, @primary, #c21111);
        box-shadow: 0 2px 5px #e51010;
        border-radius: 6px;
        margin-top: 50px;

        .info {
            position: relative;
            display: flex;
            width: 100%;
            height: 100%;
            padding: 25px 20px;
            .boxSizing();

            img {
                .wh(60px, 60px);
                border-radius: 50%;
                margin-top: 4px;
            }

            .user-desc {
                display: flex;
                flex-direction: column;
                margin-left: 20px;
                line-height: 70px;
                font-size: 20px;
                color: #fff;

                span {
                    color: #fff;
                    font-size: 20px;
                    padding: 2px 0;
                }
            }

            .account-setting {
                position: absolute;
                top: 10px;
                right: 20px;
                font-size: 13px;
                color: #fff;

                .van-icon-setting-o {
                    font-size: 16px;
                    vertical-align: -3px;
                    margin-right: 4px;
                }
            }
        }
    }

    .user-list {
        padding: 0 20px;
        margin-top: 20px;

        li {
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #e9e9e9;
            display: flex;
            justify-content: space-between;
            font-size: 14px;

            .van-icon-arrow {
                margin-top: 13px;
            }
        }
    }
}
</style>
