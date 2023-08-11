<template>
  <div>
    <div class="common-layout">
      <section h-full bg-white flex>
        <el-container>
          <!-- <el-aside /> -->
          <el-container>
            <el-main border="0 x solid gray-200" class="main">
              <el-header border="0 b solid gray-200" flex gap-2 items-center justify-between h-20 py-0 px-2>
                <slot />
                <div border="0 b solid gray-200" flex gap-2 items-center justify-start h-20 py-0 px-2>
                  <el-input-number v-model="Search_id" />
                  <el-button type="primary" @click="getData"> 查询 </el-button>
                  <el-button type="primary" @click="previewVisible"> 预览 </el-button>
                </div>
                <div>
                  <el-button type="primary" @click="savePlan">保存</el-button>
                  <el-button type="primary" @click="debugPlan">调试</el-button>
                </div>
              </el-header>
              <el-scrollbar max-height="1800px" v-if="planInfo !== undefined">
                <caseEditMain :info="planInfo" v-if="planInfo.id !== undefined" />
              </el-scrollbar>
            </el-main>
          </el-container>
        </el-container>
      </section>
    </div>
    <el-dialog v-model="dialog.visible" width="70%" v-if="dialog.visible">
      <div v-if="dialog.title === '预览'">
        <JsonEditorVue v-model="planInfo" class="h-800px" />
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts" name="caseDesign" setup>
// import { getWidgetForm } from "@/config/design"
import { ref, reactive, onMounted } from "vue"
import { Plan } from "@/api/case/types/case"
import { alert_error, alert_info } from "@/config/elMessage"
import { getPlanDataApi, debugCaseApi, savePlanDataApi } from "@/api/case"
import caseEditMain from "./components/design/caseEditMain.vue"
import JsonEditorVue from "json-editor-vue3"
import { alert_success } from "../../config/elMessage"

const planInfo = ref<Plan>()

// const widgetFrom = ref(getWidgetForm())
const Search_id = ref<number>()

const getData = () => {
  getPlanDataApi({ id: Search_id.value })
    .then((res: ApiResponseData<Plan>) => {
      planInfo.value = res.data
    })
    .catch(() => {})
    .finally(() => {})
}

const dialog = reactive({
  visible: false,
  title: ""
})

const previewVisible = () => {
  dialog.visible = true
  dialog.title = "预览"
}

const debugPlan = () => {
  debugCaseApi({ data: planInfo.value })
    .then((res) => {
      if (res) {
        if (res.code === 0) {
          if (res.data.result === false) {
            alert_info("cheack-失败-请检查格式")
          } else {
            alert_info("debug-完成")
            window.open(res.data.log_url)
          }
        } else {
          alert_error("debug-失败-存在位置异常")
        }
      }
    })
    .catch(() => {})
    .finally(() => {})
}

const savePlan = () => {
  savePlanDataApi({ data: planInfo.value }).then((res: ApiResponseData<{}>) => {
    if (res) {
      if (res.code === 0) {
        getData()
        alert_success("保存成功")
      } else {
        alert_error("保存失败")
      }
    }
  })
}

onMounted(() => {})
</script>
<style lang="scss">
.aside {
  background-color: rgb(216, 216, 183);
  height: 1080px;
}
.main {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 1080px;
}
.plan-info {
  width: 100%;
}
</style>
