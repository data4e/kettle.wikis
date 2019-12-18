module.exports = {
  dest: 'docs/',
  title: 'kettle.wiki',
  description: 'Just playing around',
  themeConfig: {
    sidebarDepth: 1,
    sidebar: [
      {
        title: '入门',   // 必要的
        path: '',      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          ['/home', '认识Kettle'],
          ['/quickstart', '快速开始']
        ]
      },
      {
        title: 'Spoon',   // 必要的
        path: '',      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          ['/spoon/start', '起步'],
          ['/spoon/db-conect', '数据库链接'],
          ['/spoon/plugins', '使用插件'],
          ['/spoon/repositorie', 'kettle资源库']
        ]
      },
      {
        title: '转换步骤',   // 必要的
        path: '/step/transformationStep',      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
          ['/step/abort', 'Abort中止步骤'],
          ['/step/addACheckSum', '添加校验列'],
          ['/step/addAConstants', '添加常量'],
          ['/step/addSequence', '添加序列'],
          ['/step/amqpConsumer', 'Amqp消费者'],
          ['/step/amqpProducer', 'Amqp生产者'],
          ['', '追加流'],
          ['/step/copyRowsToResult', '复制记录到结果'],
          ['/step/dataValidator', '数据检验']
        ]
      },
      {
        title: 'KitChen',   // 必要的
        path: '',      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
        ]
      },
      {
        title: 'Pan',   // 必要的
        path: '',      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
        ]
      },{
        title: 'Carte',   // 必要的
        path: '',      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
        ]
      },{
        title: '高级主题',   // 必要的
        path: '',      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
        ]
      },{
        title: '资源下载',   // 必要的
        path: '',      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
            ['/download', '驱动包']
        ]
      },{
        title: '常见问题处理',   // 必要的
        path: '',      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
            ['/Q&A/group%60s%20qq%20Q&A', 'QQ群问题收集'],
            ['/Q&A/dataIntegrationIssues', 'Kettle故障排除']
        ]
      },{
        title: '其他',   // 必要的
        path: '',      // 可选的, 应该是一个绝对路径
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1,    // 可选的, 默认值是 1
        children: [
            ['/todolist', 'toDoList']
        ]
      },
    ]
  }
}

