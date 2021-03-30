/**
 * @author  leehl
 * @create 2018-09-03 10:16
 * @desc
 **/
import {decodeBase64, encodeBase64} from '@/utils/encrypt'
import {isEmpty} from '@/utils/index'

const TOKEN = 'MARS_TOKEN'
const BROWSER_ID = 'BROWSER_ID'

export function setCache(key, val, isObject, isEncrypt, isLocal, isSync, time) {
  if (isEmpty(time)) {
    time = 100
  }
  try {
    if (isSync) { // 同步
      flushCache(key, val, isObject, isEncrypt, isLocal)
    } else { // 异步
      setTimeout(() => {
        flushCache(key, val, isObject, isEncrypt, isLocal)
      }, time)
    }
  } catch (err) {
    console.log(err)
  }
}

function flushCache(key, val, isObject, isEncrypt, isLocal) {
  if (!isEmpty(val)) {
    if (isObject) {
      val = JSON.stringify(val)
    }
    if (isEncrypt) {
      val = encodeBase64(val)
    }
  }
  if (isLocal) {
    localStorage.setItem(key, val)
  } else {
    sessionStorage.setItem(key, val)
  }
}

export function getCache(key, isObject, isEncrypt, isLocal) {
  try {
    let val = null
    if (isLocal) {
      val = localStorage.getItem(key)
    } else {
      val = sessionStorage.getItem(key)
    }
    if (!isEmpty(val)) {
      if (isEncrypt) {
        val = decodeBase64(val)
      }
      if (isObject) {
        val = JSON.parse(val)
      }
    }
    return val
  } catch (err) {
    console.log(err)
  }
}

export function hasCache(key, isLocal) {
  if (isLocal) {
    return !isEmpty(localStorage.getItem(key))
  } else {
    return !isEmpty(sessionStorage.getItem(key))
  }
}

export function removeCache(key, isLocal) {
  if (isLocal) {
    localStorage.removeItem(key)
  } else {
    sessionStorage.removeItem(key)
  }
}

export function clearCache(isLocal) {
  if (isLocal) {
    localStorage.clear()
  } else {
    sessionStorage.clear()
  }
}

export function getToken() {
  return sessionStorage.getItem(TOKEN)
}

export function setToken(token) {
  sessionStorage.setItem(TOKEN, token)
}

export function removeToken() {
  sessionStorage.removeItem(TOKEN)
}

export function getFingerprint() {
  return localStorage.getItem(BROWSER_ID)
}
