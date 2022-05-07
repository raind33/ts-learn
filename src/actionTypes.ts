type ResolveType = (val:any) => void
type RejectType = (val:any) => void

type Executor = (resolve:ResolveType, reject: RejectType) => void

export {
  RejectType,
  ResolveType,
  Executor
}

