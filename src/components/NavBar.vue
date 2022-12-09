<template>
    <div>
        <div>
            <van-tabbar v-model="active">
                <van-tabbar-item icon="home-o" replace to="/home">
                    主页
                </van-tabbar-item>
                <van-tabbar-item icon="search" replace to="/category">
                    分类
                </van-tabbar-item>
                <van-tabbar-item icon="cart-o" replace to="/user/shoppingcart">
                    购物车
                </van-tabbar-item>
                <van-tabbar-item icon="user-o" replace to="/user">
                    个人中心
                </van-tabbar-item>
            </van-tabbar>
            <RouterView></RouterView>
        </div>
    </div>
</template>

<style>

</style>

<script>
import { RouterLink, RouterView } from 'vue-router';
import { Toast } from 'vant'
export default {
    data() {
        return {
            active: 0,
        };
    },
    mounted: function () {
        if (window.localStorage.getItem("x-token") == null && !window.location.hash.includes('#/home')) {
            Toast.fail('未登录！')
            this.$router.push({ path: "/login" });
        }
        /* 直接在tabbar组件页面监听，判断当前页面是哪个页面,
        解决刷新时,tab默认为 0 的bug */
        const navBarActive = window.location.hash
        if (navBarActive.includes('#/category')) {
            this.active = 1
        } else if (navBarActive.includes('#/user/shoppingcart')) {
            this.active = 2
        } else if (navBarActive.includes('#/user')) {
            this.active = 3
        } else if (navBarActive.includes('#/home')) {
            this.active = 0
        }
    },
    components: { RouterLink, RouterView }
}
</script>
  