<template>
    <div>
        <s-header :title="'生成订单'" :back="'/user/shoppingcart'"></s-header>
        <van-contact-card :type="location.id != undefined ? 'edit' : 'add'" @click="onAdd" :name="location.name"
            :tel="location.tel + ''" add-text="添加收件人&收货地址" />
        <van-cell-group v-for="(item, index) in lists" :key="index">
            <van-card :num="item.count" :price="item.price" :desc="('内存：' + item.specific + ';' + '颜色：' + item.color)"
                :title="item.goodsName" :thumb="item.coverImage" />
        </van-cell-group>
        <div class="pay-wrap">
            <div class="price">
                <span>商品金额</span>
                <span>¥{{ total }}</span>
            </div>
            <van-button round @click="createOrder" class="pay-btn" color="#f01010" type="primary"
                block>生成订单</van-button>
        </div>
        <van-popup round v-model="showPay" closeable position="bottom" :style="{ height: '30%' }" @close="close">
            <div :style="{ width: '90%', margin: '0 auto', padding: '50px 0' }">
                <van-button round :style="{ marginBottom: '10px' }" color="#1989fa" block
                    @click="payOrder">支付宝支付</van-button>
                <van-button round color="#4fc08d" block @click="payOrder">微信支付</van-button>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { Notify, Toast } from 'vant';
import sHeader from '@/components/simpleheader.vue'
import { getByCartItemIds } from '@/service/cart'
import { createorder, updateorder } from '@/service/order';
export default {
    components: { sHeader },
    computed: {
        total: function () {
            let sum = 0
            this.lists.forEach(item => {
                sum += item.count * item.price
            })
            return sum
        }
    },
    mounted: function () {
        this.init()
    },
    methods: {
        async init() {
            if (this.$route.query.addressId != undefined) {
                this.location = {
                    id: this.$route.query.addressId,
                    name: this.$route.query.name,
                    tel: this.$route.query.tel,
                }
            }
            let param = {
                cartids: [],
            }
            // 判断this.cartids 是否为数组
            if (Array.isArray(this.cartids)) {
                var len = this.cartids.length
                for (var i = 0; i < len; i++) this.cartids[i] = parseInt(this.cartids[i])
                param.cartids = this.cartids
            }
            else {
                this.cartids = parseInt(this.cartids)
                param.cartids = [this.cartids]
            }
            // console.log(param)
            const { data } = await getByCartItemIds(param)
            this.lists = data.data
        },
        onAdd() {
            this.$router.push({ path: '/user/addresses', query: { from: 'createorder', ids: this.cartids } })
        },
        async createOrder() {
            // 判断是否填充了地址
            if (this.location.id == undefined) {
                Toast.fail('未填写地址，请填写！')
                return
            }
            this.showPay = true
            // 生成订单
            var len = this.lists.length
            var mid = new Array
            for (var i = 0; i < len; i++) {
                mid.push({
                    goodsName: this.lists[i].goodsName,
                    coverImage: this.lists[i].coverImage,
                    specificId: this.lists[i].specificationId,
                    specific: this.lists[i].specific,
                    color: this.lists[i].color,
                    count: this.lists[i].count,
                    price: this.lists[i].price
                })
            }
            var cartids_mid = new Array
            // 判断是否为数组
            if(Array.isArray(this.cartids)) {
                for(var i = 0; i < this.cartids.length; i++) {
                    cartids_mid.push(parseInt(this.cartids[i]))
                }
            }
            else {
                cartids_mid.push(parseInt(this.cartids))
            }
            const params = {
                cartids: cartids_mid,
                order: {
                    addressid: parseInt(this.location.id),
                    allprice: this.total,
                },
                orderitem: mid
            }
            // console.log(params)
            const data = await createorder(params)
            this.orderId = data.data.data.orderId
            console.log(this.orderId)
        },
        async payOrder() {
            Toast('支付成功')
            const data = await updateorder(this.orderId, 'complete')
            Notify({ type: 'success', message: data.data.msg })
            // 跳转到订单管理页面
            this.$router.push("/user/myorder")
        },
        close() {
            Toast('取消订单')
            // 跳转
            this.$router.push({ path: '/user/myorder' })
        }
    },
    data() {
        return {
            cartids: this.$route.query.ids,
            lists: [],
            showPay: false,
            location: {},
            orderId: ''
        }
    }
}
</script>

<style lang="less">
.pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10px 0;
    padding-bottom: 50px;
    border-top: 1px solid #e9e9e9;

    >div {
        display: flex;
        justify-content: space-between;
        padding: 0 5%;
        margin: 10px 0;
        font-size: 14px;

        span:nth-child(2) {
            color: red;
            font-size: 18px;
        }
    }

    .pay-btn {
        position: fixed;
        bottom: 7px;
        right: 0;
        left: 0;
        width: 90%;
        margin: 0 auto;
    }
}
</style>