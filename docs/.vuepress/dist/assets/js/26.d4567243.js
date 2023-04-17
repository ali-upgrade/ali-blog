(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{424:function(t,a,s){"use strict";s.r(a);var v=s(2),_=Object(v.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"事件委托"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#事件委托"}},[t._v("#")]),t._v(" 事件委托")]),t._v(" "),a("h2",{attrs:{id:"什么是事件流"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是事件流"}},[t._v("#")]),t._v(" 什么是事件流")]),t._v(" "),a("p",[t._v("要理解"),a("code",[t._v("DOM")]),t._v("相关事件，我们先要理解"),a("code",[t._v("事件流")]),t._v("这个概念，事件流描述的是从页面中接收事件的顺序")]),t._v(" "),a("ul",[a("li",[t._v("事件冒泡：事件开始由最具体的元素接收，然后逐级向上传播到较为不具体的节点或文档")]),t._v(" "),a("li",[t._v("事件捕获：事件开始由不太具体的节点接收，然后逐级向下传播到最具体的节点。它与事件冒泡是个相反的过程")])]),t._v(" "),a("p",[a("code",[t._v("DOM2")]),t._v("级事件规定的事件流包括三个阶段: 事件捕获，目标阶段，事件冒泡")]),t._v(" "),a("h2",{attrs:{id:"事件委托-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#事件委托-2"}},[t._v("#")]),t._v(" 事件委托")]),t._v(" "),a("p",[t._v("事件委托，通俗的说就是将元素的事件委托给它的父级或者更外级的元素处理，它的实现机制就是事件冒泡。由于事件会在冒泡阶段向上传递到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子节点的事件。")]),t._v(" "),a("h2",{attrs:{id:"优点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#优点"}},[t._v("#")]),t._v(" 优点")]),t._v(" "),a("ul",[a("li",[t._v("减少内存消耗和dom操作，提供性能在JS中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能，因为需要不断的操作dom，那么引起浏览器重绘和回流的可能也就越多，页面交互的事件也就变的越长，这也就是为什么要减少dom操作的原因。每一个事件处理函数，都是一个对象，多一个事件处理函数，内存中就会被多占用一部分空间。如果要用事件委托，就会将所有的操作放到JS程序中，只对它的父级进行操作，与dom的操作就只需要交互一次，这样就能大大的减少与dom的交互次数，提供性能")]),t._v(" "),a("li",[t._v("动态绑定事件因为事件绑定在父级元素所以新增的元素也能触发相同的事件")])])])}),[],!1,null,null,null);a.default=_.exports}}]);