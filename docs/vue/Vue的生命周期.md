# Vue的生命周期
* setup
* onBeforeMount
* onMounted
* onBeforeUpdate
* onUpdated
* onBeforeUnmount
* onUnmounted
* onActivated
* onDeactivated
* onErrorCaptured
* onRenderTracked
* onRenderTriggered


## Vue父子组件生命周期
Vue实例需要经过创建、初始化数据、编译模板、挂载DOM、渲染、更新、渲染、卸载等一系列过程，这个过程就是Vue的生命周期，Vue中提供的钩子函数有beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、beforeDestroy、destroyed，父子组件嵌套时，父组件和子组件各拥有各自独立的钩子函数。

### 创建过程
创建过程主要涉及beforeCreate、created、beforeMount、mounted四个钩子函数。
```
Parent beforeCreate -> Parent Created -> Parent BeforeMount -> Child BeforeCreate -> Child Created -> Child BeforeMount -> Child Mounted -> Parent Mounted
```
### 更新过程
更新过程主要涉及beforeUpdate、updated两个钩子函数，当父子组件有数据传递时才会有生命周期的比较。
```
Parent BeforeUpdate -> Child BeforeUpdate -> Child Updated -> Parent Updated
```
### 销毁过程
销毁过程主要涉及beforeDestroy、destroyed两个钩子函数，本例直接调用vm.$destroy()销毁整个实例以达到销毁父子组件的目的。
```
Parent BeforeDestroy -> Child BeforeDestroy -> Child Destroyed -> Parent Destroyed
```
### 例子
```js
<!DOCTYPE html>
<html>

<head>
    <title>Vue父子组件生命周期</title>
</head>

<body>
    <div id="app"></div>
</body>
<script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
<script type="text/javascript">
    Vue.component("counter", {
        props: {
            count: { 
                type: Number,
                default: 0
            },
        },
        beforeCreate: function() {
            console.log("Child", "BeforeCreate");
        },
        created: function() {
            console.log("Child", "Created");
        },
        beforeMount: function() {
            console.log("Child", "BeforeMount");
        },
        mounted: function() {
            console.log("Child", "Mounted");
        },
        beforeUpdate: function() {
            console.log("Child", "BeforeUpdate");
        },
        updated: function() {
            console.log("Child", "Updated");
        },
        beforeDestroy: function() {
            console.log("Child", "BeforeDestroy");
        },
        destroyed: function() {
            console.log("Child", "Destroyed");
        },
        template: `
            <div>
                <div>{{count}}</div>
            </div>
        `
    })
    var vm = new Vue({
        el: '#app',
        data: function(){
            return {
                count: 1
            }
        },
        beforeCreate: function() {
            console.log("Parent", "BeforeCreate");
        },
        created: function() {
            console.log("Parent", "Created");
        },
        beforeMount: function() {
            console.log("Parent", "BeforeMount");
        },
        mounted: function() {
            console.log("Parent", "Mounted");
        },
        beforeUpdate: function() {
            console.log("Parent", "BeforeUpdate");
        },
        updated: function() {
            console.log("Parent", "Updated");
        },
        beforeDestroy: function() {
            console.log("Parent", "BeforeDestroy");
        },
        destroyed: function() {
            console.log("Parent", "Destroyed");
        },
        template: `
            <div>
                <counter :count="count"></counter> 
                <button @click="count++">++</button>
            </div>
        `
    })
</script>

</html>

```