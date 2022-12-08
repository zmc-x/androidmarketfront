<template>
    <div class="order-detail-box">
        <sHeader :title="'订单详情页'"></sHeader>
        <div class="order-status">
            <div class="status-item">
                <label>订单状态：</label>
                <span v-if="(detail.status <= 1)">未完成</span>
                <span v-else-if="(detail.status == 2)">已取消</span>
                <span v-else>已完成</span>
            </div>
            <div class="status-item">
                <label>收货地址：</label>
                <span>{{ detail.province + detail.city + detail.county + detail.detaillocation }}</span>
            </div>
            <div class="status-item">
                <label>下单时间：</label>
                <span>{{ detail.createdat }}</span>
            </div>
            <div class="status-item" v-if="(orderstatus != 1)">
                <label>订单完成/取消时间：</label>
                <span>{{ detail.finishedat }}</span>
            </div>
            <van-button round v-if="(orderstatus == 1)" style="margin-bottom: 10px" color="#e51212" block
                @click="showPayFn">去支付</van-button>
            <van-button round v-if="(orderstatus <= 1)" block @click="cancelOrder(orderid)">取消订单</van-button>
        </div>
        <div class="order-price">
            <div class="price-item">
                <label>商品金额：</label>
                <span>¥ {{ detail.allprice }}</span>
            </div>
            <div class="price-item">
                <label>配送方式：</label>
                <span>普通快递</span>
            </div>
        </div>
        <van-card v-for="(item, index) in detail.goodsinfo" :key="index" style="background: #fff" :num="item.count"
            :price="item.price" desc="全场包邮" :title="item.goodsName" :thumb="item.coverImage">
            <template #tags>
                <van-tag plain type="danger">规格：{{ item.specific }}G</van-tag>
                <van-tag plain type="danger">颜色：{{ item.color }}</van-tag>
            </template>
        </van-card>
        <van-popup v-model="showPay" position="bottom" :style="{ height: '24%' }">
            <div :style="{ width: '90%', margin: '0 auto', padding: '20px 0' }">
                <van-button round :style="{ marginBottom: '10px' }" color="#1989fa" block
                    @click="payOrder(orderid)">支付宝支付</van-button>
                <van-button round color="#4fc08d" block @click="payOrder(orderid)">微信支付</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
import sHeader from '@/components/simpleheader.vue'
import { queryOrderInfo, updateorder } from '@/service/order'
import { Toast } from 'vant'
export default {
    components: {
        sHeader,
    },
    mounted: function () {
        this.init()
    },
    data() {
        return {
            // 1, 2, 3分别表示 未完成、已取消、已完成
            orderstatus: this.$route.query.orderstatus,
            detail: {},
            orderid: this.$route.query.orderid,
            showPay: false
        }
    },
    methods: {
        async init() {
            const data = await queryOrderInfo(this.orderid)
            this.detail = data.data.data
        },
        async cancelOrder(value) {
            const data = await updateorder(value, 'cancel')
            Toast.success(data.data.msg)
            this.$router.push({ path: '/user/myorder' })
        },
        showPayFn() {
            this.showPay = true

        },
        async payOrder(value) {
            const data = await updateorder(value, 'complete')
            Toast.success(data.data.msg)
            this.$router.push({ path: '/user/myorder' })
        }
    }
}
</script>

<style lang="less" scoped>
.order-detail-box {
    background: #f7f7f7;

    .order-status {
        background: #fff;
        padding: 20px;
        font-size: 15px;

        .status-item {
            margin-bottom: 10px;

            label {
                color: #999;
            }
        }
    }

    .order-price {
        background: #fff;
        margin: 20px 0;
        padding: 20px;
        font-size: 15px;

        .price-item {
            margin-bottom: 10px;

            label {
                color: #999;
            }
        }
    }

    .van-card {
        margin-top: 0;
    }

    .van-card__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
}
</style>