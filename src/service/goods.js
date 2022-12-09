import axios from 'axios'
axios.defaults.baseURL = 'api'
// axios.defaultes.baseURL = 'http://101.35.48.153:1234'
export function getGoodsDetail(goodsid, specificationid) {
    return axios({
        method: 'get',
        url: '/mall/v1/goods/showgoodsinfo?goodsid=' + goodsid + '&specificationid=' + specificationid,
        headers: {
            'x-token' : window.localStorage.getItem('x-token')
        }
    })
}