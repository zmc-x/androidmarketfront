<template>
    <div class="product-detail">
        <s-header :title="'商品详情'"></s-header>
        <div class="detail-content">
            <div class="detail-swipe-wrap">
                <van-swipe class="my-swipe" indicator-color="#1baeae">
                    <van-swipe-item>
                        <img :src="detail.coverimage" alt="" />
                    </van-swipe-item>
                </van-swipe>
            </div>
            <div class="product-info">
                <div class="product-title">
                    {{ detail.goodsname }}
                </div>
                <div class="product-desc">免邮费 顺丰快递</div>
                <div class="product-price">
                    <span>¥{{ detail.specification.price }}</span>
                    <van-tag color="#ffe1e1" text-color="#ad0000">规格：{{detail.specification.specific}}G</van-tag>
                    <van-tag color="#ffe1e1" text-color="#ad0000">颜色：{{detail.specification.color}}</van-tag>
                </div>
            </div>
            <div class="product-intro">
                <ul>
                    <li>概述</li>
                    <li>参数</li>
                </ul>
                <div class="product-content" v-for="(item, index) in detail.images" :key="index">
                    <p><img :src="item" /></p>
                </div>
            </div>
        </div>
        <van-goods-action>
            <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickToShoppingCart" />
            <van-goods-action-button type="warning" text="加入购物车" @click="onClickAddShoppingCart" />
            <van-goods-action-button type="danger" text="立即购买" @click="onClickToBuyGoods" />
        </van-goods-action>
    </div>
</template>

<script>
import { Toast } from 'vant';
import sHeader from '@/components/simpleheader.vue'
import { getGoodsDetail } from '@/service/goods'
import { addGoodsToShoppingCart } from '@/service/cart'
export default {
    components: {
        sHeader
    },
    data() {
        return {
            detail: {
                coverimage: "",
                goodsid: '',
                goodsname: "",
                images: [],
                specification: {
                    specificationid: '',
                    color: "",
                    specific: "",
                    price: ''
                }
            },
        }
    },
    mounted: async function () {
        // console.log(this.$route.params.id)
        const data = await getGoodsDetail(this.$route.params.id, this.$route.params.specificationid)
        this.detail = data.data.data
    },
    methods: {
        onClickToShoppingCart() {
            this.$router.push({ path: '/user/shoppingcart' })
        },
        async onClickAddShoppingCart() {
            const params = {
                goodsid : parseInt(this.$route.params.id) ,
                specificationid : parseInt(this.$route.params.specificationid),
                count : 1
            }
            const data = await addGoodsToShoppingCart(params)
            if(data.data.resultCode == 200) {
                Toast.success(data.data.msg)
            }
            else {
                Toast.fail(data.data.msg)
            }
        },
        // 先添加到购物车中
        // 然后再进行购买
        async onClickToBuyGoods() {
            const params = {
                goodsid : parseInt(this.$route.params.id) ,
                specificationid : parseInt(this.$route.params.specificationid),
                count : 1
            }
            await addGoodsToShoppingCart(params)
            this.onClickToShoppingCart()
        }
    },
};
</script>


<style lang="less">
@import '../common/style/mixin';

.product-detail {
    .detail-header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;
        .fj();
        .wh(100%, 44px);
        line-height: 44px;
        padding: 0 10px;
        .boxSizing();
        color: #252525;
        background: #fff;
        border-bottom: 1px solid #dcdcdc;

        .product-name {
            font-size: 14px;
        }
    }

    .detail-content {
        .detail-swipe-wrap {
            .my-swipe .van-swipe-item {
                img {
                    width: 100%;
                    // height: 300px;
                }
            }
        }

        .product-info {
            padding: 0 10px;

            .product-title {
                font-size: 18px;
                text-align: left;
                color: #333;
            }

            .product-desc {
                font-size: 14px;
                text-align: left;
                color: #999;
                padding: 5px 0;
            }

            .product-price {
                .fj();

                span:nth-child(1) {
                    color: #F63515;
                    font-size: 22px;
                }

                span:nth-child(2) {
                    color: #999;
                    font-size: 16px;
                }
            }
        }

        .product-intro {
            width: 100%;

            ul {
                .fj();
                width: 100%;
                margin: 10px 0;

                li {
                    flex: 1;
                    padding: 5px 0;
                    text-align: center;
                    font-size: 15px;
                    border-right: 1px solid #999;
                    box-sizing: border-box;

                    &:last-child {
                        border-right: none;
                    }
                }
            }

            .product-content {
                padding: 0 20px;

                img {
                    width: 100%;
                }
            }
        }
    }
}
</style>