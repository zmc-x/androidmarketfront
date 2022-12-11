<template>
  <div class="categray">
    <div>
      <header class="category-header wrap">
        <van-icon name="arrow-left" @click="goHome" class="icon-left" />
        <div class="header-search">
          <van-icon name="search" class="nbSearch" />
          <router-link class="search-title" to="./product/%20">android商城</router-link>
        </div>
      </header>
      <nav-bar></nav-bar>
      <div class="search-wrap" ref="searchWrap">
        <list-scroll :scroll-data="categoryData" class="nav-side-wrapper">
          <ul class="nav-side">
            <li v-for="item in categoryData" :key="item.categoryId" v-text="item.text"
              :class="{ 'active': currentIndex == item.categoryId }" @click="selectMenu(item.categoryId)">
            </li>
          </ul>
        </list-scroll>
        <div class="search-content">
          <list-scroll :scroll-data="goods">
              <div>
                <template v-for="item in goods">
                  <van-card :title="item.goodsname" :thumb="item.goodscover" @click="selectProduct(item.goodsname)"/>
                  <p></p>
                </template>
              </div>
          </list-scroll>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import navBar from '@/components/NavBar.vue'
import listScroll from '@/components/listscroll.vue'
import { getGoodsByType } from '@/service/goods'
export default {
  components: {
    navBar,
    listScroll
  },
  data() {
    return {
      categoryData: [
        {
          categoryId: 1,
          text: '手机'
        },
        {
          categoryId: 2,
          text: '电脑'
        },
        {
          categoryId: 3,
          text: '智能穿戴'
        }
      ],
      currentIndex: 1,
      goods: [],
    }
  },
  async mounted() {
    this.setWrapHeight()
    this.init()
  },
  methods: {
    goHome() {
      this.$router.push({ path: 'home' })
    },
    setWrapHeight() {
      // 设置视口高度
      let $screenHeight = document.documentElement.clientHeight
      this.$refs.searchWrap.style.height = $screenHeight - 100 + 'px'
    },
    selectMenu(index) {
      this.currentIndex = index
      this.init()
    },
    selectProduct(item) {
      this.$router.push({ path: `product/${item}` })
    },
    async init() {
      var goodstype
      if (this.currentIndex == 1) goodstype = 'phone'
      else if (this.currentIndex == 2) goodstype = 'computer'
      else goodstype = 'watch'
      const data = await getGoodsByType(goodstype)
      this.goods = data.data.data
    },
  }
}
</script>
<style lang="less" scoped>
@import '../common/style/mixin';

.categray {
  .category-header {
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    .fj();
    .wh(100%, 50px);
    line-height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 15px;
    color: #656771;
    z-index: 10000;

    &.active {
      background: #ed1a1a;
    }

    .icon-left {
      font-size: 25px;
      font-weight: bold;
      position: relative;
      top: 12px;
    }

    .header-search {
      display: flex;
      width: 80%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: #F7F7F7;
      border-radius: 20px;

      .nbSearch {
        padding: 0 10px 0 20px;
        font-size: 17px;
      }

      .search-title {
        font-size: 12px;
        color: #666;
      }
    }

  }
}

.search-wrap {
  .fj();
  width: 100%;
  margin-top: 50px;
  background: #F8F8F8;
  border-top: 1px solid #999;

  .nav-side-wrapper {
    width: 28%;
    height: 100%;
    overflow: hidden;

    .nav-side {
      width: 100%;
      .boxSizing();
      background: #F8F8F8;

      li {
        width: 100%;
        height: 56px;
        text-align: center;
        line-height: 56px;
        font-size: 14px;

        &.active {
          color: #ed1a1a;
          background: #fff;
        }
      }
    }
  }

  .search-content {
    width: 72%;
    height: 100%;
    padding: 0 10px;
    background: #fff;
    .boxSizing();
  }
}
</style>
  