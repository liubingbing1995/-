import lazyLoad from './lazyLoad'
import Layout from /* webpackChunkName: 'layout'*/ '@/views/layout/Layout'
import {getCustomRouterMap, getModuleUri} from '@/router'
import {isEmpty} from '@/utils/index'
import {getUUID} from '@/utils/encrypt'
import {getCache, hasCache} from '@/utils/cached'

const customRouterMap = getCustomRouterMap()

// 重组菜单结构
export function rebuildMenus(list) {
  const Menus = []
  list = list.sort(compare('seqNo'))
  const parentIdMap = getParentIds(list)
  for (const item of list) {
    if (item.menuUri === '.') {
      item.menuUri = getUUID()
    }
    const menu = {}
    if (item.depth === 1) {
      menu.path = '/' + item.menuUri
      menu.component = Layout
      menu.hidden = false
      menu.children = []
      if (parentIdMap.get(item.id) !== undefined) {
        menu.name = item.menuUri
        menu.children = (matchChildrens(list, menu.children, 2, item.id, parentIdMap, item.menuUri, menu.name))
        if (menu.children.length > 0) {
          menu.redirect = menu.children[0].path
        }
        menu.meta = {
          title: item.displayText,
          icon: isEmpty(item.iconUri) ? 'example' : item.iconUri,
          depth: item.depth
        }
      } else {
        menu.redirect = 'noredirect'
        const children = {}
        children.path = 'index'
        children.name = item.menuUri
        children.component = lazyLoad(getModuleUri(item.menuUri))
        children.meta = {
          title: item.displayText,
          icon: isEmpty(item.iconUri) ? 'example' : item.iconUri,
          depth: item.depth
        }
        menu.children.push(children)
      }
      // 处理自定义二级及以下菜单
      const customMenu = customRouterMap.get(item.menuUri)
      if (customMenu) {
        menu.children = menu.children.concat(customMenu)
      }
      Menus.push(menu)
    }
  }
  handleCopyOceanRouter(Menus)
  handleOceanRouter(Menus)
  handleAirRouter(Menus)
  handleObOceanRouter(Menus)
  handleObAirRouter(Menus)
  handleObRailWayRouter(Menus)
  handleObShipAgencyRouter(Menus)
  // handleObLandRouter(Menus)
  return Menus
}

export function matchChildrens(list, childrens, depth, parentId, parentIdMap, parentFullPath, parentName) {
  for (const item of list) {
    if (item.menuUri === '.') {
      item.menuUri = getUUID()
    }
    const menu = {}
    if (item.depth === depth && item.parentId === parentId) {
      menu.name = item.menuUri
      menu.path = menu.name
      menu.component = lazyLoad(getModuleUri(item.menuUri))
      menu.hidden = false
      menu.meta = {
        title: item.displayText,
        icon: isEmpty(item.iconUri) ? 'example' : item.iconUri,
        depth: item.depth,
        parentName: parentName
      }
      menu.children = []
      if (!isEmpty(parentIdMap.get(item.id))) {
        parentIdMap.set(item.id, '')
        menu.children = matchChildrens(list, menu.children, depth + 1, item.id, parentIdMap, parentFullPath + '/' + item.menuUri, menu.name)
      }
      // 处理自定义二级及以下菜单
      const customMenu = customRouterMap.get(item.menuUri)
      if (customMenu) {
        menu.children = menu.children.concat(customMenu)
      }
      childrens.push(menu)
    }
  }
  return childrens
}

export function unMatchUnitRouteName(routes, name) {
  if (isEmpty(routes) || routes.length === 0 || isEmpty(name)) {
    return true
  }
  for (const route of routes) {
    if (route.name === name) {
      return false
    } else {
      const unMatch = unMatchUnitRouteName(route.children, name)
      if (!unMatch) {
        return false
      }
    }
  }
  return true
}

// 菜单排序
function compare(property) {
  return function (a, b) {
    const value1 = a[property]
    const value2 = b[property]
    return value1 - value2
  }
}

// 获取有子菜单的菜单id
function getParentIds(list) {
  const map = new Map()
  for (const item of list) {
    map.set(item.parentId, item.parentId)
  }
  return map
}

// 处理海运工作单路由
function handleOceanRouter(list) {
  if (hasCache('OC_JOB_OPT')) {
    const oceanMap = new Map(getCache('OC_JOB_OPT', true, true))
    oceanMap.forEach(function (value) {
      value.menu.children[0].component = lazyLoad(value.componentUrl)
      value.menu.component = Layout
      list.push(value.menu)
    })
  }
}

// 处理备份海运工作单路由
function handleCopyOceanRouter(list) {
  if (hasCache('OC_JOB_OPT1')) {
    const oceanMap = new Map(getCache('OC_JOB_OPT1', true, true))
    oceanMap.forEach(function (value) {
      value.menu.children[0].component = lazyLoad(value.componentUrl)
      value.menu.component = Layout
      list.push(value.menu)
    })
  }
}

// 处理空运工作单路由
function handleAirRouter(list) {
  if (hasCache('AIR_JOB_OPT')) {
    const airMap = new Map(getCache('AIR_JOB_OPT', true, true))
    airMap.forEach(function (value) {
      value.menu.children[0].component = lazyLoad(value.componentUrl)
      value.menu.component = Layout
      list.push(value.menu)
    })
  }
}

// 处理其它海运工作单路由
function handleObOceanRouter(list) {
  if (hasCache('OB_OC_OPT')) {
    const obOcMap = new Map(getCache('OB_OC_OPT', true, true))
    obOcMap.forEach(function (value) {
      value.menu.children[0].component = lazyLoad(value.componentUrl)
      value.menu.component = Layout
      list.push(value.menu)
    })
  }
}

// 处理其它铁路运输
function handleObRailWayRouter(list) {
  if (hasCache('OB_RAILWAY_OPT')) {
    const obShipMap = new Map(getCache('OB_RAILWAY_OPT', true, true))
    obShipMap.forEach(function (value) {
      value.menu.children[0].component = lazyLoad(value.componentUrl)
      value.menu.component = Layout
      list.push(value.menu)
    })
  }
}

// 处理空运其他工作单路由
function handleObAirRouter(list) {
  if (hasCache('OB_AIR_OPT')) {
    const obAirMap = new Map(getCache('OB_AIR_OPT', true, true))
    obAirMap.forEach(function (value) {
      value.menu.children[0].component = lazyLoad(value.componentUrl)
      value.menu.component = Layout
      list.push(value.menu)
    })
  }
}

// 处理船代业务工作单路由
function handleObShipAgencyRouter(list) {
  if (hasCache('SHIP_AGENCY_OPT')) {
    const obShipMap = new Map(getCache('SHIP_AGENCY_OPT', true, true))
    obShipMap.forEach(function (value) {
      value.menu.children[0].component = lazyLoad(value.componentUrl)
      value.menu.component = Layout
      list.push(value.menu)
    })
  }
}

// // 处理其它散货工作单路由
// function handleObLandRouter(list) {
//   if (hasCache('OB_LAND_OPT')) {
//     const obBulkMap = new Map(getCache('OB_LAND_OPT', true, true))
//     obBulkMap.forEach(function(value) {
//       value.menu.children[0].component = lazyLoad(value.componentUrl)
//       value.menu.component = Layout
//       list.push(value.menu)
//     })
//   }
// }
