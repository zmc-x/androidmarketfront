import axios from 'axios'

export function getGoodsDetail(goodsid, specificationid) {
    return axios({
        method: 'get',
        // url: 'api/mall/v1/goods/showgoodsinfo?goodsid=' + goodsid + '&specificationid=' + specificationid,
        url: 'http://zmcicloud.cn:1234/mall/v1/goods/showgoodsinfo?goodsid=' + goodsid + '&specificationid=' + specificationid,
        headers: {
            'x-token' : window.localStorage.getItem('x-token')
        }
    })
}

// 通过类别来查询商品种类
export function getGoodsByType(goodsType) {
    return axios({
        method: 'get',
        url: 'http://zmcicloud.cn:1234/mall/v1/goods/Bytype?goodstype=' + goodsType,
        headers: {
            'x-token' : window.localStorage.getItem('x-token')
        }
    })
}

// 通过商品名称来进行查询
export function getGoodsByName(goodname) {
    return axios({
        method: 'get',
        url: 'http://zmcicloud.cn:1234/mall/v1/goods/queryByName?goodsname=' + goodname,
    })
}