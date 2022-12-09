import axios from 'axios'
axios.defaults.baseURL = 'api'
// axios.defaultes.baseURL = 'http://101.35.48.153:1234'
export function modifyCart(params) {
    return axios({
        method: 'post',
        url: '/mall/v1/shoppingcart/updatecount',
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
        url: '/mall/v1/shoppingcart/delete',
        headers: {
            'x-token' : window.localStorage.getItem('x-token')
        },
        data: ids
    })
}

export function getByCartItemIds(params) {
    return axios({
        method: 'post',
        url: '/mall/v1/shoppingcart/queryById',
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
        url: '/mall/v1/shoppingcart/add',
        headers: {
            'x-token' : window.localStorage.getItem('x-token')
        },
        data: params
    })
}