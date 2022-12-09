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
    return {};
  },
  mounted: function () {
    if (window.localStorage.getItem("x-token") == null && !window.location.hash.includes('#/home')) {
      Toast.fail('未登录')
      this.$router.push({ path: "/login" });
    }
  },
  components: { RouterLink, RouterView }
}
</script>
