/**
 * change by leehl on 12/06/18.
 */
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

/**
 * 格式化日期
 * @param {Date} time 时间
 * @param {String} cFormat 格式
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
    M: date.getMilliseconds()
  }
  return format.replace(/{([ymdhisaM])+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
}

/**
 * 格式化时间
 * @param {Date} time 时间
 * @param {String} cFormat 格式
 */
export function formatTime(time, cFormat) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()
  const diff = (now - d) / 1000
  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (cFormat) {
    return parseTime(time, cFormat)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @author leehl
 * @date 2020-02-26 13:02
 * @param numb 数字
 * @param cFormat 分割符
 **/
export function transNumbToDt(numb, cFormat) {
  const time = new Date()
  time.setFullYear(1900)
  time.setMonth(0)
  time.setDate(numb - 1)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1
  const date = time.getDate()

  if (cFormat && cFormat.length === 1) {
    return year + cFormat + (month < 10 ? '0' + month : month) + cFormat + (date < 10 ? '0' + date : date)
  }
  return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
}

/** 是否是闰年
 * @author leehl
 * @date 2020-03-17 10:42
 * @param year 年份
 * @return
 **/
export function leapYear(year) {
  return !(year % (year % 100 ? 4 : 400))
}

/** 格式化时间
 * @author leehl
 * @date 2019-08-26 10:58
 * @param {String} 日期字符串
 */
export function formatDate(dataStr) {
  return isEmpty(dataStr) ? dataStr : dataStr.replace('T', ' ')
}

/** 判断空值
 * @author leehl
 * @date 2019-08-26 11:05
 * @param val
 * @return
 */
export function isEmpty(val) {
  return val === null || val === '' || val === undefined
}

/** 深度克隆对象
 * @author leehl
 * @date 2019-08-26 11:04
 * @param {Object} source 源数据
 */
export function deepClone(source) {
  if (isEmpty(source)) {
    return null
  }
  if (!source && typeof source !== 'object') {
    // noinspection JSCheckFunctionSignatures
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {}
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/** 保存文件
 * @author leehl
 * @date 2019-08-26 11:02
 * @param {Blob} data 二进制流
 * @param {String} fileName 保存的文件名
 */
export function saveFile(data, fileName) {
  if (!data) {
    return
  }
  /*const url = window.URL.createObjectURL(new Blob([data]))
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  link.remove()*/
  // window.URL.revokeObjectURL(link.href)
  // document.body.removeChild(link)
  const file = new File([data], fileName)
  FileSaver.saveAs(file)
}

/** 复写样式 0、class 1、id
 * @author leehl
 * @date 2019-08-26 11:05
 */
export function overrideCss(type, node, allCss, tag) {
  if (isEmpty(allCss)) {
    return
  }
  const parent = (type === 0) ? document.getElementsByClassName(node)[0] : document.getElementById(node)
  if (!isEmpty(tag)) {
    const childs = parent.getElementsByTagName(tag)
    for (const child of childs) {
      child.style.cssText = allCss
    }
  } else {
    parent.style.cssText = allCss
  }
}

/**
 * 判断此对象是否是Object类型
 * @param {Object} obj
 */
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 判断此类型是否是Array类型
 * @param {Object} arr
 */
function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 *  深度比较两个对象是否相同
 * @param {Object} target
 * @param {Object} resource
 * @param {Array} excludeFields
 */
export function equalsObj(target, resource, excludeFields) {
  if (isEmpty(target)) {
    return isEmpty(resource)
  }
  if (excludeFields === undefined || excludeFields === null) {
    excludeFields = ['createdBy', 'createdDt', 'modifiedBy', 'modifiedDt']
  }
  //       类型为基本类型时,如果相同,则返回true
  if (target === resource) return true
  if (isObject(target) && isObject(resource) && Object.keys(target).length === Object.keys(resource).length) {
    //      类型为对象并且元素个数相同

    //      遍历所有对象中所有属性,判断元素是否相同
    for (const key in target) {
      if (target.hasOwnProperty(key) && excludeFields.indexOf(key) === -1) {
        // noinspection JSCheckFunctionSignatures
        if (!equalsObj(target[key], resource[key])) {
          //      对象中具有不相同属性 返回false
          return false
        }
      }
    }
  } else if (isArray(target) && isArray(target) && target.length === resource.length) {
    //      类型为数组并且数组长度相同
    for (let i = 0, length = target.length; i < length; i++) {
      // noinspection JSCheckFunctionSignatures
      if (!equalsObj(target[i], resource[i])) {
        //      如果数组元素中具有不相同元素,返回false
        return false
      }
    }
  } else {
    // 其它类型,均返回false
    return false
  }
  // 走到这里,说明数组或者对象中所有元素都相同,返回true
  return true
}

/** 校验输入正负数， 保留指定位小数 传来的需要是string类型，默认两位
 * @param {String} value
 * @param {Number} num
 */
export function fixedNumber(value, num) {
  // 防止删除为空 一些错误金额输入的判断
  if (isEmpty(value)) {
    return ''
  }
  value = value.toString()
  const reg = new RegExp('/\b(0+){' + num + ',}/g')
  const reg2 = new RegExp('/\\-{' + num + ',}/g')
  const reg3 = new RegExp('/\\.{' + num + ',}/g')
  let newValue
  if (!(/[^0-9.-]/g.test(value))) {
    newValue = value.replace(/[^\-\d.]/g, '').replace(reg, '0').replace(reg2, '-').replace(/^\./g, '').replace(reg3, '.').replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    if (newValue.toString().indexOf('.') > 0 && Number(newValue.toString().split('.')[1].length) > num) {
      newValue = parseInt(parseFloat(newValue) * 100) / 100
    }
    if ((newValue.toString().split('-').length - 1) > 1) {
      newValue = parseFloat(newValue) || ''
    }
    if ((newValue.toString().split('-').length) > 1 && newValue.toString().split('-')[0].length > 0) {
      newValue = parseFloat(newValue) || ''
    }
    if (newValue.toString().length > 1 && (newValue.toString().charAt(0) === '0' || (newValue.toString().length > num && newValue.toString().charAt(0) === '-' && newValue.toString().charAt(1) === '0' && newValue.toString().charAt(num) !== '.')) && newValue.toString().indexOf('.') < 1) {
      newValue = parseFloat(newValue) || ''
    }
    // 判断整数位最多为9位
    if (newValue.toString().indexOf('.') > 0 && Number(newValue.toString().split('.')[0].length) > 9) {
      newValue = newValue.toString().substring(0, 9) + '.' + newValue.toString().split('.')[1]
    } else if (newValue.toString().indexOf('.') < 0 && Number(newValue.toString().split('.')[0].length) > 9) {
      newValue = newValue.toString().substring(0, 9)
    }
  } else {
    newValue = value.replace(/[^0-9.-]/g, '')
  }
  return parseFloat(newValue).toFixed(num)
}

/** 转大写金额
 * @author leehl
 * @date 2019-08-26 11:01
 * @param {Number} num
 * @return
 */
export function transMoney(num) {
  const fraction = ['角', '分']
  const digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ]
  const unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  const head = num < 0 ? '欠' : ''
  num = Math.abs(num)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  num = Math.floor(num)
  for (let i = 0; i < unit[0].length && num > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && num > 0; j++) {
      p = digit[num % 10] + unit[1][j] + p
      num = Math.floor(num / 10)
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
}

/** 模拟事件
 * @author leehl
 * @date 2019/12/11 19:58
 * @param el dom元素
 * @param evtType 事件类型
 * @param keyCode 按键代码
 * @return
 **/
export function fireKeyEvent(el, evtType, keyCode) {
  const doc = el.ownerDocument
  const win = doc.defaultView || doc.parentWindow
  let evtObj
  if (doc.createEvent) {
    if (win.KeyEvent) {
      evtObj = doc.createEvent('KeyEvents')
      evtObj.initKeyEvent(evtType, true, true, win, false, false, false, false, keyCode, 0)
    } else {
      evtObj = doc.createEvent('UIEvents')
      Object.defineProperty(evtObj, 'keyCode', {
        get: function () {
          return this.keyCodeVal
        }
      })
      Object.defineProperty(evtObj, 'which', {
        get: function () {
          return this.keyCodeVal
        }
      })
      evtObj.initUIEvent(evtType, true, true, win, 1)
      evtObj.keyCodeVal = keyCode
      if (evtObj.keyCode !== keyCode) {
        console.log('keyCode ' + evtObj.keyCode + ' 和 (' + evtObj.which + ') 不匹配')
      }
    }
    el.dispatchEvent(evtObj)
  } else if (doc.createEventObject) {
    evtObj = doc.createEventObject()
    evtObj.keyCode = keyCode
    el.fireEvent('on' + evtType, evtObj)
  }
}

/** 元素隐藏
 * @author leehl
 * @date 2019/12/11 20:28
 * @param className 样式名称
 * @return
 **/
export function hiddenDom(className) {
  setTimeout(() => {
    const doms = document.getElementsByClassName(className)
    if (!isEmpty(doms) && doms.length > 0) {
      for (const dom of doms) {
        dom.style.display = 'none'
      }
    }
  }, 100)
}

/**
 *  防抖函数
 * @param func
 * @param wait 等待时间
 * @param options 参数
 * @returns {function(): *}
 * @author leehl
 */
export function debounce(func, wait, options) {
  let lastArgs // debounced 被调用后被赋值,表示至少调用 debounced一次
  let lastThis // 保存 this
  let maxWait // 最大等待时间
  let result // return 的结果，可能一直为 undefined，没看到特别的作用
  let timerId // 定时器句柄
  let lastCallTime // 上一次调用 debounced 的时间，按上面例子可以理解为 上一次触发 scroll 的时间
  let lastInvokeTime = 0 // 上一次执行 func 的时间，按上面例子可以理解为 上次 执行 时的时间
  let leading = false // 是否第一次触发时立即执行
  let maxing = false // 是否有最长等待时间
  let trailing = true // 是否在等待周期结束后执行用户传入的函数

  if (typeof func !== 'function') {
    // 这个很好理解，如果传入的 func 不是函数，抛出错误，老子干不了这样的活
    throw new TypeError('Expected a function')
  }

  wait = typeof value === 'number' ? wait : 0
  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(typeof options.maxWait === 'number' ? options.maxWait : 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  //  执行 用户传入的 func
  //  重置 lastArgs，lastThis
  //  lastInvokeTime 在此时被赋值，记录上一次调用 func的时间
  function invokeFunc(time) {
    const args = lastArgs
    const thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  //  防抖开始时执行的操作
  //  lastInvokeTime 在此时被赋值，记录上一次调用 func的时间
  //  设置了立即执行func，则执行func， 否则设置定时器
  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  //  计算还需要等待多久
  //  没设置最大等待时间，结果为 wait - (当前时间 - 上一次触发(scroll) )  时间，也就是  wait - 已经等候时间
  //  设置了最长等待时间，结果为 最长等待时间 和 按照wait 计算还需要等待时间 的最小值
  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime
    const timeWaiting = wait - timeSinceLastCall

    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting
  }

  // 此时是否应该设置定时器/执行用户传入的函数，有四种情况应该执行
  // 1, 第一次触发(scroll)
  // 2. 距离上次触发超过 wait, 参考上面例子中 1.5 秒触发一次，在3s触发的情况
  // 3.当前时间小于 上次触发时间，大概是系统时间被人为往后拨了，本来2018年，系统时间变为 2017年了，嘎嘎嘎
  // 4. 设置了最长等待时间，并且等待时长不小于 最长等待时间了~ 参考上面例子，如果maxWait 为2s, 则在 2s scroll 时会执行
  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime
    const timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
  }

  // 执行函数呢 还是继续设置定时器呢？ 防抖的核心
  // 时间满足条件，执行
  // 否则 重新设置定时器
  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time))
  }

  // 执行用户传入的 func 之前的最后一道屏障  func os: 执行我一次能咋地，这么多屏障？
  // 重置 定时器
  // 执行 func
  // 重置 lastArgs = lastThis 为 undefined
  function trailingEdge(time) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  // 取消防抖
  //  重置所有变量  清除定时器
  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  // 定时器已存在，去执行 嗯，我就是这么强势
  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  //  正房来了！ 这是入口函数，在这里运筹帷幄，根据敌情调配各个函数，势必骗过用户那个傻子，我没有一直在执行但你以为我一直在响应你哦
  function debounced() {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = arguments
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId)
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait)
    }
    return result
  }

  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}

/**
 *  节流函数
 * @param func
 * @param wait 等待时间
 * @param options 参数
 * @returns {function(): *}
 * @author leehl
 */
export function throttle(func, wait, options) {
  let leading = true
  let trailing = true

  if (typeof func !== 'function') {
    // 这个很好理解，如果传入的 func 不是函数，抛出错误，老子干不了这样的活
    throw new TypeError('Expected a function')
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  })
}

/**
 *
 * @param dataurl
 * @returns {Blob}
 * @author leehl
 */
export function dataURLtoBlob(dataurl) {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], {type: mime})
}

/**
 * blob 转 base64
 * @param blob 二进制流对象
 * @param callback 回调函数
 * @author leehl
 */
export function blobToDataURI(blob, callback) {
  const a = new FileReader()
  a.onload = function (e) {
    callback(e.target.result)
  }
  a.readAsDataURL(blob)
}

/**
 * 图片 转 base64
 * @param img 图片对象
 * @param ext 文件拓展
 * @author leehl
 */
export function imageToBase64(img, ext) {
  if (isEmpty(ext)) {
    ext = 'jpeg'
  }
  let canvas = document.createElement('canvas')//创建canvas DOM元素，并设置其宽高和图片一样
  canvas.width = img.width
  canvas.height = img.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height) //使用画布画图
  const dataURL = canvas.toDataURL('image/' + ext) //返回的是一串Base64编码的URL并指定格式
  canvas = null //释放
  return dataURL
}

/**
 *  字符转unicode编码
 * @param str
 * @returns {string}
 * @author leehl
 */
export function encodeUnicode(str) {
  const res = []
  for (let i = 0; i < str.length; i++) {
    res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4)
  }
  return '\\u;' + res.join('\\u')
}

/**
 *  unicode编码转字符
 * @param str
 * @returns {string}
 * @author leehl
 */
export function decodeUnicode(str) {
  str = str.replace(/\\/g, '%')
  return unescape(str)
}

/**
 *  匹配除半角数字、大小英文即相关符号
 * @param str
 * @returns {string|null}
 * @author leehl
 */
export function matchBillSpVal(str) {
  if (isEmpty(str)) {
    return null
  }
  const matchChars = []
  const reg = /^[\u0020-\u007e]+$/
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i)
    if (!reg.test(char)) {
      matchChars.push(char)
    }
  }
  return matchChars.join(',')
}

/** table转excel
 * @author leehl
 * @date 2020-04-02 15:08
 * @param id table id
 * @param fileName 保存文件名
 * @param options 工作簿参数
 * @return
 **/
export function table2Excel(id, fileName, options) {
  // 获取配置信息
  const defaultOptions = {
    defaultStyle: true,
    autoWidth: false,
    bookType: 'xlsx',
    type: 'binary',
    sheetName: 'Sheet1',
    raw: true,
    cellStyles: [],
    headerStyles: [],
    excludeRows: [],
    excludeCols: [],
    checkBoxRows: [],
    headerRowNum: 1,
    exportFields: [],
    exportDatas: []
  }
  options = Object.assign(defaultOptions, options)
  // 获取table dom对象
  const orgTable = document.querySelector('#' + id)
  const table = orgTable.cloneNode(true)
  const fixedDoms = table.querySelectorAll('.el-table__fixed')
  if (fixedDoms.length > 0) {
    for (const item of fixedDoms) {
      table.removeChild(item)
    }
  }
  // 踢除排除列
  if (options.excludeCols.length > 0) {
    const trDoms = table.querySelectorAll('tr,colgroup')
    for (const item of options.excludeCols) {
      for (const tr of trDoms) {
        const tdDoms = tr.querySelectorAll('td,th,col')
        if (tdDoms.length >= item) {
          tr.removeChild(tdDoms[item])
        }
      }
    }
  }
  // 剔除排除行
  if (options.excludeRows.length > 0) {
    const tbodyDom = table.querySelector('.el-table__body-wrapper').querySelector('tbody')
    const trDoms = tbodyDom.querySelectorAll('tr')
    const trDmoNums = trDoms.length
    for (const item of options.excludeRows) {
      if (trDmoNums >= item) {
        tbodyDom.removeChild(trDoms[item])
      }
    }
  }
  const tbodyDom = table.querySelector('.el-table__body-wrapper').querySelector('tbody')
  /* 插入指定导出数据 */
  if (options.exportDatas.length > 0) {
    tbodyDom.innerHTML = ''
    if (options.exportFields.length > 0) {
      for (const item of options.exportDatas) {
        const row = tbodyDom.insertRow(-1)
        for (const val of options.exportFields) {
          row.insertCell(-1).innerHTML = item[val]
        }
      }
    } else {
      for (const item of options.exportDatas) {
        const row = tbodyDom.insertRow(-1)
        for (const val in item) {
          row.insertCell(-1).innerHTML = item[val]
        }
      }
    }
  }
  // 处理checkBox
  const trDoms = tbodyDom.querySelectorAll('tr')
  for (const tr of trDoms) {
    const tdDoms = tr.querySelectorAll('td')
    for (const td of tdDoms) {
      const checkBox = td.querySelector('.el-checkbox')
      if (checkBox) {
        let val = checkBox.getAttribute('aria-checked')
        if (val) {
          val = '是'
        } else {
          val = '否'
        }
        td.innerHTML = val
      }
    }
  }
  /* 从表生成工作簿对象 */
  const wb = XLSX.utils.table_to_book(table, options)
  // 得到单元格对象
  const ws = wb.Sheets[options.sheetName]
  if (options.defaultStyle) {
    // 列宽数据
    const cols = table.querySelector('colgroup').querySelectorAll('col')
    const colWidths = []
    for (const item of cols) {
      colWidths.push({wpx: parseInt(item.width)})
    }
    ws['!cols'] = colWidths
    // 单元格样式
    const styleBase = {
      font: {
        sz: 12,
        color: {
          rgb: '00000000'
        }
      },
      border: {
        top: {style: 'thin'},
        bottom: {style: 'thin'},
        left: {style: 'thin'},
        right: {style: 'thin'}
      }
    }
    const styleCenter = Object.assign({}, styleBase, {
      alignment: {
        vertical: 'center',
        horizontal: 'center'
      }
    })
    const styleLeft = Object.assign({}, styleBase, {
      alignment: {
        vertical: 'center',
        horizontal: 'left'
      }
    })
    const styleBold = Object.assign({}, styleCenter, {
      font: {
        sz: 12,
        bold: true,
        color: {
          rgb: '00000000'
        }
      },
      fill: {
        bgColor: {
          indexed: 64
        },
        fgColor: {
          rgb: 'CADDF7'
        }
      }
    })
    for (const item in ws) {
      if (ws.hasOwnProperty(item) && !item.includes('!')) {
        if (!isNaN(Number(ws[item].v)) && ws[item].v) {
          ws[item].t = 'n'
        } else {
          ws[item].t = 's'
        }
        if (parseInt(item.replace(/[^0-9]/ig, '')) <= options.headerRowNum) {
          ws[item].s = styleBold
        } else {
          ws[item].s = styleLeft
        }
      }
    }
  } else if (options.autoWidth) {
    const colWidths = []
    for (const item in ws) {
      if (ws.hasOwnProperty(item) && !item.includes('!')) {
        if (isEmpty(ws[item].v)) {
          colWidths.push(10)
        } else if (ws[item].v.toString().charCodeAt(0) > 255) {
          colWidths.push(ws[item].v.toString().length * 2)
        } else {
          colWidths.push(ws[item].v.toString().length)
        }
      }
    }
    const colNums = options.exportDatas[0].length
    const widthLen = colWidths.length
    const combinationNums = widthLen / colNums
    const mergeWidths = []
    for (let i = 0; i < colNums; i++) {
      let colWidth = colWidths[i]
      for (let j = 1; j < combinationNums; j++) {
        const index = i + j * colNums
        colWidth = Math.max(colWidth, colWidths[index])
      }
      mergeWidths.push({wpx: colWidth * 10})
    }
    ws['!cols'] = mergeWidths
  }
  if (options.headerRowNum > 1) {
    // !merges
    const arr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    ws['!merges'].forEach(item => {
      const startRowNumber = Number(item.s.c)
      const endRowNumber = Number(item.e.c)
      for (let i = startRowNumber + 1; i <= endRowNumber; i++) {
        ws[arr[i] + (Number(item.e.r) + 1)] = {
          s: {
            border: {
              top: {style: 'thin'},
              left: {style: 'thin'},
              bottom: {style: 'thin'},
              right: {style: 'thin'}
            }
          }
        }
      }
      const startColNumber = Number(item.s.r)
      const endColNumber = Number(item.e.r)
      for (let i = startColNumber + 1; i <= endColNumber + 1; i++) {
        if (ws[arr[Number(item.e.c)] + i] !== undefined) {
          ws[arr[Number(item.e.c)] + i].s.border = {
            top: {style: 'thin'},
            left: {style: 'thin'},
            bottom: {style: 'thin'},
            right: {style: 'thin'}
          }
          ws[arr[Number(item.e.c)] + i].s.numFmt = 0.00
        } else {
          ws[arr[Number(item.e.c)] + i] = {
            s: {
              border: {
                top: {style: 'thin'},
                left: {style: 'thin'},
                bottom: {style: 'thin'},
                right: {style: 'thin'}
              }
            }
          }
        }
      }
    })
  }
  /* 获取二进制字符串作为输出 */
  const wbout = window.xlsxStyle.write(wb, options)
  try {
    // Blob 对象表示一个不可变、原始数据的类文件对象。
    // Blob 表示的不一定是JavaScript原生格式的数据。
    // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
    // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
    FileSaver.saveAs(new Blob([window.XSU.s2ab(wbout)], {type: 'application/octet-stream'}), fileName + '.xlsx')
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.log(e, wbout)
    }
  }
  return wbout
}

/** 数组转excel
 * @author leehl
 * @date 2020-04-02 15:08
 * @param id table id
 * @param fileName 保存文件名
 * @param options 工作簿参数
 * @return
 **/
export function array2Excel(fileName, options) {
  // 获取配置信息
  const defaultOptions = {
    defaultStyle: true,
    autoWidth: true,
    bookType: 'xlsx',
    type: 'binary',
    sheetName: 'Sheet1',
    raw: true,
    headerRowNum: 1,
    colWidths: [],
    exportDatas: []
  }

  options = Object.assign(defaultOptions, options)
  const ws = XLSX.utils.aoa_to_sheet(options.exportDatas)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, options.sheetName)
  // 得到单元格对象
  if (options.defaultStyle) {
    // 单元格样式
    const styleBase = {
      font: {
        sz: 12,
        color: {
          rgb: '00000000'
        }
      },
      border: {
        top: {style: 'thin'},
        bottom: {style: 'thin'},
        left: {style: 'thin'},
        right: {style: 'thin'}
      }
    }
    const styleCenter = Object.assign({}, styleBase, {
      alignment: {
        vertical: 'center',
        horizontal: 'center'
      }
    })
    const styleLeft = Object.assign({}, styleBase, {
      alignment: {
        vertical: 'center',
        horizontal: 'left'
      }
    })
    const styleBold = Object.assign({}, styleCenter, {
      font: {
        sz: 12,
        bold: true,
        color: {
          rgb: '00000000'
        }
      },
      fill: {
        bgColor: {
          indexed: 64
        },
        fgColor: {
          rgb: 'CADDF7'
        }
      }
    })
    for (const item in ws) {
      if (ws.hasOwnProperty(item) && !item.includes('!')) {
        if (parseInt(item.replace(/[^0-9]/ig, '')) <= options.headerRowNum) {
          ws[item].s = styleBold
        } else {
          ws[item].s = styleLeft
        }
      }
    }
  }
  if (options.autoWidth) {
    const colWidths = []
    for (const item in ws) {
      if (ws.hasOwnProperty(item) && !item.includes('!')) {
        if (isEmpty(ws[item].v)) {
          colWidths.push(10)
        } else if (ws[item].v.toString().charCodeAt(0) > 255) {
          colWidths.push(ws[item].v.toString().length * 2)
        } else {
          colWidths.push(ws[item].v.toString().length)
        }
      }
    }
    const colNums = options.exportDatas[0].length
    const widthLen = colWidths.length
    const combinationNums = widthLen / colNums
    const mergeWidths = []
    for (let i = 0; i < colNums; i++) {
      let colWidth = colWidths[i]
      for (let j = 1; j < combinationNums; j++) {
        const index = i + j * colNums
        colWidth = Math.max(colWidth, colWidths[index])
      }
      mergeWidths.push({wpx: colWidth * 10})
    }
    ws['!cols'] = mergeWidths
  } else if (!isEmpty(options.colWidths) && options.colWidths.length > 0) {
    ws['!cols'] = options.colWidths
  }
  /* 获取二进制字符串作为输出 */
  const wbout = window.xlsxStyle.write(wb, options)
  try {
    // Blob 对象表示一个不可变、原始数据的类文件对象。
    // Blob 表示的不一定是JavaScript原生格式的数据。
    // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
    // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
    FileSaver.saveAs(new Blob([window.XSU.s2ab(wbout)], {type: 'application/octet-stream'}), fileName + '.xlsx')
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.log(e, wbout)
    }
  }
  return wbout
}

/** 数组转excel
 * @author leehl
 * @date 2020-04-02 15:08
 * @param id table id
 * @param fileName 保存文件名
 * @param options 工作簿参数
 * @param columns 列信息
 * @return
 **/
export function vmTable2Excel(fileName, options, columns) {
  const exportDatas = []
  const exportHeaders = []
  const colWidths = []
  if (!isEmpty(options.headerFirstCol)) {
    exportDatas.push(options.headerFirstCol)
    exportDatas.push(options.headerSecondCol)
  } else {
    for (const col of columns) {
      exportHeaders.push(col.label)
    }
    exportDatas.push(exportHeaders)
  }
  for (const col of columns) {
    if (isEmpty(col.realWidth)) {
      colWidths.push({wpx: col.width})
    } else {
      colWidths.push({wpx: col.realWidth})
    }
  }
  for (const data of options.exportDatas) {
    const exportData = []
    for (const col of columns) {
      const val = data[col.property]
      if (isEmpty(val)) {
        exportData.push('')
      } else {
        exportData.push(val)
      }
    }
    exportDatas.push(exportData)
  }
  options.exportDatas = exportDatas
  options.colWidths = colWidths
  options.autoWidth = false
  return array2Excel(fileName, options)
}

/** html转图片
 * @author leehl
 * @date 2020-04-02 15:11
 * @param id html id
 * @param fileName 保存文件名
 * @return
 **/
export function html2image(id, fileName) {
  const canvas = document.getElementById(id)
  canvas.toBlob(function (blob) {
    FileSaver.saveAs(blob, fileName)
  })
}

/** html转图片
 * @author leehl
 * @date 2020-04-02 15:20
 * @param url url路径
 * @param fileName 保存文件名
 * @return
 **/
export function saveUrlFile(url, fileName) {
  FileSaver.saveAs(url, fileName)
}

/** 获取样式
 * @author leehl
 * @date 2020-04-27 9:42
 * @param obj
 * @param attr
 * @return
 **/
export function getStyle(obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr]
  } else {
    return document.defaultView.getComputedStyle(obj, null)[attr]
  }
}

/** 获取样式
 * @author leehl
 * @date 2020-04-27 9:42
 * @param obj
 * @return
 **/
export function getStyles(obj) {
  if (obj.currentStyle) {
    return obj.currentStyle
  } else {
    return document.defaultView.getComputedStyle(obj, null)
  }
}

/** rgb转16进制
 * @author leehl
 * @date 2020-04-27 11:17
 * @param color
 * @return
 **/
export function colorRGBtoHex(color) {
  const rgb = color.split(',')
  const r = parseInt(rgb[0].split('(')[1])
  const g = parseInt(rgb[1])
  const b = parseInt(rgb[2].split(')')[0])
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

/** table行定位
 * @author leehl
 * @date 2020-07-14 17:05
 * @param that 当前vue实例
 * @param refTableId table ref值及id值(一致且建议全局唯一)
 * @param key 匹配字段
 * @param val 匹配字段值
 * @param highLight 是否高亮定位行
 * @param currentIndex 当前行下标
 * @param pre 向前定位（默认向后定位）
 * @return
 **/
export function tableLocation(that, refTableId, key, val, highLight, currentIndex, pre) {
  //使用refs获取到整个表格对象
  const table = that.$refs[refTableId]
  if (isEmpty(table)) {
    return
  }
  //拿到表格的data数据
  const tableData = table.data
  if (isEmpty(tableData)) {
    return
  }
  // 遍历这个数组
  let locationIndex = -1
  if (!currentIndex) {
    currentIndex = -1
  }
  const dataLen = tableData.length
  if (pre && currentIndex) {
    for (let i = dataLen - 1; i > -1; i--) {
      //判断对象中是否存在"userNameId"这个属性
      if (tableData[i].hasOwnProperty(key)) {
        //获取到存在key这个属性的对象下标
        const locationIndexTemp = tableData.map(item => item[key]).indexOf(val)
        if (locationIndexTemp) {
          if (locationIndex < currentIndex) {
            locationIndex = locationIndexTemp
            break
          } else if (locationIndex === currentIndex) {
            locationIndex = locationIndexTemp
          }
        }
      }
    }
  } else {
    for (let i = 0; i < dataLen; i++) {
      //判断对象中是否存在"userNameId"这个属性
      if (tableData[i].hasOwnProperty(key)) {
        //获取到存在key这个属性的对象下标
        const locationIndexTemp = tableData.map(item => item[key]).indexOf(val)
        if (locationIndexTemp) {
          if (currentIndex) {
            if (locationIndex > currentIndex) {
              locationIndex = locationIndexTemp
              break
            } else if (locationIndex === currentIndex) {
              locationIndex = locationIndexTemp
            }
          }
        }
      }
    }
  }
  if (locationIndex === -1) {
    return
  }
  //获取到表格的节点,获取到表格的所有子节点
  const tableChildNodes = document.getElementById(refTableId).childNodes
  //拿到第3个表格内容结构的所有子节点  class = "el-table__body-wrapper is-scrolling-none"
  const tableChildNode3 = tableChildNodes[2].childNodes
  //在拿到所有子节点中的第一个
  const tableChildNode3ChildNo1 = tableChildNode3[0].childNodes
  //再拿到结构为<tboby></tboby>的节点
  const tbobyChildNo2 = tableChildNode3ChildNo1[1]
  //获取到结构为<tboby></tboby>的子节点
  const kk = tbobyChildNo2.childNodes
  //把遍历处出来有 "userNameId:666" 这个字段的下标赋值给当前表格行
  const kkll = kk[locationIndex]
  //给这行表格动态的添加一个id,实现背景颜色的突出显示
  const bg = refTableId + '_bg_' + locationIndex
  kkll.setAttribute('id', bg)
  if (highLight) {
    kkll.setAttribute('class', 'current-row')
  }
  //当点击"定位"按钮之后,实现屏幕滚动到这个id的位置,并且在屏幕的中间
  const element = document.getElementById(bg)
  element.scrollIntoView({block: 'center'})
}

/** 获取当前时间
 * @author lbb
 * @date 2020-08-10 9:42
 * @return
 **/
export function getTime() {
  const date = new Date()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  let hour = date.getHours()
  let min = date.getMinutes()

  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  if (hour >= 0 && hour <= 9) {
    hour = '0' + hour
  }
  if (min >= 0 && min <= 9) {
    min = '0' + min
  }
  const time = date.getFullYear() + '年' + month + '月' + strDate + '日' + ' ' + hour + ':' + min
  return time
}

/** 数组转excel
 * @author lbb
 * @date 2020-10-15 15:08
 * @param id table id
 * @param fileName 保存文件名
 * @param options 工作簿参数
 * @param columns 列信息
 * @return
 **/
export function vmTable2Excel1(fileName, options, columns) {
  const exportDatas = []
  const exportHeaders = []
  const colWidths = []
  if (!isEmpty(options.headerFirstCol)) {
    exportDatas.push(options.headerFirstCol)
    exportDatas.push(options.headerSecondCol)
  } else {
    for (const col of columns) {
      exportHeaders.push(col.label)
    }
    exportDatas.push(exportHeaders)
  }
  for (const col of columns) {
    if (isEmpty(col.realWidth)) {
      colWidths.push({wpx: col.width})
    } else {
      colWidths.push({wpx: col.realWidth})
    }
  }
  for (const data of options.exportDatas) {
    const exportData = []
    for (const col of columns) {
      const val = data[col.property]
      if (isEmpty(val)) {
        exportData.push('')
      } else {
        exportData.push(val)
      }
    }
    exportDatas.push(exportData)
  }
  options.exportDatas = exportDatas
  options.colWidths = colWidths
  options.autoWidth = false
  return array2Excel1(fileName, options)
}

/** 数组转excel
 * @author lbb
 * @date 2020-10-15 15:08
 * @param id table id
 * @param fileName 保存文件名
 * @param options 工作簿参数
 * @return
 **/
export function array2Excel1(fileName, options) {
  // 获取配置信息
  const defaultOptions = {
    defaultStyle: true,
    autoWidth: true,
    bookType: 'xlsx',
    type: 'binary',
    sheetName: 'Sheet1',
    raw: true,
    headerRowNum: 1,
    colWidths: [],
    exportDatas: [],
    exportDetails: []// 标题
  }
  options = Object.assign(defaultOptions, options)
  if (options.exportDetails.length > 0) {
    options.exportDatas = options.exportDetails.concat(options.exportDatas)
  }
  const ws = XLSX.utils.aoa_to_sheet(options.exportDatas)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, options.sheetName)
  // 得到单元格对象
  if (options.defaultStyle) {
    // 单元格样式
    const styleBase = {
      font: {
        sz: 12,
        color: {
          rgb: '00000000'
        }
      },
      border: {
        top: {style: 'thin'},
        bottom: {style: 'thin'},
        left: {style: 'thin'},
        right: {style: 'thin'}
      }
    }
    const styleCenter = Object.assign({}, styleBase, {
      alignment: {
        vertical: 'center',
        horizontal: 'center'
      }
    })
    const styleLeft = Object.assign({}, styleBase, {
      alignment: {
        vertical: 'center',
        horizontal: 'left'
      }
    })
    const styleBold = Object.assign({}, styleCenter, {
      font: {
        sz: 12,
        bold: true,
        color: {
          rgb: '00000000'
        }
      },
      fill: {
        bgColor: {
          indexed: 64
        },
        fgColor: {
          rgb: 'CADDF7'
        }
      }
    })
    const styleDetail = Object.assign({}, styleLeft, {
      font: {
        sz: 12,
        color: {
          rgb: '00000000'
        }
      },
      fill: {
        bgColor: {
          indexed: 64
        },
        fgColor: {
          rgb: 'CADDF7'
        }
      },
      border: {}
    })
    const styleTitle = Object.assign({}, styleCenter, {
      font: {
        sz: 24,
        name: '微软雅黑',
        color: {
          rgb: '00000000'
        }
      },
      fill: {
        bgColor: {
          indexed: 64
        },
        fgColor: {
          rgb: 'CADDF7'
        }
      },
      border: {}
    })
    for (const item in ws) {
      if (ws.hasOwnProperty(item) && !item.includes('!')) {
        if (parseInt(item.replace(/[^0-9]/ig, '')) <= options.headerRowNum) {
          if (parseInt(item.replace(/[^0-9]/ig, '')) === 1) {
            ws[item].s = styleTitle
          } else if (parseInt(item.replace(/[^0-9]/ig, '')) <= options.exportDetails.length) {
            ws[item].s = styleDetail
          } else {
            ws[item].s = styleBold
          }
        } else {
          ws[item].s = styleLeft
        }
      }
    }
  }
  if (options.autoWidth) {
    const colWidths = []
    for (const item in ws) {
      if (ws.hasOwnProperty(item) && !item.includes('!')) {
        if (isEmpty(ws[item].v)) {
          colWidths.push(10)
        } else if (ws[item].v.toString().charCodeAt(0) > 255) {
          colWidths.push(ws[item].v.toString().length * 2)
        } else {
          colWidths.push(ws[item].v.toString().length)
        }
      }
    }
    const colNums = options.exportDatas[0].length
    const widthLen = colWidths.length
    const combinationNums = widthLen / colNums
    const mergeWidths = []
    for (let i = 0; i < colNums; i++) {
      let colWidth = colWidths[i]
      for (let j = 1; j < combinationNums; j++) {
        const index = i + j * colNums
        colWidth = Math.max(colWidth, colWidths[index])
      }
      mergeWidths.push({wpx: colWidth * 10})
    }
    ws['!cols'] = mergeWidths
  } else if (!isEmpty(options.colWidths) && options.colWidths.length > 0) {
    ws['!cols'] = options.colWidths
  }
  //合并
  const merges = []
  if (options.exportDetails.length > 0) {
    for (let i = 0; i < options.exportDetails.length; i++) {
      merges.push({
        s: {c: 0, r: i},
        e: {c: options.exportDatas[options.exportDatas.length - 1].length - 1, r: i}
      })
    }
    ws['!merges'] = merges
  }
  /* 获取二进制字符串作为输出 */
  const wbout = window.xlsxStyle.write(wb, options)
  try {
    // Blob 对象表示一个不可变、原始数据的类文件对象。
    // Blob 表示的不一定是JavaScript原生格式的数据。
    // File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
    // 返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
    FileSaver.saveAs(new Blob([window.XSU.s2ab(wbout)], {type: 'application/octet-stream'}), fileName + '.xlsx')
  } catch (e) {
    if (typeof console !== 'undefined') {
      console.log(e, wbout)
    }
  }
  return wbout
}

/**
 * 获取uuid
 * @returns {string}
 */
export function uuid() {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'// bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  return s.join('')
}

/**
 * 重写toFixed
 * @returns {string}
 */
export function toFixedFun(number, precision) {
  if (isEmpty(number) || isNaN(number)) {
    number = 0
  }

  let str = number + ''
  if (str.indexOf('.') === -1) {
    str = number.toFixed(2)
  }
  const len = str.length
  const Mantissa = str.split('.')[1] + ''
  let last = str.substr(len - 1, len)
  if (Mantissa.length > 2 && last === '5') {
    last = '6'
    str = str.substr(0, len - 1) + last
    return Number((str - 0).toFixed(precision))
  } else {
    return Number(parseFloat(number).toFixed(precision))
  }
}

// table_fixed高度
export function reTableWrap(that) {
  if (that === undefined) {
    that = this
  }
  that.$nextTick(() => {
    const table = document.getElementsByClassName('app-main')[0].getElementsByClassName('el-table')[0]
    const elTableFixed = table.getElementsByClassName('el-table__fixed')[0]
    const elTableBodyWrapper = table.getElementsByClassName('el-table__body-wrapper')[0]
    const elTableFixedBodyWrapper = elTableFixed.lastElementChild
    elTableFixed.style.height = table.offsetHeight - 26 + 'px'
    elTableFixedBodyWrapper.style.height = elTableBodyWrapper.offsetHeight - 20 + 'px'
  })
}
