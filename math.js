export const math = {
  add() {
    return comp('add', arguments)
  },
  subtract() {
    return comp('subtract', arguments)
  },
  multiply() {
    return comp('multiply', arguments)
  },
  divide() {
    return comp('divide', arguments)
  }
}

function comp(_func, args) {
  let t = window.math.chain(window.math.bignumber(args[0]))
  for (let i = 1; i < args.length; i++) {
    t = t[_func](window.math.bignumber(args[i]))
  }
  // 防止超过6位使用科学计数法
  return parseFloat(t.done())
}
