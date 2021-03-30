import axios from 'axios'
import {Message} from 'element-ui'
import {getToken, removeToken, getFingerprint} from '@/utils/cached'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'
import {equalsObj, isEmpty} from '@/utils/index' // Progress 进度条样式

const pendings = [] //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const CancelToken = axios.CancelToken
const token = getToken()
let startLimit = !isEmpty(token)

// 配置NProgress进度条选项  —— 动画效果
NProgress.configure({ease: 'ease', speed: 500, minimum: 0.5, trickleRate: 0.02, trickleSpeed: 300})
// 创建axios实例
const service = axios.create({
  baseURL: '/api/', // api的base_url
  timeout: 120000, // 请求超时时间
  withCredentials: true // 用于携带cookies
})
// 阻止重复请求
const stopRepeatRequest = (ever) => {
  for (const p in pendings) {
    const match = handleMatchRequest(pendings[p], ever)
    if (match) { // 当当前请求在数组中存在时执行函数体
      pendings[p].f() // 执行取消操作
      pendings.splice(p, 1) // 把这条记录从数组中移除
    }
  }
}
// request拦截器
service.interceptors.request.use(config => {
  NProgress.start()
  const token = getToken()
  const fingerprint = getFingerprint()
  if (token) {
    config.headers['CPoles-Token'] = token // 让每个请求携带自定义token
    config.headers['Intranet-IP'] = fingerprint // 让每个请求携带浏览器指纹
  }
  if (isEmpty(config.params) || !config.params.concurrency) {
    stopRepeatRequest(config)
    config.cancelToken = new CancelToken((c) => {
      // 自定义唯一标识
      pendings.push({u: config.url, m: config.method, p: config.params, d: config.data, f: c})
    })
  }
  return config
}, error => {
  NProgress.done()
  console.error(error)
  Promise.reject(error).then()
})
// response拦截器
service.interceptors.response.use(
  response => {
    NProgress.done()
    if (startLimit || isEmpty(response.config.params) || !response.config.params.redirect_uri) {
      stopRepeatRequest(response.config) // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pendings中移除
    } else {
      startLimit = true
      pendings.splice(0)
    }
    if (response.status === 200) {
      if (!isEmpty(response.config) && !isEmpty(response.config.params) && response.config.params.raw) {
        return response
      } else {
        return response.data
      }
    } else if (response.status === 203) {
      return response
    } else if (response.status === 204) {
      return response
    } else if (response.status === 401) {
      removeToken()
      return response
    } else {
      const msg = response.data.message === undefined ? response.data : response.data.message
      handleAlertErrorInfo(msg)
      return Promise.reject('error')
    }
  }, (err) => {// 这里是返回状态码不为200时候的错误处理
    NProgress.done()
    if (axios.isCancel(err)) {
      return new Promise(() => {
      })
    } else if (!isEmpty(err.response.config.params) && err.response.config.params.raw) {
      return Promise.reject(err)
    } else if (err.response.data instanceof Blob && err.response.data.type === 'application/json') {
      const reader = new FileReader()
      reader.readAsText(err.response.data, 'utf-8')
      reader.onload = () => {
        const data = JSON.parse(reader.result)
        if (!isEmpty(data.message)) {
          err.message = data.message
        } else {
          err.message = 'error！'
        }
        // handleNoticeInfo(err)
        handleAlertErrorInfo(err.message)
      }
    } else {
      if (err && err.response) {
        if (!isEmpty(err.response.data.message)) {
          err.message = err.response.data.message
        }
        handleNoticeInfo(err)
        if (err.response.data.status === 400) {
          return Promise.reject()
        } else {
          handleAlertErrorInfo(err.message)
          return Promise.reject(err.message)
        }
      } else {
        err.message = '系统发布中，请稍等.....'
      }
    }
    console.error(err)
  })

// 匹配常规返回状态
function handleResponseState(response) {
  switch (response.status) {
    case 400:
      return '请求错误'
    case 401:
      if (response.config.url === '/api/cas/login/sms') {
        return '手机号或邮箱号或验证码不正确'
      } else if (response.config.url === '/api/cas/login') {
        return '用户名或密码不正确'
      } else {
        return '未授权，请登录'
      }
    case 403:
      return '拒绝访问'
    case 404:
      return '请求地址出错'
    case 408:
      return '请求超时'
    case 423:
      return '账户已被锁定，请联系管理员'
    case 500:
      return '服务器内部错误'
    case 501:
      return '服务未实现'
    case 502:
      return '网关错误'
    case 503:
      return '服务不可用'
    case 504:
      return '网关超时(系统发布中，请稍等.....)'
    case 505:
      return 'HTTP版本不受支持'
    default:
      return ''
  }
}

// 匹配当前请求
function handleMatchRequest(target, resource) {
  if ('/api' + target.u === resource.url) {
    if (target.m === resource.method) {
      if (target.m === 'get' || target.m === 'GET') {
        // noinspection JSCheckFunctionSignatures
        return equalsObj(target.p, resource.params)
      } else {
        let resourceData = resource.data
        if (!isEmpty(resourceData) && Object.prototype.toString.call(resource.data) !== '[object FormData]') {
          resourceData = JSON.parse(resourceData)
        }
        // noinspection JSCheckFunctionSignatures
        return equalsObj(target.p, resource.params) && equalsObj(target.d, resourceData)
      }
    } else {
      return false
    }
  } else {
    return false
  }
}

// 处理提醒信息
function handleNoticeInfo(err) {
  if (err.message.indexOf('optimistic') > -1) {
    err.message = '数据有变动，请刷新获取最新数据！'
  } else if (err.message.indexOf('SHORTCIRCUIT') > -1 || err.message.indexOf('GENERAL') > -1) {
    err.message = '系统发布中，请稍等.....'
  } else {
    err.message = handleResponseState(err.response)
    if (!isEmpty(err.response.data.message)) {
      err.message = err.response.data.message
    }
  }
  // } else if (!/.*[\u4e00-\u9fa5]+.*$/.test(err.message)) {
  //   err.message = '服务器开小差了,请刷新后重试(-' + err.response.status + ')！'
  // }
}

// 处理弹出提醒信息
function handleAlertErrorInfo(msg) {
  Message({
    message: msg,
    type: 'error',
    duration: 3 * 1000,
    showClose: true
  })
}

// 处理并发请求
export function axiosRequestAll(params) {
  return axios.all(params).then(axios.spread(function () {
    const aReturn = []
    for (const i of arguments) {
      aReturn.push(i)
    }
    return aReturn
  })).catch((err) => {
    return Promise.reject(err)
  })
}

// 暴露
export default service
