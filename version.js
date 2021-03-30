import axios from 'axios'
import store from '../store'
import {getCache, setCache} from '@/utils/cached'
import {isEmpty} from '@/utils/index'
import {Notification} from 'element-ui'

const baseUrl = getRootPath()

export function checkVersion(init) {
  if (process.env.NODE_ENV === 'development') {
    return
  }
  let version = store.getters.version
  if (isEmpty(version)) {
    version = getCache('VERSION')
  }
  let jsonUrl = baseUrl + `/static/version.json?_=${Math.random()}`
  if (baseUrl.indexOf('mars') === -1) {
    jsonUrl = baseUrl + `/mars/static/version.json?_=${Math.random()}`
  }
  axios.get(jsonUrl).then((response) => { // 访问前端服务器获取版本号
    if (response.status === 200 && version !== response.data.version) {
      if (init) {
        setCache('VERSION', response.data.version)
        store.commit('SET_SYSTEM_VERSION', response.data.version)
      } else {
        Notification.info({
          title: '发布提醒',
          message: '系统已发布新版本，请及时刷新浏览器，刷新前，请确认数据是否已保存！',
          offset: 100,
          duration: 5 * 1000
        })
      }
    }
  }).catch((err) => {
    console.error('Check Version', err)
  })
}

export function getRootPath() {
  const curWwwPath = window.document.location.href
  const pos = curWwwPath.indexOf('/#/')
  return curWwwPath.substring(0, pos)
}

