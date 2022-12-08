import axios from "axios";

// 创建订单
export function createorder(params) {
    return axios({
        method: 'post',
        url: 'api/mall/v1/order/create',
        headers: {
            'x-token' : window.localStorage.getItem('x-token')
        },
        data: params
    })
}

// 订单的相关的操作 cancel & complete
export function updateorder(orderid, updatetype) {
    return axios({
        method: 'get',
        url: 'api/mall/v1/order/update/' + updatetype + '?orderid=' + parseInt(orderid),
        headers: {
            'x-token' : window.localStorage.getItem('x-token')
        },
    })
}

// 根据相关的订单状态查看相关的订单列表
export function queryOrderByStatus(Status) {
    return axios({
        methods: 'get',
        url: 'api/mall/v1/order/query/' + Status,
        headers: {
            'x-token' : window.localStorage.getItem('x-token')
        }
    })
}

// 查询订单的相关详情信息
export function queryOrderInfo(orderid) {
    return axios({
        method: 'get',
        url: 'api/mall/v1/order/queryinfo?orderid=' + orderid,
        headers: {
            'x-token' : window.localStorage.getItem('x-token')
        }
    })
}