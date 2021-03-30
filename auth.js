import Cookies from 'js-cookie'

const DEFAULT_APP = '4de835a5-0694-4fa2-8722-e1733b3ebf26' // 默认系统ID

const Token = 'MARS_TOKEN_' + DEFAULT_APP

const Login = 'MARS_LOGIN_' + DEFAULT_APP

const Work = 'MARS_WORKED'

export function getToken() {
  return Cookies.get(Token)
}

export function setToken(token) {
  return Cookies.set(Token, token)
}

export function removeToken() {
  return Cookies.remove(Token)
}

export function setLogin(login) {
  return Cookies.set(Login, login, {expires: 7})
}

export function getLogin() {
  return Cookies.get(Login)
}

export function removeLogin() {
  return Cookies.remove(Login)
}

export function setWork(work) {
  return Cookies.set(Work, work)
}

export function getWork() {
  return Cookies.get(Work)
}

export function removeWork() {
  return Cookies.remove(Work)
}

export function clearAuth() {
  removeToken()
  removeLogin()
  removeWork()
}
