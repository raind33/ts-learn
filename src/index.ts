const getProp = <T, K extends keyof T>(object: T, propName: K) => {
  return object[propName]
}
const obj = { a: 'aa', b: 'bb' }
getProp(obj, 'c') // 类型“"c"”的参数不能赋给类型“"a" | "b"”的参数
