<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style>

</style>

<script>
import { Toast } from 'vant';
import { RouterLink, RouterView } from 'vue-router';

export default {
  data() {
    return {

    };
  },
  mounted: function () {
    if (window.localStorage.getItem("x-token") == null) {
      Toast.fail('未登录')
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
    } else if (navBarActive.includes('#/')) {
      this.active = 0
    }
    console.log(this.active)
  },
  components: { RouterLink, RouterView }
}
</script>
