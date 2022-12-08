<template>
    <div>
        <s-header :title="'订单管理'" :back="'/user'"></s-header>
        <van-tabs @change="onChangeTab" v-model="active">
            <van-tab title="未支付订单"></van-tab>
            <van-tab title="已取消订单"></van-tab>
            <van-tab title="已完成订单"></van-tab>
            <van-tab title="全部订单"></van-tab>
        </van-tabs>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <div v-for="(item, index) in list" :key="index" @click="goTo(item.orderid, item.orderstatus)">
                <div style="font-size:small">
                    <span>订单时间：{{ item.createdat }}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <span v-if="(item.orderstatus == 1)">订单状态：未完成</span>
                    <span v-else-if="(item.orderstatus == 2)">订单状态：已取消</span>
                    <span v-else>订单状态：已完成</span>
                </div>

                <van-card v-for="(one, index) in item.goods" :key="index" :num="one.count" :price="one.price"
                    :title="one.goodsName"
                    :thumb="one.coverImage ? one.coverImage : 'https://img01.yzcdn.cn/vant/ipad.jpeg'">
                    <template #tags>
                        <van-tag plain type="danger">规格：{{ one.specific }}G</van-tag>
                        <van-tag plain type="danger">颜色：{{ one.color }}</van-tag>
                    </template>
                </van-card>
            </div>
        </van-list>
    </div>
</template>

<script>
import sHeader from '@/components/simpleheader.vue'
import moment from 'moment'
import { queryOrderByStatus } from '@/service/order'
export default {
    components: { sHeader },
    data() {
        return {
            active: 0,
            list: [],
            loading: false,
            finished: false,
        };
    },
    methods: {
        async onLoad() {
            if (this.active == 0) {
                const data = await queryOrderByStatus('unfinished')
                this.list = data.data.data
            } else if (this.active == 1) {
                const data = await queryOrderByStatus('cancel')
                this.list = data.data.data
            } else if (this.active == 2) {
                const data = await queryOrderByStatus('complete')
                this.list = data.data.data
            } else {
                const data = await queryOrderByStatus('all')
                this.list = data.data.data
            }
            // 将loading & finished 置为false
            this.loading = false
            this.finished = true
            this.solveTheTime()
        },
        // 切换tab标签
        onChangeTab() {
            this.onLoad()
        },
        // 处理时间字符串
        solveTheTime() {
            for (var i = 0; i < this.list.length; i++) {
                var timestr = moment(this.list[i].createdat).format('YYYY-MM-DD HH:mm:ss')
                this.list[i].createdat = timestr
            }
        },
        // 查看详情页
        goTo(value, status) {
            this.$router.push({ path: '/user/orderdetail', query: { orderid: value, orderstatus: status } })
        }
    },
}
</script>
