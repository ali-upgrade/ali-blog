# v-model数据绑定分析
v-model是Vue提供的指令，其主要作用是可以实现在表单`<input>`、`<textarea>`及`<select>`等元素以及组件上创建双向数据绑定，其本质上就是一种语法糖，既可以直接定义在原生表单元素，也可以支持自定义组件。在组件的实现中，可以配置子组件接收的prop名称，以及派发的事件名称实现组件内的v-model双向绑定。

## 描述
可以用`v-model`指令在表单`<input>`、`<textarea>`及`<select>`元素上创建双向数据绑定，其会根据控件类型自动选取正确的方法来更新元素，以`<input>`作为示例使用v-model。

```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>V-model</title>
</head>

<body>
  <div id="app"></div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script type="text/javascript">
  var app = new Vue({
    el: "#app",
    data: {
      msg: ""
    },
    template: `
    <div>
        <div>Message is: {{ msg }}</div>
        <input v-model="msg">
    </div>
    `
  })
</script>

</html>
```
当使用`v-model`语法糖时，可以自行实现一个双向绑定，实际上`v-model`在内部为不同的输入元素使用不同的`property`并抛出不同的事件
* `input`和`textarea`元素使用`value property`和`input`事件
* `checkbox`和`radio`元素使用`checked property`和`change`事件
* `select`元素将`value`作为`prop`并将`change`作为事件

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>V-model</title>
</head>

<body>
  <div id="app"></div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script type="text/javascript">
  var app = new Vue({
    el: "#app",
    data: {
      msg: ""
    },
    template: `
    <div>
        <div>Message is: {{ msg }}</div>
        <input :value="msg" @input="event => msg = event.target.value">
    </div>
    `
  })
</script>

</html>
```
对于`v-model`还有修饰符用以控制用户输入:
* `.trim`:输入首尾空格过滤
* `.lazy`:取代`input`事件而监听`change`事件
* `.number`:输入字符串转为有效的数字，如果这个值无法被`parseFloat()`解析，则会返回原始的值

```js
<!DOCTYPE html>
<html>
<head>
    <title>Vue</title>
</head>
<body>
    <div id="app"></div>
</body>
<script src="https://cdn.bootcss.com/vue/2.4.2/vue.js"></script>
<script type="text/javascript">
    var vm = new Vue({
        el: "#app",
        data: {
            msg: 0
        },
        template: `
            <div>
                <div>Message is: {{ msg }}</div>
                <div>Type is: {{ typeof(msg) }}</div>
                <input v-model.number="msg" type="number">
            </div>
        `
    })
</script>
</html>
```
## 组件
当使用自定义组件时，在组件上的`v-model`默认会利用名为`modelValue`的`prop`和名为`update:modelValue`事件
```js
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>V-model</title>
</head>

<body>
  <div id="app"></div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script type="text/javascript">
  var app = new Vue({
    el: "#app",
    data: {
      msg: ""
    },
    template: `
    <div>
        <div>Message is: {{ msg }}</div>
        <input :value="msg" @input="event => msg = event.target.value">
    </div>
    `
  })
  Vue.component("u-input", {
    model: {
            prop: "message",
            event: "input"
        },
        props: {
            message: { 
                type: String
            },
        },
        template: `
            <div>
                <input :value="message" @input="$emit('input', $event.target.value)">
            </div>
        `
  })
</script>

</html>
```
# .sync
作用： .sync修饰符可以实现子组件与父组件的双向绑定，并且可以实现子组件同步修改父组件的值

## 本质
```js
// 正常父传子： 
<son :a="num" :b="num2"></son>

// 加上sync之后父传子： 
<son :a.sync="num" .b.sync="num2"></son> 

// 它等价于
<son
  :a="num" @update:a="val=>num=val"
  :b="num2" @update:b="val=>num2=val"></son> 

// 相当于多了一个事件监听，事件名是update:a，回调函数中，会把接收到的值赋值给属性绑定的数据项中。
```

vue3中model:name等等效name.sync



