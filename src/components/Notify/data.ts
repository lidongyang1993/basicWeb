export interface ListItem {
  avatar?: string
  title: string
  datetime?: string
  description?: string
  status?: "" | "success" | "info" | "warning" | "danger"
  extra?: string
}

export const notifyData: ListItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "自动化工具平台 上线啦",
    datetime: "半年前",
    description:
      "一个免费开源的中后台管理系统基础解决方案，基于 Vue3、TypeScript、Element Plus、Pinia 和 Vite 等主流技术"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "V3 Admin 上线啦",
    datetime: "一年前",
    description: "一个中后台管理系统基础解决方案，基于 Vue3、TypeScript、Element Plus 和 Pinia"
  }
]

export const messageData: ListItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "来自楚门的世界",
    description: "如果再也不能见到你，祝你早安、午安和晚安",
    datetime: "1998-06-05"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "来自大话西游",
    description: "如果非要在这份爱上加上一个期限，我希望是一万年",
    datetime: "1995-02-04"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "来自龙猫",
    description: "心存善意，定能途遇天使",
    datetime: "1988-04-16"
  }
]

export const todoData: ListItem[] = [
  {
    title: "任务名称",
    description: "这家伙很懒，什么都没留下",
    extra: "未开始",
    status: "info"
  },
  {
    title: "任务名称",
    description: "这家伙很懒，什么都没留下",
    extra: "进行中",
    status: ""
  },
  {
    title: "任务名称",
    description: "这家伙很懒，什么都没留下",
    extra: "已超时",
    status: "danger"
  }
]
