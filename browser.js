/**
 * @change  leehl
 * @create 2018-10-16 9:32
 * @desc ref:https://github.com/mumuy/browser
 **/

(function(root, factory) {
  const define = define
  if (typeof define === 'function' && (define.amd || define.cmd)) {
    // AMD&CMD
    define(factory)
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    root.Browser = factory()
  }
}(this, function() {
  const _window = this || {}
  const _navigator = typeof navigator !== 'undefined' ? navigator : {}
  const _mime = function(option, value) {
    const mimeTypes = navigator.mimeTypes
    for (const mt in mimeTypes) {
      if (mimeTypes[mt][option] === value) {
        return true
      }
    }
    return false
  }

  return function(userAgent) {
    const u = userAgent || _navigator.userAgent || {}
    const _this = this

    const match = {
      //内核
      'Trident': u.indexOf('Trident') > -1 || u.indexOf('NET CLR') > -1,
      'Presto': u.indexOf('Presto') > -1,
      'WebKit': u.indexOf('AppleWebKit') > -1,
      'Gecko': u.indexOf('Gecko/') > -1,
      //浏览器
      'Safari': u.indexOf('Safari') > -1,
      'Chrome': u.indexOf('Chrome') > -1 || u.indexOf('CriOS') > -1,
      'IE': u.indexOf('MSIE') > -1 || u.indexOf('Trident') > -1,
      'Edge': u.indexOf('Edge') > -1,
      'Firefox': u.indexOf('Firefox') > -1 || u.indexOf('FxiOS') > -1,
      'Firefox Focus': u.indexOf('Focus') > -1,
      'Chromium': u.indexOf('Chromium') > -1,
      'Opera': u.indexOf('Opera') > -1 || u.indexOf('OPR') > -1,
      'Vivaldi': u.indexOf('Vivaldi') > -1,
      'Yandex': u.indexOf('YaBrowser') > -1,
      'Arora': u.indexOf('Arora') > -1,
      'Lunascape': u.indexOf('Lunascape') > -1,
      'QupZilla': u.indexOf('QupZilla') > -1,
      'Coc Coc': u.indexOf('coc_coc_browser') > -1,
      'Kindle': u.indexOf('Kindle') > -1 || u.indexOf('Silk/') > -1,
      'Iceweasel': u.indexOf('Iceweasel') > -1,
      'Konqueror': u.indexOf('Konqueror') > -1,
      'Iceape': u.indexOf('Iceape') > -1,
      'SeaMonkey': u.indexOf('SeaMonkey') > -1,
      'Epiphany': u.indexOf('Epiphany') > -1,
      '360': u.indexOf('QihooBrowser') > -1,
      '360EE': u.indexOf('360EE') > -1,
      '360SE': u.indexOf('360SE') > -1,
      'UC': u.indexOf('UC') > -1 || u.indexOf(' UBrowser') > -1,
      'QQBrowser': u.indexOf('QQBrowser') > -1,
      'QQ': u.indexOf('QQ/') > -1,
      'Baidu': u.indexOf('Baidu') > -1 || u.indexOf('BIDUBrowser') > -1,
      'Maxthon': u.indexOf('Maxthon') > -1,
      'Sogou': u.indexOf('MetaSr') > -1 || u.indexOf('Sogou') > -1,
      'LBBROWSER': u.indexOf('LBBROWSER') > -1,
      '2345Explorer': u.indexOf('2345Explorer') > -1,
      'TheWorld': u.indexOf('TheWorld') > -1,
      'XiaoMi': u.indexOf('MiuiBrowser') > -1,
      'Quark': u.indexOf('Quark') > -1,
      'Qiyu': u.indexOf('Qiyu') > -1,
      'Wechat': u.indexOf('MicroMessenger') > -1,
      'Taobao': u.indexOf('AliApp(TB') > -1,
      'Alipay': u.indexOf('AliApp(AP') > -1,
      'Weibo': u.indexOf('Weibo') > -1,
      'Douban': u.indexOf('com.douban.frodo') > -1,
      'Suning': u.indexOf('SNEBUY-APP') > -1,
      'iQiYi': u.indexOf('IqiyiApp') > -1,
      //系统或平台
      'Windows': u.indexOf('Windows') > -1,
      'Linux': u.indexOf('Linux') > -1 || u.indexOf('X11') > -1,
      'Mac OS': u.indexOf('Macintosh') > -1,
      'Android': u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
      'Ubuntu': u.indexOf('Ubuntu') > -1,
      'FreeBSD': u.indexOf('FreeBSD') > -1,
      'Debian': u.indexOf('Debian') > -1,
      'Windows Phone': u.indexOf('IEMobile') > -1 || u.indexOf('Windows Phone') > -1,
      'BlackBerry': u.indexOf('BlackBerry') > -1 || u.indexOf('RIM') > -1,
      'MeeGo': u.indexOf('MeeGo') > -1,
      'Symbian': u.indexOf('Symbian') > -1,
      'iOS': u.indexOf('like Mac OS X') > -1,
      'Chrome OS': u.indexOf('CrOS') > -1,
      'WebOS': u.indexOf('hpwOS') > -1,
      //设备
      'Mobile': u.indexOf('Mobi') > -1 || u.indexOf('iPh') > -1 || u.indexOf('480') > -1,
      'Tablet': u.indexOf('Tablet') > -1 || u.indexOf('Pad') > -1 || u.indexOf('Nexus 7') > -1
    }
    let is360 = false
    if (!_window.chrome) {
      const chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1')
      if (chrome_vision > 36 && _window.showModalDialog) {
        is360 = true
      } else if (chrome_vision > 45) {
        is360 = _mime('type', 'application/vnd.chromium.remoting-viewer')
      }
    }
    //修正
    if (match['Mobile']) {
      match['Mobile'] = !(u.indexOf('iPad') > -1)
    } else if (is360) {
      if (_mime('type', 'application/gameplugin')) {
        match['360SE'] = true
      } else {
        match['360EE'] = true
      }
    }
    if (match['IE'] || match['Edge']) {
      const navigator_top = window.screenTop - window.screenY
      switch (navigator_top) {
        case 73: // 无收藏栏,贴边
        case 96: // 有收藏栏,贴边
        case 101: // 有收藏栏,非贴边
          match['360EE'] = true
          break
        case 75: // 无收藏栏,贴边
        case 74: // 无收藏栏,非贴边
        case 105: // 有收藏栏,贴边
        case 104: // 有收藏栏,非贴边
          match['360SE'] = true
          break
        case 100:
          match['LBBROWSER'] = true
          break
        case 118:
        case 126:
          match['2345Explorer'] = true
          break
      }
    }
    //基本信息
    const hash = {
      engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
      browser: ['Safari', 'Chrome', 'Edge', 'IE', 'Firefox', 'Firefox Focus', 'Chromium', 'Opera', 'Vivaldi', 'Yandex', 'Arora', 'Lunascape', 'QupZilla', 'Coc Coc', 'Kindle', 'Iceweasel', 'Konqueror', 'Iceape', 'SeaMonkey', 'Epiphany', '360', '360SE', '360EE', 'UC', 'QQBrowser', 'QQ', 'Baidu', 'Maxthon', 'Sogou', 'LBBROWSER', '2345Explorer', 'TheWorld', 'XiaoMi', 'Quark', 'Qiyu', 'Wechat', 'Taobao', 'Alipay', 'Weibo', 'Douban', 'Suning', 'iQiYi'],
      os: ['Windows', 'Linux', 'Mac OS', 'Android', 'Ubuntu', 'FreeBSD', 'Debian', 'iOS', 'Windows Phone', 'BlackBerry', 'MeeGo', 'Symbian', 'Chrome OS', 'WebOS'],
      device: ['Mobile', 'Tablet']
    }
    _this.device = 'PC'
    _this.language = (function() {
      const g = (_navigator.browserLanguage || _navigator.language)
      const arr = g.split('-')
      if (arr[1]) {
        arr[1] = arr[1].toUpperCase()
      }
      return arr.join('_')
    })()
    for (const s in hash) {
      for (let i = 0; i < hash[s].length; i++) {
        const value = hash[s][i]
        if (match[value]) {
          _this[s] = value
        }
      }
    }
    //系统版本信息
    const osVersion = {
      'Windows': function() {
        const v = u.replace(/^.*Windows NT ([\d.]+);.*$/, '$1')
        const hash = {
          '6.4': '10',
          '6.3': '8.1',
          '6.2': '8',
          '6.1': '7',
          '6.0': 'Vista',
          '5.2': 'XP',
          '5.1': 'XP',
          '5.0': '2000'
        }
        return hash[v] || v
      },
      /**
       * @return {string}
       */
      'Android': function() {
        return u.replace(/^.*Android ([\d.]+);.*$/, '$1')
      },
      /**
       * @return {string}
       */
      'iOS': function() {
        return u.replace(/^.*OS ([\d_]+) like.*$/, '$1').replace(/_/g, '.')
      },
      /**
       * @return {string}
       */
      'Debian': function() {
        return u.replace(/^.*Debian\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Windows Phone': function() {
        return u.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, '$2')
      },
      /**
       * @return {string}
       */
      'Mac OS': function() {
        return u.replace(/^.*Mac OS X ([\d_]+).*$/, '$1').replace(/_/g, '.')
      },
      /**
       * @return {string}
       */
      'WebOS': function() {
        return u.replace(/^.*hpwOS\/([\d.]+);.*$/, '$1')
      }
    }
    _this.osVersion = ''
    if (osVersion[_this.os]) {
      _this.osVersion = osVersion[_this.os]()
      if (_this.osVersion === u) {
        _this.osVersion = ''
      }
    }
    //浏览器版本信息
    const version = {
      /**
       * @return {string}
       */
      'Safari': function() {
        return u.replace(/^.*Version\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Chrome': function() {
        return u.replace(/^.*Chrome\/([\d.]+).*$/, '$1').replace(/^.*CriOS\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'IE': function() {
        return u.replace(/^.*MSIE ([\d.]+).*$/, '$1').replace(/^.*rv:([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Edge': function() {
        return u.replace(/^.*Edge\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Firefox': function() {
        return u.replace(/^.*Firefox\/([\d.]+).*$/, '$1').replace(/^.*FxiOS\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Firefox Focus': function() {
        return u.replace(/^.*Focus\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Chromium': function() {
        return u.replace(/^.*Chromium\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Opera': function() {
        return u.replace(/^.*Opera\/([\d.]+).*$/, '$1').replace(/^.*OPR\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Vivaldi': function() {
        return u.replace(/^.*Vivaldi\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Yandex': function() {
        return u.replace(/^.*YaBrowser\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Arora': function() {
        return u.replace(/^.*Arora\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Lunascape': function() {
        return u.replace(/^.*Lunascape[\/\s]([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'QupZilla': function() {
        return u.replace(/^.*QupZilla[\/\s]([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Coc Coc': function() {
        return u.replace(/^.*coc_coc_browser\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Kindle': function() {
        return u.replace(/^.*Version\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Iceweasel': function() {
        return u.replace(/^.*Iceweasel\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Konqueror': function() {
        return u.replace(/^.*Konqueror\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Iceape': function() {
        return u.replace(/^.*Iceape\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'SeaMonkey': function() {
        return u.replace(/^.*SeaMonkey\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Epiphany': function() {
        return u.replace(/^.*Epiphany\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      '360': function() {
        return u.replace(/^.*QihooBrowser\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      '360SE': function() {
        const hash = {'63': '10.0', '55': '9.1', '45': '8.1', '42': '8.0', '31': '7.0', '21': '6.3'}
        const chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1')
        return hash[chrome_vision] || ''
      },
      /**
       * @return {string}
       */
      '360EE': function() {
        const hash = {'63': '9.5', '55': '9.0', '50': '8.7', '30': '7.5'}
        const chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1')
        return hash[chrome_vision] || ''
      },
      /**
       * @return {string}
       */
      'Maxthon': function() {
        return u.replace(/^.*Maxthon\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'QQBrowser': function() {
        return u.replace(/^.*QQBrowser\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'QQ': function() {
        return u.replace(/^.*QQ\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Baidu': function() {
        return u.replace(/^.*BIDUBrowser[\s\/]([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'UC': function() {
        return u.replace(/^.*UC?Browser\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Sogou': function() {
        return u.replace(/^.*SE ([\d.X]+).*$/, '$1').replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'LBBROWSER': function() {
        const hash = {
          '57': '6.5',
          '49': '6.0',
          '46': '5.9',
          '42': '5.3',
          '39': '5.2',
          '34': '5.0',
          '29': '4.5',
          '21': '4.0'
        }
        const chrome_vision = navigator.userAgent.replace(/^.*Chrome\/([\d]+).*$/, '$1')
        return hash[chrome_vision] || ''
      },
      /**
       * @return {string}
       */
      '2345Explorer': function() {
        return u.replace(/^.*2345Explorer\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'TheWorld': function() {
        return u.replace(/^.*TheWorld ([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'XiaoMi': function() {
        return u.replace(/^.*MiuiBrowser\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Quark': function() {
        return u.replace(/^.*Quark\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Qiyu': function() {
        return u.replace(/^.*Qiyu\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Wechat': function() {
        return u.replace(/^.*MicroMessenger\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Taobao': function() {
        return u.replace(/^.*AliApp\(TB\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Alipay': function() {
        return u.replace(/^.*AliApp\(AP\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Weibo': function() {
        return u.replace(/^.*weibo__([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Douban': function() {
        return u.replace(/^.*com.douban.frodo\/([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'Suning': function() {
        return u.replace(/^.*SNEBUY-APP([\d.]+).*$/, '$1')
      },
      /**
       * @return {string}
       */
      'iQiYi': function() {
        return u.replace(/^.*IqiyiVersion\/([\d.]+).*$/, '$1')
      }
    }
    _this.version = ''
    if (version[_this.browser]) {
      _this.version = version[_this.browser]()
      if (_this.version === u) {
        _this.version = ''
      }
    }
    //修正
    if (_this.browser === 'Edge') {
      _this.engine = 'EdgeHTML'
    } else if (_this.browser === 'Chrome' && parseInt(_this.version) > 27) {
      _this.engine = 'Blink'
    } else if (_this.browser === 'Opera' && parseInt(_this.version) > 12) {
      _this.engine = 'Blink'
    } else if (_this.browser === 'Yandex') {
      _this.engine = 'Blink'
    }
    // 匹配中文
    const browser_name_map = new Map([
      ['Safari', 'Safari'],
      ['Chrome', '谷歌'],
      ['Edge', 'Edge'],
      ['IE', 'IE'],
      ['Firefox', '火狐'],
      ['Firefox Focus', '火狐Focus'],
      ['Chromium', 'Chromium'],
      ['Opera', '欧朋'],
      ['360SE', '360安全'],
      ['360EE', '360极速'],
      ['UC', 'UC'],
      ['Baidu', '百度'],
      ['Maxthon', '遨游'],
      ['Sogou', '搜狗'],
      ['LBBROWSER', '猎豹'],
      ['2345Explorer', '2345']
    ])
    // 匹配中文
    const browser_version_map = new Map([
      ['Safari', 5],
      ['Chrome', 70],
      ['Edge', 40],
      ['IE', 9],
      ['Firefox', 60],
      ['Firefox Focus', 7],
      ['Chromium', 6],
      ['Opera', 6],
      ['360SE', 8],
      ['360EE', 11],
      ['UC', 6],
      ['Baidu', 8],
      ['Maxthon', 5],
      ['Sogou', 8],
      ['LBBROWSER', 6],
      ['2345Explorer', 9]
    ])
    if (_this.version !== null && _this.version.length > 0 && browser_version_map.has(_this.browser)) {
      const index = _this.version.indexOf('.')
      _this.update = _this.version.substring(0, index > -1 ? index : _this.version.length) < browser_version_map.get(_this.browser)
    }
    _this.browser = browser_name_map.has(_this.browser) ? browser_name_map.get(_this.browser) : _this.browser
    _this.chromeUrl = 'https://sm.myapp.com/original/Browser/70.0.3538.67_chrome_installer.exe'
    _this.updateUrl = 'https://www.so.com/s?q=' + _this.browser + '浏览器下载'
  }
}))
