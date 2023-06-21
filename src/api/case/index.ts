import { request } from "@/utils/service"
// import type * as CASE from "./types/case"

export const getCaseApi = (data: any) => {
  return request<ApiResponseData<{ result: boolean; data: object }>>({
    url: "case/get",
    method: "post",
    data: data
  })
}

export const checkCaseApi = (data: any) => {
  return request<ApiResponseData<{ result: boolean; data: object }>>({
    url: "case/check",
    method: "post",
    data: data
  })
}

export const addCaseApi = (data: any) => {
  return request<ApiResponseData<{ result: boolean; data: object }>>({
    url: "case/add",
    method: "post",
    data: data
  })
}

export const updateCaseApi = (data: any) => {
  return request<ApiResponseData<{ result: boolean; data: object }>>({
    url: "cyt/case/update",
    method: "post",
    data: data
  })
}

export const debugCaseApi = (data: any) => {
  return request<ApiResponseData<{ result: boolean; data: object }>>({
    url: "case/debug",
    method: "post",
    data: data
  })
}

export const getCaseList = (data: any) => {
  return request<ApiResponseData<{ result: boolean; data: object }>>({
    url: "meter/interface/select",
    method: "post",
    data: data
  })
}

export const checkExrAssertsApi = (data: any) => {
  return request<ApiResponseData<{ result: boolean; data: object }>>({
    url: "test/extAsserts",
    method: "post",
    data: data
  })
}
