export interface LoginRequestData {
  /** admin 或 editor */
  username: string
  /** 密码 */
  password: string
  /** 验证码 */
  code: string
}

export interface ChangePasswordRequestData {
  /** admin 或 editor */
  username: string
  /** 密码 */
  new_password: string
  /** 验证码 */
  old_password: string
}

export interface LoginGetUserInfo {
  id: number | undefined
}

export interface UserInfo {
  token: string
  username: string
  roles: string[]
  id: number
  first_name: string
  last_name: string
  email: string
  groups: []
}

export type LoginCodeResponseData = ApiResponseData<string>

export type LoginResponseData = ApiResponseData<{ token: string }>

export type UserInfoResponseData = ApiResponseData<{ username: string; roles: string[] }>

export type UserInfoResData = ApiResponseData<UserInfo>

export type ResData = ApiResponseData<{}>
