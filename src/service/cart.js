import axios from 'axios'
export function modifyCart(params) {
    return axios({
        method: 'post',
        // url: 'api/mall/v1/shoppingcart/updatecount',
        url: 'http://zmcicloud.cn:1234/mall/v1/shoppingcart/updatecount',
        headers: {
            'x-token': window.localStorage.getItem('x-token')
        },
        data: params
    })
}

export function deleteCartItem(ids) {
    // console.log(ids)
    return axios({
        method: 'delete',
        // url: 'api/mall/v1/shoppingcart/delete',
        url: 'http://zmcicloud.cn:1234/mall/v1/shoppingcart/delete',
        headers: {
            'x-token' : window.localStorage.getItem('x-token')
        },
        data: ids
    })
}

export function getByCartItemIds(params) {
    return axios({
        method: 'post',
        // url: 'api/mall/v1/shoppingcart/queryById',
        url: 'http://zmcicloud.cn:1234/mall/v1/shoppingcart/queryById',
        headers: {
            'x-token' : window.localStorage.getItem('x-token')
        },
        data: params
    })
}

// 添加商品到购物车中
export function addGoodsToShoppingCart(params) {
    return axios({
        method: 'post',
        url: 'http://zmcicloud.cn:1234/mall/v1/shoppingcart/add',
        // url: 'api/mall/v1/shoppingcart/add',
        headers: {
            'x-token' : window.localStorage.getItem('x-token')
        },
        data: params
    })
}