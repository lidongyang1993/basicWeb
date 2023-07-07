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

export const getCaseDataApi = (data: any) => {
  return request<ApiResponseData<METER.Plan>>({
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
  return request<ApiResponseData<METER.Step>>({
    url: "fileManage/list",
    method: "post",
    data: data
  })
}
