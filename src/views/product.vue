<template>
    <div>
        <van-search v-model="value" :show-action="true" placeholder="请输入搜索关键词" action-text="返回" @cancel="goback"
            @search="onSearch" />
        <div v-for="(item, index) in goods" :key="index" @click="goToDetail(item)">
            <van-card :price="item.price" :title="item.goodsName" :thumb="item.coverimage">
                <template #tags>
                    <van-tag plain type="danger">规格：{{ item.specific }}G</van-tag>
                    <van-tag plain type="danger">颜色：{{ item.color }}</van-tag>
                </template>
            </van-card>
            <p></p>
        </div>
    </div>
</template>

<script>
import { getGoodsByName } from '@/service/goods'
import { Toast } from 'vant'
export default {
    mounted: function () {
        this.onSearch()
    },
    data() {
        return {
            value: this.$route.params.goodsname,
            goods: []
        }
    },
    methods: {
        async onSearch() {
            const data = await getGoodsByName(this.value)
            if(data.data.resultCode == 200) {
                this.goods = data.data.data
                Toast.success(data.data.msg)
            }
            else {
                Toast.fail(data.data.msg)
            }
        },
        goback() {
            window.history.go(-1)
        },
        goToDetail(item) {
            // 判断是否登录
            if (window.localStorage.getItem('x-token') != null) {
                this.$router.push({ path: `/goodsdetail/${item.goodsId}/${item.specificationId}` })
            }
            else {
                this.$router.push({ path: '/login' })
            }
        },
    }
}
</script>