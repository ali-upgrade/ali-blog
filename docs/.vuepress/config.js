module.exports = {
  title: 'Ali-blog',
  theme: 'reco',
  description: '前端',
  base: '/have-advanced/',
  head: [
    ['link', { rel: 'icon', href: '/avatar.png' }]
  ],
  themeConfig: {
    noFoundPageByTencent: false,
    logo: '/hero.png',
    subSidebar: 'auto', 
    nav: [
      { text: "掘金", link: "https://juejin.cn/user/2203854248880109" },
      { text: "Github", link: "https://github.com/aliaqianduan" },
    ],
    sidebar: [
      {
        title: "Ali的进击之路",
        path: '/',
      },
      {
        title: "JavaScript",
        path: "/javascript/valueOf与toString",
        // sidebarDepth: 1,
        // collapsable: false,
        children: [
          { title: "valueOf与toString", path: "/javascript/valueOf与toString" },
          { title: "作用域与作用域链", path: "/javascript/作用域与作用域链" },
          { title: "手写", path: "/javascript/手写" },
          { title: "事件委托", path: "/javascript/事件委托" }
        ],
      },
      {
        title: "HTML",
        // sidebarDepth: 1,
        path: "/html/行内元素和块级元素",
        // collapsable: false,
        children: [
          { title: "行内元素和块级元素", path: "/html/行内元素和块级元素"},
          { title: "localStorage与sessionStorage", path: "/html/localStorage与sessionStorage"},
          { title: "DOCTYPE", path: "/html/DOCTYPE"},
          { title: "BFC,IFC,GFC,FFC", path: "/html/BFCIFC与GFCFFC"},
          { title: "link与@import", path: "/html/link与@import"}
        ]
      },
      {
        title: "React",
        // sidebarDepth: 1,
        path: "/React/受控组件与非受控组件",
        // collapsable: false,
        children: [
          {title: "受控组件与非受控组件", path: "/React/受控组件与非受控组件"},
          {title: "Context与Reducer", path: "/React/Context与Reducer"},
          {title: "React高阶组件", path: "/React/React高阶组件"},
        ]
      },
      {
        title: "Vue",
        // sidebarDepth: 1,
        path: "/vue/$nextTick",
        // collapsable: false,
        children: [
          {title: "$nextTick", path: "/vue/$nextTick"},
          {title: "组件间通讯方式", path: "/vue/组件间通讯方式"},
          {title: "keep-alive", path: "/vue/keep-alive"},
          {title: "VueRouter导航守卫", path: "/vue/VueRouter导航守卫"},
          {title: "v-model数据绑定分析", path: "/vue/v-model数据绑定分析"},
          {title: "vue为何采用异步渲染", path: "/vue/vue为何采用异步渲染"},
        ]
      },
      {
        title: "Webpack",
        path: "/webpack/编写loader",
        // collapsable: false,
        children: [
          {title: "编写loader", path: "/webpack/编写loader"}
        ]
      },
      {
        title: "Browser",
        path: "/Browser/TCP三次握手",
        // collapsable: false,
        children: [
          {title: "TCP三次握手", path: "/Browser/TCP三次握手"},
          {title: "强制缓存与协商缓存", path: "/Browser/强制缓存与协商缓存"},
          {title: "进程与线程", path: "/Browser/进程与线程"},
          {title: "从输入URL到页面展示", path: "/Browser/从输入URL到页面展示"},
          {title: "跨域", path: "/Browser/跨域"}

        ]
      },
    ]
  },
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
}

