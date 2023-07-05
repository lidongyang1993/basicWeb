import { ElMessage } from "element-plus"

export function alert_info(title: any) {
  ElMessage.info(title)
}

export function alert_error(title: any) {
  ElMessage.error(title)
}

export function alert_success(title: any) {
  ElMessage.success(title)
}
