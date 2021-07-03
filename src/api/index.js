import Request from "../utils/request";

const {axios: request} = new Request()

export const getAction = (url, params) => {
    return request({
        url,
        method: 'get',
        params
    })
}

export const deleteAction = (url, params) => {
    return request({
        url,
        method: 'delete',
        params
    })
}
export const patchAction = (url, data) => {
    return request({
        url,
        method: 'patch',
        data
    })
}
export const postAction = (url, data) => {
    return request({
        url,
        method: 'post',
        data
    })
}

export const putAction = (url, data) => {
    return request({
        url,
        method: 'put',
        data
    })
}
