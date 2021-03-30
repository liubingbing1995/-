/**
 * @author  leehl
 * @create 2018-08-20 8:53
 * @desc
 **/
import axios from 'axios'
import request from '@/utils/request'
import {getCheckSum, getUUID} from '@/utils/encrypt'

export function getValidCode(type, address) {
  const sendTime = new Date().getTime()
  const nonce = getUUID()
  const signature = getCheckSum(process.env.OPEN_ID, nonce, sendTime)
  let url = ''
  if (type === 'mail') {
    url = `mars/open-app/captcha?mail=${address}`
  } else if (type === 'mobile') {
    url = `mars/open-app/captcha?mobile=${address}`
  }
  // 设置axios请求超时时重新请求
  axios.defaults.retry = 4
  // 延时一秒重发
  axios.defaults.retryDelay = 1000
  // 设置拦截器
  axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    const config = err.config
    if (!config || !config.retry) return Promise.reject(err)
    config.__retryCount = config.__retryCount || 0
    if (config.__retryCount >= config.retry) {
      return Promise.reject(err)
    }
    config.__retryCount += 1
    const backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve()
      }, config.retryDelay || 1)
    })
    return backoff.then(function () {
      return axios(config)
    })
  })
  return axios({
    method: 'get',
    baseURL: '/api/',
    url: url,
    headers: {
      'AppKey': process.env.APP_KEY,
      'Nonce': nonce,
      'SendTime': sendTime,
      'Signature': signature
    }
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function uploadAvatar(form) {
  const sendTime = new Date().getTime()
  const nonce = getUUID()
  const signature = getCheckSum(process.env.OPEN_ID, nonce, sendTime)
  const url = 'mars/open-app/avatar'

  // 设置axios请求超时时重新请求
  axios.defaults.retry = 4
  // 延时一秒重发
  axios.defaults.retryDelay = 1000
  // 设置拦截器
  axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    const config = err.config
    if (!config || !config.retry) return Promise.reject(err)
    config.__retryCount = config.__retryCount || 0
    if (config.__retryCount >= config.retry) {
      return Promise.reject(err)
    }
    config.__retryCount += 1
    const backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve()
      }, config.retryDelay || 1)
    })
    return backoff.then(function () {
      return axios(config)
    })
  })
  return axios({
    method: 'post',
    baseURL: '/api/',
    url: url,
    headers: {
      'AppKey': process.env.APP_KEY,
      'Nonce': nonce,
      'SendTime': sendTime,
      'Signature': signature
    },
    params: {
      folderId: '66c48c6c-e9ad-49aa-99c0-ec311704a022'
    },
    data: form
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })
}

export function getUserAvatar(id) {
  const sendTime = new Date().getTime()
  const nonce = getUUID()
  const signature = getCheckSum(process.env.OPEN_ID, nonce, sendTime)
  const url = 'mars/open-app/avatar'

  // 设置axios请求超时时重新请求
  axios.defaults.retry = 4
  // 延时一秒重发
  axios.defaults.retryDelay = 1000
  // 设置拦截器
  axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    const config = err.config
    if (!config || !config.retry) return Promise.reject(err)
    config.__retryCount = config.__retryCount || 0
    if (config.__retryCount >= config.retry) {
      return Promise.reject(err)
    }
    config.__retryCount += 1
    const backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve()
      }, config.retryDelay || 1)
    })
    return backoff.then(function () {
      return axios(config)
    })
  })
  return axios({
    method: 'get',
    baseURL: '/api/',
    url: url,
    headers: {
      'AppKey': process.env.APP_KEY,
      'Nonce': nonce,
      'SendTime': sendTime,
      'Signature': signature
    },
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res)
  }).catch((err) => {
    return Promise.reject(err)
  })
}

// 效验验证码
export function checkValidCode(captchaId, code) {
  return request({
    url: '/mars/open-app/captcha/' + captchaId,
    method: 'post',
    params: {
      code
    }
  })
}
