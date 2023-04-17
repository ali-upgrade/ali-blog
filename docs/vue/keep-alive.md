# keep-alive
`keep-alive`怎么缓存组件的，缓存后又是怎么更新的？
其实这个问题在项目中很常见，因为`keep-alive`可以很好的缓存我们的组件，是性能优化常见的一点。
* 缓存可用keep-alive的作用与用法
* 使用细节，如缓存指定/排除，结合router和transition
* 组件缓存后更新可以利用activated或者beforeRouteEnter

## 用法
开发中缓存组件使用`keep-alive`组件，`keep-alive`是vue内置组件，keep-alive包裹动态组件`component`时，会缓存不活动的组件实例，而不是销毁它们，这样在组件切换过程中将状态保留在内存中，防止重复渲染`DOM`。

```js
<keep-alive>
  <component :is="view" />
</keep-alive>
```
结合属性`include`和`exclude`可以明确指定缓存那些组件或排除缓存指定组件。vue3中结合`vue-router`时变化较大，之前是`keep-alive`包裹`router-view`，现在需要反过来用`router-view`包裹`keep-alive`。

```js
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component"/>
  </keep-alive>
</router-view>
```
keep-alive的中缓存的时候还运用了`LRU`算法

## 缓存后获取数据
* `beforeRouteEnter` 在`vue-router`的项目中，每次进入路由的时候，都会执行
```js
beforeRouteEnter(to, from, next) {
  next(vm => {
    vm.getData() //获取数据
  })
}
```

* `actived` 在`keep-alive`缓存的组件被激活的时候，都会执行actived钩子
```js
activated() {
  this.getData()
}
```
`keep-alive`是一个通用组件，它内部定义了一个map,缓存创建过的组件实例，它返回的渲染函数内部会查找内嵌的`component`组件对应组件的`vnode`,如果该组件在`map`中存在就直接返回它。由于`component`的`is`属性是个响应式数据，因此只要它变化，`keep-alive`的`render`函数就会重新执行

## 场景
有一个可以进行筛选的列表页List.vue，点击某一项时进入相应的详情页面，等到你从详情页返回List.vue时，发现列表页居然刷新了！刚刚的筛选条件都没了！！！

keep-alive是什么？

* keep-alive本身不会渲染出来，也不会出现在父组件链中
* keep-alive包裹动态组件时，会缓存不活动的组件，而不是销毁它们
* 缓存组件，可提升性能（比如某宝的宝贝，进入详情页，每次都是同一个物品，那不需要请求接口，直接缓存组件，当然，如果不是同一个就调接口）

### 怎么用?
#### 参数
* `include`：可传字符串、正则表达式、数组，名称匹配成功的组件会被缓存
* `exclude`：可传字符串、正则表达式、数组，名称匹配成功的组件不会被缓存
* `max`：可传数字，限制缓存组件的最大数量，超过max则按照LRU算法进行置换
#### 生命周期
* `activated`： 页面第一次进入的时候
* `mounted`
* `deactivated`: 页面退出的时候会触发deactivated
当再次前进或者后退的时候只触发activated。
使用keep-alive会将数据保留在内存中，如果要在每次进入页面的时候获取最新的数据，需要在activated阶段获取数据，承担原来created钩子中获取数据的任务。
那么，我们一般会在动态组件、路由组件去用到keep-alive组件。

动态组件
```js
<keep-alive :include="allowList" :exclude="noAllowList" :max="amount"> 
    <component :is="currentComponent"></component> 
</keep-alive>
```

路由组件
```js
<keep-alive :include="allowList" :exclude="noAllowList" :max="amount">
    <router-view></router-view>
</keep-alive>
```