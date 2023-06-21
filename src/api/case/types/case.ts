export type Plan = {
  id: string | number
  name: string
  desc: string
  variables: object
  case: Case[] | null
}

export type Case = {
  id: string | number
  name: string
  desc: string
  variables: object
  step: Step[] | null
}

export type Step = {
  id: string | number
  name: string
  desc: string
  tpye: string
  params: object
  handlers: Handler[] | null
  sleep: number
}

export type Request = {
  id: string | number
  name: string
  desc: string
  host: string
  path: string
  method: string
  cookies: object
  headers: object
  data: object
  post_type: string
  response_type: string
}

export type Handler = {
  type: string
  parmas: object
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
