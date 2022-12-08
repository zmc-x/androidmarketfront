<template>
    <div>
        <s-header :title="'添加地址'" :back="from == 'createorder' ? '' : '/user/addresses'"></s-header>
        <van-address-edit :area-list="areaList" show-set-default show-search-result :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" @change-detail="onChangeDetail"
            :save-button-text="'添加'" />
    </div>

</template>

<script>
import { Toast } from 'vant';
import { Notify } from 'vant';
import { areaList } from '@vant/area-data';
import sHeader from '@/components/simpleheader.vue'
const axios = require('axios')
export default {
    components: {
        sHeader
    },
    data() {
        return {
            areaList,
            from: this.$route.query.from,
            searchResult: [],
        };
    },
    methods: {
        onSave(value) {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
            let _this = this
            axios({
                method: 'post',
                url: 'api/mall/v1/address/add',
                headers: {
                    'x-token': window.localStorage.getItem('x-token')
                },
                data: {
                    name: value.name,
                    tel: parseInt(value.tel),
                    province: value.province,
                    city: value.city,
                    county: value.county,
                    detaillocation: value.addressDetail,
                    defaultaddress: value.isDefault ? 1 : 0,
                }
            }).then(function (response) {
                if(response.data.resultCode == 200) {
                    Notify({ type: 'success', message: response.data.msg });
                    // 判断条件进行跳转
                    if(_this.from != 'createorder') window.location.href = '/#/user/addresses'
                    else window.history.go(-1)
                }
                else if(response.data.msg == '令牌已失效，请重新登录！') {
                    Notify({type: 'danger', message: response.data.msg})
                    window.localStorage.removeItem('x-token')
                    _this.$router.push({path:'/login'})
                }
                else {
                    // 添加失败
                    Notify({ type: 'warning', message: response.data.msg });
                }
                Toast.clear()
            })
        },
        onChangeDetail(val) {
            if (val) {
                this.searchResult = [
                    {
                        name: '黄龙万科中心',
                    },
                    {
                        name: '湖南科技大学',
                    }
                ];
            } else {
                this.searchResult = [];
            }
        },
    },
};
</script>