import axios from 'axios'

export function modifyCart(params) {
    return axios({
        method: 'post',
        url: 'api/mall/v1/shoppingcart/updatecount',
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
        url: 'api/mall/v1/shoppingcart/delete',
        headers: {
            'x-token' : window.localStorage.getItem('x-token')
        },
        data: ids
    })
}

export function getByCartItemIds(params) {
    return axios({
        method: 'post',
        url: 'api/mall/v1/shoppingcart/queryById',
        headers: {
            'x-token' : window.localStorage.getItem('x-token')
        },
        data: params
    })
}