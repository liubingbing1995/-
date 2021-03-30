export function getTodayDate() {
  return new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()
}

export function getToday() {
  return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
}

export function getFirstDayOfThisWeek() {
  const week = getToday().getDay()
  const minus = week === 0 ? 6 : week - 1
  return addDays(getToday(), -1 * minus)
}

export function getFirstDayOfNextWeek() {
  const week = getToday().getDay()
  const minus = week === 0 ? -1 : week - 8
  return addDays(getToday(), -1 * minus)
}

export function getFirstDayOfLastWeek() {
  const week = getToday().getDay()
  const minus = week === 0 ? 13 : week + 6
  return addDays(getToday(), -1 * minus)
}

export function getFirstDayOfWeek(date) {
  const week = date.getDay()
  const minus = week === 0 ? 6 : week - 1
  return addDays(date, -1 * minus)
}

export function getLastDayOfThisWeek() {
  const week = getToday().getDay()
  const minus = week === 0 ? 0 : 7 - week
  return addDays(getToday(), minus)
}

export function getLastDayOfNextWeek() {
  const week = getToday().getDay()
  const minus = week === 0 ? 7 : 14 - week
  return addDays(getToday(), minus)
}

export function getLastDayOfLastWeek() {
  const week = getToday().getDay()
  const minus = week === 0 ? -7 : 0 - week
  return addDays(getToday(), minus)
}

export function getLastDayOfWeek(date) {
  const week = date.getDay()
  const minus = week === 0 ? 0 : 7 - week
  return addDays(date, minus)
}

export function getFirstDayOfThisMonth() {
  return new Date(new Date().getFullYear(), new Date().getMonth(), 1)
}

export function getFirstDayOfThreeMonth() {
  return new Date(new Date().getFullYear(), new Date().getMonth()-3, 1)
}

export function getFirstDayOfMonth(date) {
  if (date !== null) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  } else {
    return getFirstDayOfThisMonth()
  }
}

export function getDayOfLastMonth(date) {
  if (date !== null) {
    return new Date(date.getFullYear(), date.getMonth()-1, new Date().getDate())
  } else {
    return getFirstDayOfThisMonth()
  }
}

export function getDayOfLastYear(date) {
  if (date !== null) {
    return new Date(date.getFullYear()-1, date.getMonth(), new Date().getDate())
  } else {
    return getFirstDayOfThisMonth()
  }
}

export function getDayAfterTwoMonth(date) {
  if (date !== null) {
    return new Date(date.getFullYear(), date.getMonth()+2, new Date().getDate())
  } else {
    return getFirstDayOfThisMonth()
  }
}

export function getLastDayOfThisMonth() {
  return new Date(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1) - 24 * 60 * 60 * 1000)
}

export function getLastDayOfMonth(date) {
  if (date !== null) {
    return new Date(new Date(date.getFullYear(), date.getMonth() + 1, 1) - 24 * 60 * 60 * 1000)
  } else {
    return getLastDayOfThisMonth()
  }
}

export function getPriorDay(date) {
  if (date !== null) {
    return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate()) - 24 * 60 * 60 * 1000)
  } else {
    return new Date(getToday() - 24 * 60 * 60 * 1000)
  }
}

export function getNextDay(date) {
  if (date !== null) {
    return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate()) + 24 * 60 * 60 * 1000)
  } else {
    return new Date(getToday() + 24 * 60 * 60 * 1000)
  }
}

export function addDays(date, days) {
  if (date !== null) {
    return new Date(new Date(date.getFullYear(), date.getMonth(), date.getDate() + days))
  } else {
    return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + days)
  }
}

export function addMonths(date, months) {
  if (date !== null) {
    return new Date(new Date(date.getFullYear(), date.getMonth() + months, date.getDate()))
  } else {
    return new Date(new Date().getFullYear(), new Date().getMonth() + months, new Date().getDate())
  }
}

export function addYears(date, years) {
  if (date !== null) {
    return new Date(new Date(date.getFullYear() + years, date.getMonth(), date.getDate()))
  } else {
    return new Date(new Date().getFullYear() + years, new Date().getMonth(), new Date().getDate())
  }
}
