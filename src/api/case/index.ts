import { request } from "@/utils/service"
import type * as METER from "./types/case"

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

export const checkExrAssertsApi = (data: any) => {
  return request<ApiResponseData<{ result: boolean; data: object }>>({
    url: "test/extAsserts",
    method: "post",
    data: data
  })
}

export const getCaseListApi = (data: any) => {
  return request<ApiResponseData<METER.List>>({
    url: "caseManage/list",
    method: "post",
    data: data
  })
}

export const getPlanListApi = (data: any) => {
  return request<ApiResponseData<METER.List>>({
    url: "planManage/list",
    method: "post",
    data: data
  })
}

export const getPlanDataApi = (data: any) => {
  return request<ApiResponseData<METER.Plan>>({
    url: "planManage/get",
    method: "post",
    data: data
  })
}

export const addPlanDataApi = (data: any) => {
  return request<ApiResponseData<METER.Plan>>({
    url: "planManage/add",
    method: "post",
    data: data
  })
}
export const addCaseDataApi = (data: any) => {
  return request<ApiResponseData<METER.Plan>>({
    url: "caseManage/add",
    method: "post",
    data: data
  })
}

export const getCaseDataApi = (data: any) => {
  return request<ApiResponseData<METER.Case>>({
    url: "caseManage/get",
    method: "post",
    data: data
  })
}

export const getLabelListApi = (data: any) => {
  return request<ApiResponseData<{ dataList: METER.Label[] }>>({
    url: "planManage/getLabelList",
    method: "post",
    data: data
  })
}
export const getModuleListApi = (data: any) => {
  return request<ApiResponseData<{ dataList: METER.Module[] }>>({
    url: "planManage/getModuleList",
    method: "post",
    data: data
  })
}

export const getStepListApi = (data: any) => {
  return request<ApiResponseData<METER.Step>>({
    url: "stepManage/list",
    method: "post",
    data: data
  })
}
export const getFileListApi = (data: any) => {
  return request<ApiResponseData<METER.Basic>>({
    url: "fileManage/list",
    method: "post",
    data: data
  })
}

export const savePlanDataApi = (data: any) => {
  return request<ApiResponseData<{}>>({
    url: "planManage/save",
    method: "post",
    data: data
  })
}
export const saveCaseDataApi = (data: any) => {
  return request<ApiResponseData<{}>>({
    url: "caseManage/save",
    method: "post",
    data: data
  })
}

// 判断是否为数组
const isArr = (origin: any): boolean => {
  const str = "[object Array]"
  return Object.prototype.toString.call(origin) == str ? true : false
}

export const deepClone = <T>(origin: T, target?: Record<string, any> | T): T => {
  const tar = target || {}

  for (const key in origin) {
    if (Object.prototype.hasOwnProperty.call(origin, key)) {
      if (typeof origin[key] === "object" && origin[key] !== null) {
        tar[key] = isArr(origin[key]) ? [] : {}
        deepClone(origin[key], tar[key])
      } else {
        tar[key] = origin[key]
      }
    }
  }

  return tar as T
}
