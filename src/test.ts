import MyPromise from './promise'

const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(33423)
  }, 500)
}).then(res => {
  console.log(res, 'success')
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      reject(99)
    }, 500);
  })
}, (e) => {
  console.log(e, 'fail')
}).then(res => {
  console.log(res, '第二次')
  return 7889
}, (e) => {
  console.log(e, 'fail第二个')
  return '失败的resolve'
}).then(res => {
  console.log('第三次', res.res.res)
}).then((res) => {
  console.log('finally resolve')
}, (e) => {
  console.log(e)
})

const promise1 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})
const promise2 = new MyPromise((resolve) => {
  setTimeout(() => {
    resolve(2)
  }, 500)
})
const promise3 = new MyPromise((resolve) => {
  resolve(3)
})

MyPromise.all([promise1, promise2, promise3]).then(res => {
  console.log('all:', res)
})