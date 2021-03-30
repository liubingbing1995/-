const arr1 = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE']
const arr2 = ['TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN']
const arr3 = ['TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY']
const arr4 = ['HUNDRED', 'THOUSAND', 'MILLION', 'BILLION', 'TRILLION', 'QUADRILLION']

export function numtoEiglish(num) {
  const strnum = num.toString()

  //正则验证是否是数字
  const regxnum = /^[0-9]+[0-9]*]*$/
  if (!regxnum.test(num)) {
    return false
  }
  if (num >= 0 && num < 10) {
    //0-9
    return arr1[String(num).length === 1 ? num : String(num).substring(1)]
  } else if (num >= 10 && num < 20) {
    //10-19
    return arr2[parseInt(strnum.charAt(1))]
  } else if (num >= 20 && num < 100) {
    //20-99
    const shiwei = arr3[parseInt(strnum.substring(0, 1)) - 2] //十位
    const gewei = parseInt(strnum.substring(1)) > 0 ? '-' + arr1[parseInt(strnum.substring(1))] : '' //个位
    return shiwei + gewei
  } else if (num >= 100 && num < 1000) {
    //100-999
    const bai = arr1[parseInt(strnum.substring(0, 1))] + ' ' + arr4[0]
    if (num === 100 || num === 200 || num === 300 || num === 400 || num === 500 || num === 600 || num === 700 || num === 800 || num === 900) {
      return bai
    }
    return bai + ' AND ' + numtoEiglish(strnum.substring(1))
  } else {
    //1000+
    const fenge = num.toLocaleString().toString().split(',')
    let resultnum = ''
    for (let i = fenge.length; i > 0; i--) {
      let fenduan = '' //分段转换
      const ascnum = fenge.length - i //获取分割后正序索引

      if (i > 1) {
        //给每一个分割数字后面添加单位
        fenduan = numtoEiglish(parseInt(fenge[ascnum])) + ' ' + arr4[i - 1]
        //每一个分割数字拼接时用空格隔开
        resultnum += fenduan + ' '
      } else {
        //如果当前索引的数字小于100需要添加and拼接
        if (parseInt(fenge[i]) < 100) {
          if (numtoEiglish(parseInt(fenge[ascnum])) !== 'ZERO') {
            fenduan = ' AND ' + numtoEiglish(parseInt(fenge[ascnum]))
          }
        } else {
          fenduan = numtoEiglish(parseInt(fenge[ascnum]))
        }
        resultnum += fenduan
      }
    }
    return resultnum
  }
}
