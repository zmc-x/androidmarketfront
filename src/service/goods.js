import axios from 'axios'

export function getGoodsDetail(goodsid, specificationid) {
    return axios({
        method: 'get',
        url: 'api/mall/v1/goods/showgoodsinfo?goodsid=' + goodsid + '&specificationid=' + specificationid,
        headers: {
            'x-token' : window.localStorage.getItem('x-token')
        }
    })
}