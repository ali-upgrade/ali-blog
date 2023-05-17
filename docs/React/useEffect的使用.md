# 不要滥用useEffect
当我们使用useEffect时：
* 希望a的变化后发起请求，使用useEffect

```js
useEffect(() => {
  fetch(xxx);
}, [a])

```

这段代码是没有问题的，但是随着需求不断迭代，其他地方也会修改状态a，但是此时我们并不希望发起请求，因此只能在useEffect中增加条件判断

```js
useEffect(() => {
  if (xxxx) {
    fetch(xxx);
  }
}, [a])
```
某一天，需求又变化了！现在请求还需要b字段。这很简单，你顺手就将b作为useEffect的依赖加了进去

```js
useEffect(() => {
  if (xxxx) {
    fetch(xxx);
  }
}, [a, b])
```

随着时间推移，你逐渐发现：

* 是否发送请求与if条件相关

* 是否发送请求还与a、b等依赖项相关

* a、b等依赖项又与很多需求相关

根本分不清到底什么时候会发送请求，真是头大...

React中有两个重要的概念：
* Rendering code(渲染代码)
* Event handlers(事件处理器)
Rendering code指开发者编写的组件渲染逻辑，最终会返回一段JSX。
比如，如下组件内部就是Rendering code：

```js
function App() {
  const [name, update] = useState('KaSong');
  
  return <div>Hello {name}</div>;
}
```
Rendering code的特点是：他应该是*不带副作用的纯函数*。

## 处理副作用
Event handlers是组件内部包含的函数，用于执行用户操作，可以包含副作用。
下面这些操作都属于Event handlers：

* 更新input输入框
* 提交表单
* 导航到其他页面

```js
function App() {
  const [name, update] = useState('KaSong');
  
  const changeName = () => {
    update('KaKaSong');
  }
  
  return <div onClick={changeName}>Hello {name}</div>;
}
```
但是，并不是所有副作用都能在Event handlers中解决。
比如，在一个聊天室中，发送消息是用户触发的，应该交给Event handlers处理。
除此之外，聊天室需要随时保持和服务端的长连接，保持长连接的行为属于副作用，但并不是用户行为触发的。
对于这种：在视图渲染后触发的副作用，就属于effect，应该交给useEffect处理。
回到开篇的例子：
当你希望状态a变化后发起请求，首先应该明确，你的需求是：
状态a变化，接下来需要发起请求
还是
某个用户行为需要发起请求，请求依赖状态a作为参数？
如果是后者，这是用户行为触发的副作用，那么相关逻辑应该放在Event handlers中。
* 假设之前的代码逻辑是：
* 点击按钮，触发状态a变化
* useEffect执行，发送请求
应该修改为：
* 点击按钮，在事件回调中获取状态a的值
* 在事件回调中发送请求

经过这样修改，状态a变化与发送请求之间不再有因果关系，后续对状态a的修改不会再有无意间触发请求的顾虑。

## 总结
当我们编写组件时，应该尽量将组件编写为纯函数。
对于组件中的副作用，首先应该明确：、

*是用户行为触发的还是视图渲染后主动触发的？*

* 对于前者，将逻辑放在Event handlers中处理。
* 对于后者，使用useEffect处理。
