<template>
    <div>
        <s-header :title="'地址管理'" :back="from == 'createorder' ? '' : '/user'"></s-header>
        <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @edit="onEdit"
            @select="select" />
    </div>

</template>

<script>
import sHeader from '@/components/simpleheader.vue'
import { Toast } from 'vant';
const axios = require('axios')
export default {
    components: {
        sHeader,
    },
    mounted: function () {
        let _this = this
        Toast.loading({
            message: '加载中...',
            forbidClick: true,
        });
        axios({
            method: 'get',
            url: 'http://zmcicloud.cn:1234/mall/v1/address/select',
            headers: {
                'x-token': window.localStorage.getItem('x-token')
            }
        }).then(function (response) {
            if (response.data.msg == '令牌已失效，请重新登录！') {
                Notify({ type: 'danger', message: response.data.msg })
                window.localStorage.removeItem('x-token')
                _this.$router.push({ path: '/login' })
                return
            }
            var addressinfo = response.data.data
            var len = addressinfo.length
            for (var i = 0; i < len; i++) {
                _this.list[i] = {
                    id: addressinfo[i].id,
                    name: addressinfo[i].name,
                    tel: addressinfo[i].tel,
                    address: addressinfo[i].province + '-' + addressinfo[i].city + '-' + addressinfo[i].county + '-' + addressinfo[i].detaillocation,
                }
                if (addressinfo[i].defaultaddress == 1) {
                    _this.list[i].isDefault = true;
                }
                else {
                    _this.list[i].isDefault = false;
                }
                _this.chosenAddressId = addressinfo[0].id
            }
        })
        Toast.clear();
    },
    data() {
        return {
            chosenAddressId: '',
            list: [],
            from: this.$route.query.from
        };
    },
    methods: {
        select(value) {
            // 如果不是从订单页面跳转过来的则不需要管
            if (this.from == 'createorder') {
                this.$router.push({
                    name: 'createorder', query: {
                        ids: this.$route.query.ids,
                        addressId: value.id,
                        name: value.name,
                        tel: value.tel,
                    }
                })
            }
            console.log(value)
        },
        onAdd() {
            this.$router.push({ path: '/addAddress', query: {from : this.from}})
        },
        onEdit(item) {
            console.log(item)
            this.$router.push(
                {
                    name: 'editAddress',
                    query: {
                        from: this.from
                    },
                    params: {
                        item,
                    }
                }
            )
        },
    },
};
</script>