<template>
    <div>
        <header class="home-header wrap" :class="{ 'active': headerScroll }">
            <router-link to="./category"><van-icon name="wap-nav" /></router-link>
            <div class="header-search">
                <span class="app-name">Android商城</span>
                <i class="iconfont icon-search"></i>
                <router-link class="search-title" to="">山河无恙，人间皆安</router-link>
            </div>
            <router-link class="login" to="./login" v-if="!isLogin">登录</router-link>
            <router-link class="login" to="./user" v-else>
                <van-icon name="manager-o" />
            </router-link>
        </header>
        <nav-bar></nav-bar>
        <div class="image">
            <swiper :list="swiperList"></swiper>
        </div>
        <div class="category-list">
            <div v-for="item in categoryList" v-bind:key="item.categoryId" @click="clickCategory">
                <img :src="item.imgUrl">
                <span>{{ item.name }}</span>
            </div>
        </div>
        <div class="good">
            <header class="good-header">热门商品</header>
            <div class="good-box">
                <div class="good-item" v-for="(item, index) in hots" :key="index" @click="goToDetail(item)">
                    <img :src="item.coverimage" alt="">
                    <div class="good-desc">
                        <div class="title">{{ item.goodsName }}</div>
                        <van-tag type="danger">{{ item.specific }}G</van-tag>
                        <van-tag color="#ffe1e1" text-color="#ad0000">{{item.color}}</van-tag>
                        <div class="price">¥ {{ item.price }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import navBar from '@/components/NavBar.vue'
import swiper from '@/components/swiper.vue'
import { getHomeInfo } from '@/service/home'
import { Toast } from 'vant'
export default {
    name: 'home',
    data() {
        return {
            swiperList: [
                'https://res.vmallres.com/cmscdn/CN/2022-12/2fdfac9be5a341369c766e92fb92c516.jpg',
                'https://res.vmallres.com/cmscdn/CN/2022-12/c380b30a7859462fb8e690263d930a12.jpg',
                'https://res.vmallres.com//uomcdn/CN/ams/202212/F4E15B44E12FE471E803677A7BDEE718.png',
                'https://res.vmallres.com//uomcdn/CN/ams/202212/AE5AA92AEDA023C05D4296155576C083.jpg'
            ],
            isLogin: false,
            headerScroll: false,
            hots: [],
            categoryList: [
                {
                    name: '超市',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png',
                    categoryId: 100001
                }, {
                    name: '服饰',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E6%9C%8D%E9%A5%B0%402x.png',
                    categoryId: 100003
                }, {
                    name: '全球购',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E7%90%83%E8%B4%AD%402x.png',
                    categoryId: 100002
                }, {
                    name: '生鲜',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%94%9F%E9%B2%9C%402x.png',
                    categoryId: 100004
                }, {
                    name: '送货上门',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%88%B0%E5%AE%B6%402x.png',
                    categoryId: 100005
                }, {
                    name: '充值缴费',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%85%E5%80%BC%402x.png',
                    categoryId: 100006
                }, {
                    name: '9.9元拼',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/9.9%402x.png',
                    categoryId: 100007
                }, {
                    name: '领劵',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png',
                    categoryId: 100008
                }, {
                    name: '省钱',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png',
                    categoryId: 100009
                }, {
                    name: '全部',
                    imgUrl: 'https://s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png',
                    categoryId: 100010
                }
            ],
        }
    },
    components: {
        navBar,
        swiper
    },
    async mounted() {
        const token = window.localStorage.getItem('x-token')
        if (token) {
            this.isLogin = true
        }
        window.addEventListener('scroll', this.pageScroll)
        Toast.loading({
            message: '加载中...',
            forbidClick: true
        });
        const { data } = await getHomeInfo()
        this.hots = data.data
        Toast.clear()
    },
    methods: {
        pageScroll() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            scrollTop > 100 ? this.headerScroll = true : this.headerScroll = false
        },
        goToDetail(item) {
            this.$router.push({ path: `goodsdetail/${item.goodsId}/${item.specificationId}` })
        },
        clickCategory() {
            Toast("抱歉~，该功能未完成。敬请期待！")
        }
    }
}
</script>
<style lang="less" scoped >
@import '../common/style/mixin';

.home-header {
    position: fixed;
    left: 0;
    top: 0;
    .wh(100%, 50px);
    .fj();
    line-height: 50px;
    padding: 0 15px;
    .boxSizing();
    font-size: 15px;
    color: #fff;
    z-index: 10000;

    &.active {
        background: #b0041e;

        .nbmenu2 {
            color: #fff;
        }

        .login {
            color: #fff;
        }
    }

    .header-search {
        display: flex;
        .wh(74%, 20px);
        line-height: 20px;
        margin: 10px 0;
        padding: 5px 0;
        color: #232326;
        background: rgba(238, 223, 234, 0.7);
        border-radius: 20px;

        .app-name {
            padding: 0 10px;
            color: #b0041e;
            font-size: 20px;
            font-weight: bold;
            border-right: 1px solid #666;
        }

        .icon-search {
            padding: 0 10px;
            font-size: 17px;
        }

        .search-title {
            font-size: 12px;
            color: #666;
            line-height: 21px;
        }
    }

    .icon-iconyonghu {
        color: #fff;
        font-size: 22px;
    }

    .login {
        color: #b0041e;
        line-height: 52px;

        .van-icon-manager-o {
            font-size: 20px;
            vertical-align: -3px;
        }
    }
}

.category-list {
    position: relative;
    top: 25px;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 13px;

    div {
        display: flex;
        flex-direction: column;
        width: 20%;
        text-align: center;

        img {
            .wh(40px, 40px);
            margin: 13px auto 8px auto;
        }
    }
}

.good {
    position: relative;
    top: 12px;
    .good-header {
        background: #f9f9f9;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #b0041e;
        font-size: 16px;
        font-weight: 500;
    }

    .good-box {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        .good-item {
            box-sizing: border-box;
            width: 50%;
            border-bottom: 1PX solid #e9e9e9;
            padding: 10px 10px;

            img {
                display: block;
                width: 120px;
                margin: 0 auto;
            }

            .good-desc {
                text-align: center;
                font-size: 14px;
                padding: 10px 0;

                .title {
                    color: #222333;
                }

                .price {
                    color: #b0041e;
                }
            }

            &:nth-child(2n + 1) {
                border-right: 1PX solid #e9e9e9;
            }
        }
    }
}

.floor-list {
    width: 100%;
    padding-bottom: 50px;

    .floor-head {
        width: 100%;
        height: 40px;
        background: #F6F6F6;
    }

    .floor-content {
        display: flex;
        flex-shrink: 0;
        flex-wrap: wrap;
        width: 100%;
        .boxSizing();

        .floor-category {
            width: 50%;
            padding: 10px;
            border-right: 1px solid #dcdcdc;
            border-bottom: 1px solid #dcdcdc;
            .boxSizing();

            &:nth-child(2n) {
                border-right: none;
            }

            p {
                font-size: 17px;
                color: #333;

                &:nth-child(2) {
                    padding: 5px 0;
                    font-size: 13px;
                    color: #b0041e;
                }
            }

            .floor-products {
                .fj();
                width: 100%;

                img {
                    .wh(65px, 65px);
                }
            }
        }
    }
}

.image {
    position: relative;
    top: 40px
}
</style>
