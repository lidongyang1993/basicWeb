export interface Rules {
  trigger: string
  enum: string
  len?: number
  max?: number
  message: string
  min?: number
  pattern: string
  required: boolean
  type: string
}

export interface WidgetForm {
  list: any[]
  config: {
    size: "" | "default" | "small" | "large"
    hideRequiredAsterisk: boolean
    labelWidth: number
    labelPosition: string
  }
}

export interface Login {
  user_name: string
  pass_word: string
  cookies_field: string
  code: string
}

const rules: Rules = {
  trigger: "blur",
  enum: "",
  len: undefined,
  max: undefined,
  message: "",
  min: undefined,
  pattern: "",
  required: false,
  type: "any"
}

export const getWidgetForm = (): WidgetForm => ({
  list: [],
  config: {
    size: "default",
    hideRequiredAsterisk: false,
    labelWidth: 100,
    labelPosition: "right"
  }
})

export const basicComponents = [
  {
    label: "单行文本",
    type: "input" as const,
    options: {
      width: "100%",
      defaultValue: "",
      placeholder: "",
      maxlength: null,
      prefix: "",
      suffix: "",
      prepend: "",
      append: "",
      disabled: false,
      clearable: false,
      readonly: false,
      rules
    }
  },
  {
    label: "密码框",
    type: "password" as const,
    options: {
      width: "100%",
      defaultValue: "",
      placeholder: "",
      maxlength: null,
      prefix: "",
      suffix: "",
      prepend: "",
      append: "",
      showPassword: true,
      disabled: false,
      clearable: false,
      readonly: false,
      rules
    }
  },
  {
    label: "多行文本",
    type: "textarea" as const,
    options: {
      width: "100%",
      defaultValue: "",
      placeholder: "",
      maxlength: null,
      rows: 4,
      autosize: false,
      showWordLimit: false,
      disabled: false,
      clearable: false,
      readonly: false,
      rules
    }
  },
  {
    label: "计数器",
    type: "number" as const,
    options: {
      width: "",
      defaultValue: 0,
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      rules
    }
  },
  {
    label: "单选框组",
    type: "radio" as const,
    options: {
      defaultValue: "",
      width: "",
      inline: true,
      remote: false,
      showLabel: true,
      remoteFunc: "https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json",
      options: [
        {
          value: "Option 1",
          label: "Option 1"
        },
        {
          value: "Option 2",
          label: "Option 2"
        },
        {
          value: "Option 3",
          label: "Option 3"
        }
      ],
      remoteOptions: [],
      props: {
        value: "value",
        label: "label"
      },
      disabled: false,
      rules
    }
  },
  {
    label: "多选框组",
    type: "checkbox" as const,
    options: {
      defaultValue: [],
      width: "",
      inline: true,
      remote: false,
      showLabel: true,
      remoteFunc: "https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json",
      options: [
        {
          label: "Option 1",
          value: "Option 1"
        },
        {
          label: "Option 2",
          value: "Option 2"
        },
        {
          label: "Option 3",
          value: "Option 3"
        }
      ],
      remoteOptions: [],
      props: {
        value: "value",
        label: "label"
      },
      disabled: false,
      rules
    }
  },
  {
    label: "时间选择器",
    type: "time" as const,
    options: {
      defaultValue: "",
      width: "",
      placeholder: "请选择时间",
      format: "HH:mm:ss",
      valueFormat: "HH:mm:ss",
      readonly: false,
      editable: true,
      clearable: true,
      disabled: false,
      rules
    }
  },
  {
    label: "日期选择器",
    type: "date" as const,
    options: {
      defaultValue: "",
      width: "",
      placeholder: "请选择时间",
      format: "YYYY-MM-DD",
      readonly: false,
      editable: true,
      clearable: true,
      disabled: false,
      rules
    }
  },
  {
    label: "评分",
    type: "rate" as const,
    options: {
      defaultValue: 0,
      max: 5,
      allowHalf: false,
      disabled: false,
      rules
    }
  },
  {
    label: "下拉选择框",
    type: "select" as const,
    options: {
      defaultValue: "",
      width: "200px",
      multiple: false,
      placeholder: "",
      remote: false,
      showLabel: true,
      filterable: false,
      clearable: false,
      disabled: false,
      props: {
        label: "label",
        value: "value"
      },
      options: [
        {
          label: "Option 1",
          value: "Option 1"
        },
        {
          label: "Option 2",
          value: "Option 2"
        },
        {
          label: "Option 3",
          value: "Option 3"
        }
      ],
      remoteOptions: [],
      remoteFunc: "https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json",
      rules
    }
  },
  {
    label: "开关",
    type: "switch" as const,
    options: {
      defaultValue: false,
      disabled: false,
      activeText: "",
      inactiveText: "",
      rules
    }
  },
  {
    label: "滑块",
    type: "slider" as const,
    options: {
      defaultValue: 0,
      width: "",
      min: 0,
      max: 100,
      step: 1,
      disabled: false,
      range: false,
      rules
    }
  },
  {
    label: "文字",
    type: "text" as const,
    options: {
      defaultValue: "This is a text"
    }
  }
]

export const basicFields = basicComponents.map((i) => i.type)

export const advanceComponents = [
  {
    label: "图片",
    type: "img-upload" as const,
    options: {
      defaultValue: [],
      name: "file",
      action: "http://example.com/upload",
      method: "post",
      listType: "text",
      accept: "image/*",
      limit: 1,
      multiple: false,
      disabled: true,
      rules
    }
  },
  {
    label: "下载",
    type: "download" as const,
    labelWidth: "auto",
    options: {
      defaultValue: "",
      name: "file"
    }
  },
  {
    label: "级联选择器",
    type: "cascader" as const,
    options: {
      defaultValue: [],
      width: "200px",
      placeholder: "",
      disabled: false,
      clearable: false,
      filterable: false,
      remote: true,
      remoteOptions: [],
      props: {
        label: "label",
        value: "value",
        children: "children"
      },
      remoteFunc: "https://raw.githubusercontent.com/fuchengwei/vue-form-create/master/mock/mock.json",
      rules
    }
  }
]

export const advanceFields = advanceComponents.map((i) => i.type)

export const layoutComponents = [
  {
    label: "栅格布局",
    type: "grid",
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ],
    options: {
      gutter: 0,
      align: "initial"
    }
  },
  {
    label: "数据表格",
    type: "table",
    columns: [
      { label: "名称", prop: "name" },
      { label: "创建时间", prop: "createTime" }
    ],
    options: {
      defaultValue: [],
      disabled: false,
      size: "",
      align: "center"
    }
  },
  {
    label: "分割线",
    type: "divider",
    options: {}
  }
]

export const layoutFields = layoutComponents.map((i) => i.type)

export const basicElements = [
  {
    label: "计划基本信息",
    type: "PlanInfo" as const,
    params: {}
  },
  {
    label: "用例基本信息",
    type: "CaseInfo" as const,
    params: {}
  },
  {
    label: "步骤基本信息",
    type: "StepInfo" as const,
    params: {}
  },
  {
    label: "计算器",
    type: "cal" as const,
    params: {}
  },
  {
    label: "提取器",
    type: "cal" as const,
    params: {}
  },
  {
    label: "验证器",
    type: "cal" as const,
    params: {}
  },
  {
    label: "提取计算器",
    type: "cal" as const,
    params: {}
  }
]
export const basicListElements = [
  {
    label: "步骤集",
    type: "steps" as const,
    params: {}
  },
  {
    label: "用例集",
    type: "cases" as const,
    params: {}
  },
  {
    label: "后置处理器集",
    type: "handlers" as const,
    params: {}
  }
]
export const plunInElements = [
  {
    label: "登录插件",
    type: "plugIn_login" as const,
    params: {
      user_name: "",
      pass_word: "",
      cookies_field: "",
      code: ""
    }
  }
]
export const basicElement = basicElements.map((i) => i.type)
export const basicListElement = basicListElements.map((i) => i.type)
export const plunInElement = plunInElements.map((i) => i.type)
