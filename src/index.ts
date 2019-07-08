const key1: unique symbol = Symbol()
let key2: symbol = Symbol()
const obj = {
  [key1]: 'value1',
  [key2]: 'value2'
}

console.log(obj[key1])
