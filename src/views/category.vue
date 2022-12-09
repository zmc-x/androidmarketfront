<template>
    <div>
        <van-sidebar v-model="activeKey" >
            <van-sidebar-item title="智能手机" />
            <van-sidebar-item title="笔记本电脑" />
            <van-sidebar-item title="智能穿戴" />
        </van-sidebar>
        <div v-if="activeKey == 2">
            jkdkd
        </div>
        <nav-bar></nav-bar>
    </div>
</template>

<script>
import navBar from '@/components/NavBar.vue'
export default {
    components: {
        navBar
    },
    data() {
        return {
            activeKey: 0,
        }
    }
}
</script>