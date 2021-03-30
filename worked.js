import {setWork, removeWork} from '@/utils/auth'
// import {getWork, setWork, removeWork} from '@/utils/auth'
// import {isEmpty} from '@/utils/index'
// import {encodeBase64} from '@/utils/encrypt'
// import {setCache} from '@/utils/cached'

export function judgeWorked(val) {
  // if (process.env.NODE_ENV === 'development') {
  //   return true
  // } else {
  //   val = val.trim()
  //   let workeds = getWork()
  //   if (isEmpty(workeds)) {
  //     return true
  //   } else {
  //     workeds = workeds.toString()
  //     const newWorked = encodeBase64(val) + '+'
  //     return workeds.indexOf(newWorked) === -1
  //   }
  // }
  return true
}

export function setWorked(val) {
  setWork(val)
}

export function removeWorked(val) {
  removeWork()
}

export function deleteWorked(val) {
  // let workeds = getWork()
  // if (!isEmpty(workeds)) {
  //   const worked = encodeBase64(val) + '+'
  //   workeds = workeds.replace(worked, '')
  //   if (workeds.length < 8) {
  //     removeWork()
  //   } else {
  //     setWork(workeds)
  //   }
  // }
}

export function deleteEnCodeWorked(val) {
  // let workeds = getWork()
  // if (!isEmpty(workeds)) {
  //   workeds = workeds.replace(val, '')
  //   if (workeds.length < 8) {
  //     removeWork()
  //   } else {
  //     setWork(workeds)
  //   }
  // }
}

export function addWorked(val) {
  // if (judgeWorked(val)) {
  //   let workeds = getWork()
  //   if (isEmpty(workeds) || workeds === 0) {
  //     workeds = ''
  //   }
  //   const newWorked = encodeBase64(val) + '+'
  //   setCache('MARS_WORKED', newWorked)
  //   workeds = workeds + newWorked
  //   setWork(workeds)
  // }
}
