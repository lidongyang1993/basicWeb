export type Plan = {
  id?: number
  name: string
  desc: string
  variable?: {
    [key: string]: string | number
  }
  module?: Module
  label?: Label[]
  label_id_list?: number[]
  module_id?: number
  case?: Case[]
  create_user: string
  update_user: string
}

export type Basic = {
  id: number | string
  name: string
  desc: string
  module: Module
  label: Label[]
  create_user: string
  update_user: string
}

export type Module = {
  id: number | string
  name: string
  desc: string
}
export type Label = {
  id: number | string
  name?: string
  desc?: string
}

export type Case = {
  id?: number | string
  name: string
  desc: string
  module?: Module
  label?: Label[]
  variable?: {
    [key: string]: string | number
  }
  step?: Step[]
  create_user: string
  update_user: string
}

export type Step = {
  id?: number
  name: string
  desc: string
  type: string
  retry: object
  params: object
  handlers?: Handler[]
  sleep: number
}

export type Request = {
  id: string | number
  name: string
  desc: string
  host: string
  path: string
  method: string
  cookies: {
    [key: string]: string
  }
  headers: {
    [key: string]: string
  }
  data: {
    [key: string]: string
  }
  post_type: string
  response_type: string
}

export type Login = {
  username: string
  password: string
  cookies_field: string
}

export type Random = {
  random_type: string
  length: number
  get_field: string
}

export type PG_DB = {
  host: string
  user: string
  password: string
  db_name: string
  port: number
  field_list: FieldList[]
}

export type FieldList = {
  field: string
  row: number
  col: number
}

export type Extract = {
  type: string
  field: string
  path: string
  condition: object[] | null
}

export type Asserts = {
  value_left: string
  func: string
  value_rignt: string
}

export type ExtAsserts = {
  type: string
  path: string
  condition: object[] | null
  func: string
  value_rignt: string
}

export type Handler = {
  type: string
  desc?: string
  params: object
}

export type List = {
  total: number
  dataList: object[]
  currentPage: number
  size: number
}
