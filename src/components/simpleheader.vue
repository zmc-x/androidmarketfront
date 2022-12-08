<template>
    <div>
        <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="goback" />
    </div>
</template>

<script>
export default {
    props:['title', 'back'],
    methods: {
        // 返回上一页
        goback() {
            if (!this.back) {
                this.$router.go(-1)
            } else {
                this.$router.push({ path: this.back })
            }
            this.$emit('callback')
        },
    }

}
</script>