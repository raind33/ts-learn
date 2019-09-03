function isString (value: number | string): value is string {
  return typeof value === 'string'
}
function test (val: string | number) {
  if (typeof val === 'string') {
    console.log('123')
  } else {
    console.log(323)
  }
}
