<script lang="ts" setup>
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useAppStore } from "@/store/modules/app"
import { useSettingsStore } from "@/store/modules/settings"
import { useUserStore } from "@/store/modules/user"
import { UserFilled } from "@element-plus/icons-vue"
import Breadcrumb from "../Breadcrumb/index.vue"
import Hamburger from "../Hamburger/index.vue"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import Screenfull from "@/components/Screenfull/index.vue"
import Notify from "@/components/Notify/index.vue"
import imgUrl from "/src/assets/layouts/img.jpg"
import { ChangePasswordRequestData } from "@/api/login/types/login"
import { changePasswordApi } from "@/api/login/index"
import { reactive, ref } from "vue"
import { ElMessageBox, FormInstance, FormRules } from "element-plus"
import { Lock } from "@element-plus/icons-vue"

const router = useRouter()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const userStore = useUserStore()
const { sidebar } = storeToRefs(appStore)
const { showNotify, showThemeSwitch, showScreenfull } = storeToRefs(settingsStore)

/** 切换侧边栏 */
const toggleSidebar = () => {
  appStore.toggleSidebar(false)
}
/** 登出 */
const logout = () => {
  userStore.logout()
  router.push("/login")
}

const loginFormRules: FormRules = {
  old_password: [
    { required: true, message: "请输入旧密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  new_password: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ]
}

const changePasswordBox = ref(false)

const changeParams: ChangePasswordRequestData = reactive({
  username: "",
  new_password: "",
  old_password: ""
})
const changePasswordBoxShow = () => {
  changeParams.username = userStore.username
  changePasswordBox.value = true
}
/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)

const changePassword = async () => {
  loginFormRef.value?.validate(async (valid: boolean, fields) => {
    if (valid) {
      const { code, message } = await changePasswordApi(changeParams)
      if (code === 0) {
        changePasswordOver()
      } else {
        ElMessageBox.confirm(message, "Warning", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning"
        })
      }
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}

const changePasswordOver = () => {
  ElMessageBox.confirm("修改成功，请重新登录", "Warning", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    title: "请确认",
    type: "warning"
  }).finally(() => {
    userStore.logout()
    router.push("/login")
  })
}
</script>

<template>
  <div class="navigation-bar">
    <Hamburger :is-active="sidebar.opened" class="hamburger" @toggle-click="toggleSidebar" />
    <Breadcrumb class="breadcrumb" />
    <div class="right-menu">
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
      <Notify v-if="showNotify" class="right-menu-item" />
      <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <el-avatar :icon="UserFilled" :size="30" :src="imgUrl" />
          <span>{{ userStore.userInfo?.first_name }}{{ userStore.userInfo?.last_name }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <a target="_blank" href="https://juejin.cn/post/7089377403717287972">
              <el-dropdown-item>中文文档</el-dropdown-item>
            </a>
            <a target="_blank" href="https://github.com/un-pany/v3-admin-vite">
              <el-dropdown-item>GitHub</el-dropdown-item>
            </a>
            <a target="_blank" href="https://gitee.com/un-pany/v3-admin-vite">
              <el-dropdown-item>Gitee</el-dropdown-item>
            </a> -->
            <el-dropdown-item @click="changePasswordBoxShow">
              <span style="display: block">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <el-dialog v-model="changePasswordBox" title="Tips" width="30%">
    <div class="content">
      <el-form ref="loginFormRef" :model="changeParams" :rules="loginFormRules" @keyup.enter="changePassword">
        <el-form-item prop="old_password">
          <el-input
            v-model.trim="changeParams.old_password"
            placeholder="旧密码"
            type="password"
            tabindex="2"
            :prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        <el-form-item prop="new_password">
          <el-input
            v-model.trim="changeParams.new_password"
            placeholder="新密码"
            type="password"
            tabindex="2"
            :prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        <el-button type="primary" size="large" @click.prevent="changePassword">登 录</el-button>
      </el-form>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.navigation-bar {
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  background: #fff;
  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    float: left;
    // 参考 Bootstrap 的响应式设计将宽度设置为 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .right-menu {
    float: right;
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #606266;
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      .right-menu-avatar {
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
