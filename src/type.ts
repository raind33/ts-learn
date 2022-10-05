/**
 * 拍平嵌套数组
 */
export type Flatt<T> = T extends Array<infer V> ? Flatt<V> : T;

/**
 * Unwrap  取promise的返回值，如果是数组，递归处理每一项
 */
type Unwrap<T> = T extends Promise<infer V>
  ? Unwrap<V>
  : T extends Array<infer R>
  ? UnwrapArray<T>
  : T;
type UnwrapArray<T> = T extends Array<any>
  ? { [p in keyof T]: Unwrap<T[p]> }
  : T;

type c = Unwrap<Promise<Promise<string>>>;
