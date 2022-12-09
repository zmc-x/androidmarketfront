import axios from 'axios'

export function getHomeInfo() {
    return axios.get('api/mall/v1/goods/marketinfo')
}