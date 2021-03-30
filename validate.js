/**
 * leehl 2018-7-15
 *
 */

export function isValidUsername(str) {
  // 可根据需求添加校验
  return true
}
export function isChinese(str) {
  const reg=/^[\u4e00-\u9fa5]/
  return reg.test(str)
}
// 合法uri
export function isValidURL(str) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(str)
}

// 小写字母
export function isValidLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

// 大写字母
export function isValidUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

// 大小写字母
export function isValidAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

// 手机号码
export function isValidMobile(str) {
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/
  return reg.test(str)
}

// 电话号码
export function isValidTel(str) {
  const reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/
  return reg.test(str)
}

// 用户名正则，4到16位（字母，数字，下划线，减号）
export function isValidName(str) {
  const reg = /^[a-zA-Z0-9_-]{4,16}$/
  return reg.test(str)
}

// 密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
export function isValidStrongPassword(str) {
  const reg = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
  return reg.test(str)
}

// Email校验
export function isValidEmail(str) {
  const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
  return reg.test(str)
}

// 身份证校验
export function isValidPersonID(str) {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return reg.test(str)
}

// IPv4地址校验
export function isValidIPv4(str) {
  const reg = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
  return reg.test(str)
}

// 复杂日期校验
export function isValidComplexDate(str) {
  const reg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/
  return reg.test(str)
}

// 校验日期类型是否为YYYY-MM-DD hh:mm:ss格式的类型
export function isValidDateTime(str) {
  const reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/
  return str.match(reg)
}

// 校验日期类型是否为YYYY-MM-DD格式的类型
export function isValidDate(str) {
  const reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/
  return str.match(reg)
}

// 校验日期类型是否为hh:mm:ss格式的类型
export function isValidTime(str) {
  const reg = /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])(\:[0-5][0-9])?$/
  return str.match(reg)
}

// 校验日期类型是否为hh:mm格式的类型
export function isValidShortTime(str) {
  const reg = /^((20|21|22|23|[0-1]\d)\:[0-5][0-9])?$/
  return str.match(reg)
}

// 校验数字
export function isValidNumber(str) {
  const reg = /^\d+(\.\d+)?$/
  return str.match(reg)
}

// 校验输入的字符是否为整数
export function isValidInteger(str) {
  str = str.toString()
  const reg = /^[-+]?\d*$/
  return str.match(reg)
}

// 校验正整数
export function isValidPosInteger(str) {
  str = str.toString()
  const reg = /^[1-9]\d*$/
  return str.match(reg)
}

// 校验输入的字符是否为小数及制定小数位
export function isValidFloat(str, num, type) {
  // const reg = /^[0-9]+\.?[0-9]*$/
  const reg = /^\d+(\.\d+)?$/
  if (str !== '' && str !== null) {
    str = str.toString()
    if (!reg.test(str)) {
      return false
    } else {
      if (num === 0) {
        if (str.indexOf('.') > -1) {
          return false
        }
      }
      if (str.indexOf('.') > -1) {
        if (type === undefined || type === 'equal') {
          return str.split('.')[1].length === num
        } else if (type === 'gt') {
          return str.split('.')[1].length > num
        } else {
          return str.split('.')[1].length < num
        }
      } else return type === 'lt'
    }
  } else {
    return false
  }
}

// 校验输入的字符是否为双精度
export function isValidDouble(str) {
  const reg = /^[-\+]?\d+(\.\d+)?$/
  return str.match(reg)
}

// 校验输入的字符是否为:a-z,A-Z,0-9
export function isValidLetterAndNumber(str) {
  const reg = /^[a-zA-Z0-9_]+$/
  return str.match(reg)
}

// 校验输入的字符是否为中文
export function isValidChinese(str) {
  const reg = /^[\u0391-\uFFE5]+$/
  return str.match(reg)
}

// 校验输入的邮编(只能为六位)是否正确
export function isValidZip(str) {
  const reg = /^\d{6}$/
  return str.match(reg)
}

// 校验QQ号码
export function isValidQQ(str) {
  const reg = /^[1-9]\d{4,8}$/
  return str.match(reg)
}

// 校验用户账号(只能中英文，数字，下划线，减号)
export function isValidUserCode(str) {
  const reg = /^[\u4e00-\u9fa5A-Za-z0-9-_]*$/
  return str.match(reg)
}

// 校验用户密码(以字母开头，长度在6-18之间，只能包含字符、数字和下划线)
export function isValidPassword(str) {
  const reg = /^[a-zA-Z]\w{5,17}$/
  return str.match(reg)
}

// 检验全国组织机构代码
export function isValidOrgCode(str) {
  if (str !== '') {
    const ws = [3, 7, 9, 10, 5, 8, 4, 2]
    const strCode = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const reg = /^([0-9A-Z]){8}-[0-9|X]$/// /^[A-Za-z0-9]{8}-[A-Za-z0-9]{1}$/
    let sum = 0
    for (let i = 0; i < 8; i++) {
      sum += strCode.indexOf(str.charAt(i)) * ws[i]
    }
    let c9 = 11 - (sum % 11)
    c9 = c9 === 10 ? 'X' : c9
    return !(!reg.test(str) || c9 === str.charAt(9))
  } else {
    return false
  }
}

// 校验统一社会信用编码
export function isValidSocialCreditCodeOrg(str) {
  const patrn = /^[0-9A-Z]+$/
  // 18位校验及大写校验
  if ((str.length !== 18) || (patrn.test(str) === false)) {
    return false
  } else {
    let AnCode // 信用代码/税号的每一个值
    let AnCodeValue // 信用代码/税号每一个值的权重
    let total = 0
    const weightedFactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28] // 加权因子
    const strCode = '0123456789ABCDEFGHJKLMNPQRTUWXY'
    // 不用I、O、S、V、Z
    for (let i = 0; i < str.length - 1; i++) {
      AnCode = str.substring(i, i + 1)
      AnCodeValue = strCode.indexOf(AnCode)
      total = total + AnCodeValue * weightedFactors[i]
      // 权重与加权因子相乘之和
    }
    let logicCheckCode = 31 - total % 31
    if (logicCheckCode === 31) {
      logicCheckCode = 0
    }
    const Str = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y'
    const Array_Str = Str.split(',')
    logicCheckCode = Array_Str[logicCheckCode]
    const checkCode = str.substring(17, 18)
    return logicCheckCode === checkCode
  }
}

// 校验个体工商户验证
export function isValidBusCode(str) {
  let ret = false
  if (str.length !== 15) { // 营业执照格式不对，必须是15位数的！
    ret = false
  } else { // 15位
    const s = []
    const p = []
    const a = []
    const m = 10
    p[0] = m
    for (let i = 0; i < str.length; i++) {
      a[i] = parseInt(str.substring(i, i + 1), m)
      s[i] = (p[i] % (m + 1)) + a[i]
      if (s[i] % m === 0) {
        p[i + 1] = 10 * 2
      } else {
        p[i + 1] = (s[i] % m) * 2
      }
    }
    ret = (s[14] % m) === 1
  }
  return ret
}

// 校验纳税人识别号验证
export function isValidTaxpayerId(str) {
  if (str !== '' && str.length === 15) {
    const addressCode = str.substring(0, 6)
    // 校验地址码
    let check = isValidAddressCode(addressCode)
    if (!check) {
      return false
    }
    // 校验组织机构代码
    const orgCode = str.substring(6, 9)
    check = isValidOrgCode(orgCode)
    return check
  } else {
    return false
  }
}

// 校验地址码
export function isValidAddressCode(str) {
  const provinceAndCities = {
    11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江',
    31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东',
    45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏',
    65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外'
  }
  const check = /^[1-9]\d{5}$/.test(str)
  if (!check) return false
  return !!provinceAndCities[parseInt(str.substring(0, 2))]
}

// json校验
export function isValidJsonStr(str) {
  try {
    JSON.parse(str)
    return true
  } catch (err) {
    return false
  }
}

// 箱号校验
export function isValidCtnNo(str) {
  /*返回值说明            */
  /*0:OK                  */
  /*1:特殊柜号            */
  /*2:包含特殊字符        */
  /*3:不能通过检测        */
  if (str.length !== 11) {
    return 1
  }
  str = str.toUpperCase()
  let intTotal = 0
  let intFactorial = 1
  for (let i = 0; i < 10; i++) {
    const stringCharacter = str.substr(i, 1)
    // 字符赋值
    let intRefValue
    switch (stringCharacter) {
      case '0':
        intRefValue = 0
        break
      case '1':
        intRefValue = 1
        break
      case '2':
        intRefValue = 2
        break
      case '3':
        intRefValue = 3
        break
      case '4':
        intRefValue = 4
        break
      case '5':
        intRefValue = 5
        break
      case '6':
        intRefValue = 6
        break
      case '7':
        intRefValue = 7
        break
      case '8':
        intRefValue = 8
        break
      case '9':
        intRefValue = 9
        break
      case 'A':
        intRefValue = 10
        break
      case 'B':
        intRefValue = 12
        break
      case 'C':
        intRefValue = 13
        break
      case 'D':
        intRefValue = 14
        break
      case 'E':
        intRefValue = 15
        break
      case 'F':
        intRefValue = 16
        break
      case 'G':
        intRefValue = 17
        break
      case 'H':
        intRefValue = 18
        break
      case 'I':
        intRefValue = 19
        break
      case 'J':
        intRefValue = 20
        break
      case 'K':
        intRefValue = 21
        break
      case 'L':
        intRefValue = 23
        break
      case 'M':
        intRefValue = 24
        break
      case 'N':
        intRefValue = 25
        break
      case 'O':
        intRefValue = 26
        break
      case 'P':
        intRefValue = 27
        break
      case 'Q':
        intRefValue = 28
        break
      case 'R':
        intRefValue = 29
        break
      case 'S':
        intRefValue = 30
        break
      case 'T':
        intRefValue = 31
        break
      case 'U':
        intRefValue = 32
        break
      case 'W':
        intRefValue = 35
        break
      case 'X':
        intRefValue = 36
        break
      case 'Y':
        intRefValue = 37
        break
      case 'Z':
        intRefValue = 38
        break
      default:
        return 2
    }
    intTotal += intRefValue * intFactorial
    intFactorial *= 2
  }
  let intBalance = intTotal % 11
  if (intBalance === 10) {
    intBalance = 0
  }
  if (intBalance.toString() !== str.substr(10, 1)) {
    return 3
  }
  return 0
}

export function isValidIP(ip) {
  if (ip === null || ip === '' || ip === undefined) {
    return false
  }
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip)
}

export function isValidBillSpVal(val) {
  if (val === null || val === '' || val === undefined) {
    return false
  }
  const reg = /^[\u0020-\u007e]+$/
  for (let i = 0; i < val.length; i++) {
    const char = val.charAt(i)
    if (!reg.test(char)) {
      return false
    }
  }
  return true
}
