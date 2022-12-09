<template>
    <div class="cart-box">
        <van-nav-bar title="购物车" />
        <div class="cart-body">
            <van-checkbox-group @change="groupChange" v-model="result" ref="checkboxGroup">
                <van-swipe-cell :right-width="50" v-for="(item, index) in lists" :key="index">
                    <div class="good-item">
                        <van-checkbox :name="item.cartId" />
                        <div class="good-img"><img :src="item.coverImage" alt=""></div>
                        <div class="good-desc">
                            <div class="good-title">
                                <span>{{ item.goodsName }}</span>
                                <span>x{{ item.count }}</span>
                            </div>
                            <div>
                                <van-tag plain type="danger">规格：{{ item.specific }}G</van-tag>
                                <van-tag plain type="danger">颜色：{{ item.color }}</van-tag>
                            </div>
                            <div class="good-btn">
                                <div class="price">¥{{ item.price }}</div>
                                <van-stepper integer :min="1" :value="item.count" :name="item.cartId" async-change
                                    @change="onChange" disable-input />
                            </div>
                        </div>
                    </div>
                    <van-button slot="right" square icon="delete" type="danger" class="delete-button"
                        @click="deleteGood(item.cartId)" />
                </van-swipe-cell>
            </van-checkbox-group>
        </div>
        <van-submit-bar v-if="lists.length > 0" class="submit-all" :price="total * 100" button-text="结算"
            @submit="onSubmit">
            <van-checkbox @click="allCheck" v-model="checkAll">全选</van-checkbox>
        </van-submit-bar>
        <div class="empty" v-if="!lists.length">
            <van-icon name="smile-o" />
            <div class="title">购物车空空空如也</div>
            <van-button color="#f01010" type="primary" @click="goTo" block>前往首页</van-button>
        </div>
        <nav-bar></nav-bar>
    </div>
</template>

<script>
import { Notify, Toast } from 'vant'
import navBar from '@/components/NavBar.vue'
import { deleteCartItem, modifyCart } from '../service/cart'
const axios = require('axios')
axios.defaults.baseURL = 'api'
// axios.defaultes.baseURL = 'http://101.35.48.153:1234'
export default {
    components: { navBar },
    computed: {
        total: function () {
            let sum = 0
            let _list = this.lists.filter(item => this.result.includes(item.cartId))
            _list.forEach(item => {
                sum += item.count * item.price
            })
            return sum
        }
    },
    // 获取订单数据
    mounted: function () {
        this.init()
    },
    data() {
        return {
            lists: [],
            result: [],
            checkAll: true
        }
    },
    methods: {
        async init() {
            Toast.loading({ message: '加载中...', forbidClick: true });
            let _this = this
            axios({
                method: 'get',
                url: '/mall/v1/shoppingcart/query',
                headers: {
                    'x-token': window.localStorage.getItem('x-token')
                },
            }).then(function (response) {
                if(response.data.msg == '令牌已失效，请重新登录！') {
                    Notify({type: 'danger', message: response.data.msg})
                    window.localStorage.removeItem('x-token')
                    _this.$router.push({path:'/login'})
                    return 
                }
                _this.lists = response.data.data
                _this.result = response.data.data.map(item => item.cartId)
            })
            Toast.clear();
        },
        goBack() {
            this.$router.go(-1)
        },
        goTo() {
            this.$router.push({ path: '/home' })
        },
        async onChange(value, detail) {
            if (this.lists.filter(item => item.cartId == detail.name)[0].count == value) return
            Toast.loading({ message: '修改中...', forbidClick: true });
            // find the specificationid
            var specificid;
            for (var i = 0; i < this.lists.length; i++) {
                if (this.lists[i].cartId == detail.name) {
                    specificid = this.lists[i].specificationId;
                    break;
                }
            }
            const params = {
                cartid: detail.name,
                newcount: value,
                specificationid: specificid,
            }
            const { data } = await modifyCart(params)
            this.lists.forEach(item => {
                if (item.cartId == detail.name) {
                    value = data.data.newcount
                    item.count = value
                }
            })
            Toast.clear();
        },
        async onSubmit() {
            this.$router.push({name: 'createorder', query: {ids : this.result}})
        },
        async deleteGood(id) {
            const ids = new Array();
            ids.push(id)
            const params = {
                'deletegoods': ids
            }
            const { data } = await deleteCartItem(params)
            Notify({ type: 'success', message: data.msg });
            this.init()
        },
        groupChange(result) {
            if (result.length == this.lists.length) {
                this.checkAll = true
            } else {
                this.checkAll = false
            }
            this.result = result
        },
        allCheck() {
            if (this.checkAll) {
                this.result = this.lists.map(item => item.cartId)
            } else {
                this.result = []
            }
        }
    }
}
</script>

<style lang="less">
@import '../common/style/mixin';

.cart-box {
    .cart-header {
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

        .cart-name {
            font-size: 14px;
        }
    }

    .cart-body {
        padding-left: 10px;

        .good-item {
            display: flex;

            .good-img {
                img {
                    .wh(100px, 100px)
                }
            }

            .good-desc {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex: 1;
                padding: 20px;

                .good-title {
                    display: flex;
                    justify-content: space-between;
                }

                .good-btn {
                    display: flex;
                    justify-content: space-between;

                    .price {
                        font-size: 16px;
                        color: red;
                        line-height: 28px;
                    }

                    .van-icon-delete {
                        font-size: 20px;
                        margin-top: 4px;
                    }
                }
            }
        }

        .delete-button {
            width: 50px;
            height: 100%;
        }
    }

    .empty {
        width: 50%;
        margin: 0 auto;
        text-align: center;
        margin-top: 200px;

        .van-icon-smile-o {
            font-size: 50px;
        }

        .title {
            font-size: 16px;
            margin-bottom: 20px;
        }
    }

    .submit-all {
        margin-bottom: 50px;

        .van-checkbox {
            margin-left: 10px
        }

        .van-submit-bar__text {
            margin-right: 10px
        }
    }

}
</style>
