export const menus = [
  {
    menuId: 1,
    parentId: 0,
    url: '/OperationSystem',
    name: '业务系统',
    icon: 'nested',
    list: [
      {
        parentId: 1,
        menuId: 2,
        url: 'organize',
        name: '机构列表',
        list: null
      }
    ]
  },
  {
    parentId: 0,
    menuId: 3,
    url: '/systemSetup',
    name: '系统设置',
    icon: null,
    list: [
      {
        parentId: 3,
        menuId: 4,
        url: 'dataBase',
        name: '数据库设置',
        icon: null,
        list: null
      },
      {
        parentId: 3,
        menuId: 5,
        url: 'system',
        name: '系统参数',
        icon: null,
        list: null
      }
    ]
  }
]
