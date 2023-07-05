<script lang="ts" setup>
// import { h } from "vue"
import { h, onBeforeMount } from "vue"
import { useTheme } from "@/hooks/useTheme"
import { ElNotification } from "element-plus"
// 将 Element Plus 的语言设置为中文
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import { useUserStore } from "@/store/modules/user"
import { useRoute } from "vue-router"
const { initTheme } = useTheme()
const userStore = useUserStore()
/** 初始化主题 */
initTheme()
const route = useRoute()

const { path } = route

onBeforeMount(() => {
  if (path === "/login") {
    return
  }
  if (userStore.userInfo === undefined) {
    userStore.getInfo()
  }
})

/** 作者小心思 */
ElNotification({
  title: "Hello",
  message: h(
    "a",
    { style: "color: teal", target: "_blank", href: "https://github.com/un-pany/v3-admin-vite" },
    "欢迎使用自动化工具平台"
  ),
  duration: 0,
  position: "bottom-right"
})
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <router-view />
  </ElConfigProvider>
</template>
