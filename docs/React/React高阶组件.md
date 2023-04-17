# React高阶组件
高阶组件 `HOC`是一种`React`中用于复用组件逻辑的一种高级技巧，`HOC`自身不是`React API`的一部分，它是一种基于`React`的组合特性而形成的一种设计模式

## 高级组件的定义
`React`文档上也给出了高阶组件的定义，高级组件的接收组件并返回新组件的函数。具体而已，高级组件是参数为组件，返回值为新组件的函数，组件是将`props`转换为`UI`，而高阶组件是将组件转换为另一个组件。`HOC`在`React`的第三方库中很常见，例如`Redux`的`connext`和`Relay`的`createFragmentContainer`

```js
//高阶组件的定义
const higherOrderComponent = (WrappedComponent) => {
  return class EnhancedComponent extends React.Component {
    //....
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
}

//普通组件的定义
class WrappedComponent extends React.Component {
  render(){

  }
}

//返回被高阶组件包装过的增强组件
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```
*注意*，不要试图以任何方式在`HOC`中修改组件原型，而应该使用组合的方式，通过将组件包装在容器组件中实现功能。通常情况下，实现高阶组件的方式有以下两种
* 属性代理
* 反向继承

## 属性代理
当我们可以为传入的组件增加一个存储中的`id`属性值，通过高阶组件我们可以为这个组件新增一个`props`,当然我们也可以对在`jsx`中的`WrappedComponent`中`props`进行操作，注意不是操作传入的`WrappedComponent`类,我们不应该直接修改传入的组件，而可以在组合的过程中对其操作

```js
const HOC = (WrappedComponent, store) => {
  return class EnhancedComponent extends React.Component {
    render() {
      const newProps = {
        id: store.id
      }
      return <WrappedComponent
        {...this.props}
        {...newProps}
      />
    }
  }
}
```
我们也可以利用高阶组件将新组件的状态装入到被包装组件中，例如我们可以使用高阶组件将非受控组件转化为受控组件

```js
class WrappedComponent extends React.Component {
  render() {
    return <input name="name" />;
  }
}

const HOC = (WrappedComponent) => {
  return class EnhancedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { name: "" };
    }
    render() {
      const newProps = {
        values: this.state.name,
        onChange: e => this.setState({name: e.target.value}),
      }
      return <WrappedComponent
        {...this.props}
        {...newProps}
      />
    }
  }
}
```
或者我们的目的是将其使用其他组件包裹起来用以达到布局或者是样式的目的。

```js
const HOC = (WrappedComponent) => {
  return class EnhancedComponent extends React.Component {
    render() {
      return {
        <div>
          <WrappedComponent {...this.props}/>
        </div>
      }
    }
  }
}
```
## 反向继承
反向继承是指返回的组件去继承之前的组件，在反向继承中我们可以做非常多的操作，修改`state`,`props`甚至翻转`Element Tree`，反向继承有一个重要的点，反向继承不能保证完整的子组件树被解析。也就是说解析的元素树中包含了组件(函数类型或者`Class`类型),就不能再操作组件的子组件了。
当我们使用反向继承实现高阶组件的时候可以通过渲染劫持来控制渲染，具体是指我们可以有意识的地控制`WrappedComponent`的渲染过程，从而控制渲染控制的结果，例如我们可以根据部分参数去决定是否渲染组件。

```js
const HOC = (WrappedComponent) => {
  return class EnhancedComponent extends WrappedComponent {
    render() {
      return this.props.isRender && super.render();
    }
  }
}
```
甚至我们可以通过重写的方式劫持原组件的生命周期

```js
const HOC = (WrappedComponent) => {
  return class EnhancedComponent extends WrappedComponent {
    componentDidMount() {
      //.....
    }
    render() {
      return super.render();
    }
  }
}
```
由于实际上是继承关系，我们可以读取组件的`props`和`state`,如果有必要的话，甚至可以修改增加，修改和删除`props`和`state`,当然前提是修改带来的风险需要你自己来控制。在一些情况下，我们可能需要为高阶属性传入一些参数，那我们就可以通过柯里化形式传入参数，配合高阶组件可以完成对组件的类似于闭包的操作

```js
const HOCFactoryFactory = (params) => {
  //此处操作params
  return (WrappedComponent) => {
    return class EnhancedComponent extends WrappedComponent {
      render() {
        return params.isRender && this.props.isRender && super.render();
      }
    }
  }
}
```
## HOC与Mixin
使用`Mixin`与`HOC`都可以用于解决横切关注点相关的问题。
`Mixin`是一种混入的模式，在实际使用中`Mixin`的作用还是非常强大的，能够使得我们在多个组件中共用相同的方法，但同样也会给组件不断增加新的方法和属性，组件本身不仅可以感知，甚至需要做相关的处理(例如命名冲突，状态维护等)，一旦混入的模块变多时，整个组件就变的难以维护，`Mixin`可能会引入不可见的属性，例如在渲染组件中使用`Mixin`可能会相互依赖，相互耦合，不利于代码维护，此外不同的`Mixin`中的方法可能会相互冲突。之前`React`官方建议使用`Mixin`用于解决横切关注点相关的问题，但是由于使用可能产生更多麻烦，现在推荐使用`HOC`
高阶组件`HOC`属于函数式编程`functional programming`思想，对于被包裹的组件是不会感知到高阶组件的存在，而高阶组件返回的组件会在原来的组件上具有功能增强的效果，基于此`React`官方推荐使用高阶组件

## 注意
不要试图在`HOC`中修改组件原型，或以其他方式改变它

```js
function logProps(InputComponent) {
  InputComponent.prototype.componentDidUpdate = function(prevProps) {
    console.log("Current props: ", this.props);
    console.log("Previous props: ", prevProps);
  };
  //返回原始的input组件，其已经被修改
  return InputComponent;
}

const EnhancedComponent = logProps(InputComponent);
```
这样做会产生一些不良后果，其一是输入组件再也无法像HOC增强之前那样使用了，更严重的是，如果你再用另一个同样会修改componentDidUpdate的HOC增强它，那么前面的HOC就会失效，同时这个HOC也无法应用于没有生命周期的函数组件。
修改传入组件的HOC是一种糟糕的抽象方式，调用者必须知道他们是如何实现的，以避免与其他HOC发生冲突。HOC不应该修改传入组件，而应该使用组合的方式，通过将组件包装在容器组件中实现功能。

```js
function logProps(WrappedComponent){
  return class extends React.Componet {
      componentDidUpdate(prevProps) {
      console.log("Current props: ", this.props);
      console.log("Previous props: ", prevProps);
    }
    render() {
        // 将 input 组件包装在容器中，而不对其进行修改，Nice!
      return <WrappedComponent {...this.props} />;
    }
  }
}
```

## 过滤props
`HOC`为组件添加特性，自身不应该大幅度改变约定，`HOC`返回的组件与原组件应保持类似的接口，`HOC`应该透传与自身无关的`props`，大多数`HOC`都应该包含一个类似于下面的`render`方法

```js
render() {
  //过滤掉格外的props，且不要进行透传
  const { extraProp, ...passThroughProps } = this.props;
    // 将 props 注入到被包装的组件中。
  // 通常为 state 的值或者实例方法。
  const injectedProp = someStateOrInstanceMethod;

  // 将 props 传递给被包装组件
  return (
    <WrappedComponent
      injectedProp={injectedProp}
      {...passThroughProps}
    />
  );

}
```

## 最大化可组合性
并不是所有的`HOC`都一样，有时候它仅接收一个参数，也就是被包裹的组件

```js
const NavbarWithRouter = withRouter(Navbar);
```
`HOC`通常可以接收多个参数，比如在`Relay`中`HOC`格外接收了一个配置对象用于指向组件的数据依赖

```js
const CommentWithRelay = Relay.createContainer(Comment, config);
```
最常见的`HOC`签名如下，`connect`是一个返回高阶组件的高阶函数

```js
// React Redux 的 `connect` 函数
const ConnectedComment = connect(commentSelector, commentActions)(CommentList);

// connect 是一个函数，它的返回值为另外一个函数。
const enhance = connect(commentListSelector, commentListActions);
// 返回值为 HOC，它会返回已经连接 Redux store 的组件
const ConnectedComment = enhance(CommentList);
```
这种形式可能看起来令人困惑或不必要，但它有一个有用的属性，像connect函数返回的单参数HOC具有签名Component => Component，输出类型与输入类型相同的函数很容易组合在一起。同样的属性也允许connect和其他HOC承担装饰器的角色。此外许多第三方库都提供了compose工具函数，包括lodash、Redux和Ramda。

```js
const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

// 你可以编写组合工具函数
// compose(f, g, h) 等同于 (...args) => f(g(h(...args)))
const enhance = compose(
  // 这些都是单参数的 HOC
  withRouter,
  connect(commentSelector)
)
const EnhancedComponent = enhance(WrappedComponent)
```

### 不要在render方法中使用HOC
`React`的diff算法使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树，如果从render返回的组件与前一个渲染中的组件相同===，则React通过将子树与新子树进行区分来递归更新子树，如果它们不相等，则完全卸载前一个子树。
通常在使用的时候不需要考虑这点，但对HOC来说这一点很重要，因为这代表着你不应在组件的render方法中对一个组件应用HOC。

```js
render() {
  // 每次调用 render 函数都会创建一个新的 EnhancedComponent
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // 这将导致子树每次渲染都会进行卸载，和重新挂载的操作！
  return <EnhancedComponent />;
}
```
这不仅仅是性能问题，重新挂载组件会导致该组件及其所有子组件的状态丢失，如果在组件之外创建HOC，这样一来组件只会创建一次。因此每次render时都会是同一个组件，一般来说，这跟你的预期表现是一致的。在极少数情况下，你需要动态调用HOC，你可以在组件的生命周期方法或其构造函数中进行调用。

### 务必复制静态方法
有时在`React`组件上定义静态方法很有用，例如`Relay`容器暴露了一个静态方法`getFragment`以方便组合`GraphQL`片段。但是当你将`HOC`应用于组件时，原始组件将使用容器组件进行包装，这意味着新组件没有原始组件的任何静态方法。

```
// 定义静态函数
WrappedComponent.staticMethod = function() {/*...*/}
// 现在使用 HOC
const EnhancedComponent = enhance(WrappedComponent);

// 增强组件没有 staticMethod
typeof EnhancedComponent.staticMethod === "undefined" // true
```

为了解决这个问题，你可以在返回之前把这些方法拷贝到容器组件上。

```
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  // 必须准确知道应该拷贝哪些方法 :(
  Enhance.staticMethod = WrappedComponent.staticMethod;
  return Enhance;
}
```

但要这样做，你需要知道哪些方法应该被拷贝，你可以使用`hoist-non-react-statics`依赖自动拷贝所有非`React`静态方法。

```
import hoistNonReactStatic from "hoist-non-react-statics";
function enhance(WrappedComponent) {
  class Enhance extends React.Component {/*...*/}
  hoistNonReactStatic(Enhance, WrappedComponent);
  return Enhance;
}
```

除了导出组件，另一个可行的方案是再额外导出这个静态方法。

```
// 使用这种方式代替...
MyComponent.someFunction = someFunction;
export default MyComponent;

// ...单独导出该方法...
export { someFunction };

// ...并在要使用的组件中，import 它们
import MyComponent, { someFunction } from "./MyComponent.js";
```

### Refs不会被传递
虽然高阶组件的约定是将所有`props`传递给被包装组件，但这对于`refs`并不适用，那是因为`ref`实际上并不是一个`prop`，就像`key`一样，它是由`React`专门处理的。如果将`ref`添加到`HOC`的返回组件中，则`ref`引用指向容器组件，而不是被包装组件，这个问题可以通过`React.forwardRef`这个`API`明确地将`refs`转发到内部的组件。。

```
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;

      // 将自定义的 prop 属性 “forwardedRef” 定义为 ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // 注意 React.forwardRef 回调的第二个参数 “ref”。
  // 我们可以将其作为常规 prop 属性传递给 LogProps，例如 “forwardedRef”
  // 然后它就可以被挂载到被 LogProps 包裹的子组件上。
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
```