export function summate(data) {
  return data.reduce((t, c) => {
    if (Object.is(+c.value, NaN)) {
      // 去除非数字的情况
      return t
    }
    return t + c.value * 1
  }, 0)
  // return data.reduce((a, b) => {
  //   return a + b.value * 1
  // }, 0)
}

/**
 * 格式化千分位
 * @param num
 * @returns {string}
 */
export function formatNumber(num) {
  const number = Number(num)
  const bool = Number.isInteger(number)

  const reg = /\d{1,3}(?=(\d{3})+$)/g
  if (bool) {
    return `${number}`.replace(reg, '$&,')
  }
  const temp = `${number}`.split('.')
  return temp[0].replace(reg, '$&,') + '.' + temp[1]
}

export function omit(obj, fields) {
  const shallowCopy = {
    ...obj,
  }
  for (let i = 0; i < fields.length; i++) {
    const key = fields[i]
    delete shallowCopy[key]
  }
  return shallowCopy
}

export const pick = (obj, keys) => {
  const r = {}
  keys.forEach(key => {
    r[key] = obj[key]
  })
  return r
}

export const debounce = (fn, delay = 100) => {
  let timer = null

  return function(...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

const ua = navigator.userAgent.toLowerCase()

export const isMobile = /ios|iphone|ipod|ipad|android|hwmini/.test(ua)
