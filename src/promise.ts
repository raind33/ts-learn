import { Executor, RejectType, ResolveType } from "./actionTypes";

class MyPromise<T = any> {
  resolve!: ResolveType
  reject!: RejectType
  status: string = 'pending'
  resolveVal: any
  rejectVal: any
  resolveFns: ((val:any) => any)[] = []
  rejectFns: ((val:any) => any)[] = []

  constructor(executor:Executor) {
    this.resolve = (val:any) => {
      if(this.status === 'pending'){
        this.status = 'success'
        this.resolveVal = val
        this.resolveFns.forEach((fn) => fn(val))
      }
    }
    this.reject = (val:any) => {
      if(this.status === 'pending'){
        this.status = 'fail'
        this.rejectVal = val
        this.rejectFns.forEach((fn) => fn(val))
      }
    }
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.status = 'pending'
      this.reject((error as any).toString())
    }
  }

  then(resolveFn:ResolveType, rejectFn?:RejectType) {
    return new MyPromise((resolve, reject) => {
      if(this.status === 'success') {
        const result = resolveFn(this.resolveVal)
        resolve(result)
      }
      if(this.status === 'fail') {
        rejectFn && rejectFn(this.rejectVal)
        // reject
      }
      if(this.status === 'pending') {
        this.resolveFns.push(() => {
          try {
            
            const result = resolveFn(this.resolveVal)
            if(isPromise(result)) {
              result.then(resolve,reject)
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        })
        rejectFn &&
        this.rejectFns.push(() => {
          try {
            
            const result = rejectFn(this.rejectVal)
            if(isPromise(result)) {
              result.then(resolve,reject)
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
          }
        })
      }

    })
  }

  static all(promises: MyPromise[]): MyPromise {
    return new MyPromise((resolve,reject) => {
      const resolveArr:any[] = new Array(promises.length).fill(null)
      promises.forEach((promise, index) => {
        promise.then((res) => {
          resolveArr[index] = res
          if(resolveArr.every(item => item)) {
            resolve(resolveArr)
          }
        }, (e) => {
          reject(e)
        })
      })
    })
  }
}

function isPromise(val:any): val is MyPromise {
  return isObject(val) && typeof val.then === 'function'
}
function isObject(val:any): val is Record<any,any> {
  return val !== null && typeof val === 'object'
}
export default MyPromise