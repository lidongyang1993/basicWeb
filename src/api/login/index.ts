import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 获取登录验证码 */
export function getLoginCodeApi() {
  return request<Login.LoginCodeResponseData>({
    url: "login/code",
    method: "get"
  })
}

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  return request<Login.UserInfoResData>({
    url: "user/login",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return request<Login.UserInfoResData>({
    url: "user/info",
    method: "get"
  })
}

/** 获取用户详情 */
export function changePasswordApi(data: Login.ChangePasswordRequestData) {
  return request<Login.ResData>({
    url: "user/pwd",
    method: "post",
    data
  })
}
