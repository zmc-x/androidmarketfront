<template>
    <div>
        <s-header :title="'编辑地址'" :back="from == 'createorder' ? '' : '/user/addresses'"></s-header>
        <van-address-edit :area-list="areaList" show-delete show-set-default show-search-result
            :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave"
            @delete="onDelete" @change-detail="onChangeDetail" :save-button-text="'修改'" :address-info="AddressInfo" />
    </div>

</template>

<script>
import { Toast } from 'vant';
import { Notify } from 'vant';
import { areaList } from '@vant/area-data';
import sHeader from '@/components/simpleheader.vue'
const axios = require('axios')
const _ = require('lodash')
export default {
    data() {
        return {
            from: this.$route.query.from,
            areaList,
            searchResult: [],
            AddressInfo: {
                id: '',
                name: '',
                tel: '',
                province: '',
                city: '',
                county: '',
                isDefault: '',
                addressDetail: '',
            },
            address: '',
        };
    },
    mounted: function () {
        this.AddressInfo = this.$route.params.item
        this.AddressInfo.province = this.AddressInfo.address.split('-')[0]
        this.AddressInfo.city = this.AddressInfo.address.split('-')[1]
        this.AddressInfo.county = this.AddressInfo.address.split('-')[2]
        this.AddressInfo.addressDetail = this.AddressInfo.address.split('-')[3]
        this.areaCodeInit()
    },
    components: {
        sHeader
    },
    methods: {
        async areaCodeInit() {
            // 这里是点击编辑拿到的地址，我是用‘-’拼接起来的，现在分割一下
            var areaN = this.AddressInfo.address.split("-");
            var city = areaN[1]; //城市
            var district = areaN[2]; //区/县
            _.forEach(this.areaList.city_list, (o, c) => {
                if (o == city) {
                    let cityId = String(_.take(c, 2));
                    _.forEach(this.areaList.county_list, (i, a) => {
                        if (i == district) {
                            let districtId = String(_.take(a, 2));
                            if (cityId == districtId) {
                                this.AddressInfo.areaCode = a;
                            }
                        }
                    });
                }
            });
        },

        onDelete(value) {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
            let _this = this
            axios({
                method: 'delete',
                url: 'api/mall/v1/address/delete',
                headers: {
                    'x-token': window.localStorage.getItem('x-token')
                },
                data: {
                    ids: [value.id]
                }
            }).then(function (response) {
                if(response.data.resultCode == 200) {
                    Notify({ type: 'success', message: response.data.msg });
                    // 判断条件进行跳转
                    if(_this.from != 'createorder') _this.$router.push({path:'/user/addresses'})
                    else window.history.go(-1)
                }
                else if(response.data.msg == '令牌已失效，请重新登录！') {
                    Notify({type: 'danger', message: response.data.msg})
                    _this.$router.push({path:'/login'})
                }
                else {
                    Notify({type: 'warning', message: response.data.msg});
                }
                Toast.clear()
            })
        },
        onSave(value) {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
            });
            let _this = this
            axios({
                method: 'post',
                url: 'api/mall/v1/address/update',
                headers: {
                    'x-token': window.localStorage.getItem('x-token')
                },
                data: {
                    id : value.id,
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
                    if(_this.from != 'createorder') _this.$router.push({path:'/user/addresses'})
                    else window.history.go(-1)
                }
                else if(response.data.msg == '令牌已失效，请重新登录！') {
                    Notify({type: 'danger', message: response.data.msg})
                    window.localStorage.removeItem('x-token')
                    _this.$router.push({path:'/login'})
                }
                else {
                    Notify({type: 'warning', message: response.data.msg});
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