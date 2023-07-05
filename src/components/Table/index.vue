<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { RefreshRight, Search, Refresh } from "@element-plus/icons-vue"
import { usePagination } from "@/hooks/usePagination"
import { FormInstance } from "element-plus"
import type * as CASE from "@/api/case/types/case"

const searchFormRef = ref<FormInstance | null>(null)
const loading = ref<boolean>(false)

const { paginationData } = usePagination()

const resetSearch = () => {
  searchFormRef.value?.resetFields()
  handleSearch()
}
const handleSearch = () => {
  paginationData.currentPage === 1 ? getTableData() : (paginationData.currentPage = 1)
}

const tableData = ref<Object[]>([])

const getTableData = () => {
  loading.value = true
  props
    .getTableDataApi(props.searchData)
    .then((res: ApiResponseData<CASE.List>) => {
      paginationData.currentPage = res.data.currentPage
      paginationData.pageSize = res.data.size
      paginationData.total = res.data.total
      tableData.value = res.data.dataList
    })
    .catch(() => {
      tableData.value = []
    })
    .finally(() => {
      loading.value = false
    })
}

const props = defineProps({
  searchData: Object,
  currentPage: Number,
  size: Number,
  dialogVisible: {
    type: Boolean,
    default: false
  },
  getTableDataApi: {
    type: Function,
    default: () => {}
  },
  handleCurrentChange: {
    type: Function,
    default: () => {}
  },
  handleSizeChange: {
    type: Function,
    default: () => {}
  },
  selectChange: {
    type: Function,
    default: () => {}
  }
})

const handleSizeChangeUpdate = (value: number) => {
  props.handleSizeChange(value, getTableData)
}
const handleCurrentChangeUpdate = (value: number) => {
  props.handleCurrentChange(value, getTableData)
}

onMounted(() => {
  if (tableData.value.length == 0) {
    getTableData()
  }
})
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="props.searchData">
        <slot name="search" />
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <slot name="tools" />
        </div>
        <div>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData" @selection-change="props.selectChange">
          <slot />
        </el-table>

        <div class="pager-wrapper">
          <el-pagination
            background
            :layout="paginationData.layout"
            :page-sizes="paginationData.pageSizes"
            :total="paginationData.total"
            :page-size="paginationData.pageSize"
            :currentPage="paginationData.currentPage"
            @size-change="handleSizeChangeUpdate"
            @current-change="handleCurrentChangeUpdate"
          />
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
}
</style>
