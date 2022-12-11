import axios from 'axios'

export function getHomeInfo() {
    // return axios.get('api/mall/v1/goods/marketinfo')
    return axios.get('http://zmcicloud.cn:1234/mall/v1/goods/marketinfo')
}