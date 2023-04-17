# BFC,IFC,GFC,FFC

## BOX
* `block-level BOX`: 当元素的CSS属性display为block， list-item或table时，它是块级元素`block-level`。块级元素视觉上呈为块，竖直排列。每个块级元素至少生成一个块级盒`block-level Box`参与BFC,称为主要块级盒`principal block-level box`。一些元素，比如`li`，生成额外的盒来放置项目符号，不过多数元素只生成一个主要块级盒
* `lnline-level BOX`: 当元素的 CSS 属性 display 的计算值为 inline, inline-block 或 inline-table 时，称它为行内级元素。视觉上它将内容与其它行内级元素排列为多行。典型的如段落内容，有文本或图片，都是行内级元素。行内级元素生成行内级盒(inline-level boxes)，参与行内格式化上下文 IFC 。
* `flex container`: 当元素的 CSS 属性 display 的计算值为 flex 或 inline-flex ，称它为弹性容器。display:flex这个值会导致一个元素生成一个块级（block-level）弹性容器框。display:inline-flex这个值会导致一个元素生成一个行内级（inline-level）弹性容器框。
* `grid container`: 当元素的 CSS 属性 display 的计算值为 grid 或 inline-grid，称它为栅格容器

## 块容器盒`block container BOX`
只包含其他块级盒，或生成一个行内格式化上下文`IFC`,只包含行内盒的叫做块容器盒子。也就是说，块容器要么只包含行内盒子，要么只包含块级盒
* 块级盒`block-level Box`是描述元素跟它的父元素或兄弟元素之间的表现
* 块容器盒`block container box`描述元素跟它的后代之间的影响
  
## 块盒`Block Boxes`
同时是块容器的块级盒称为块盒

## 行盒`Line Boxes`
行盒由行内格式化上下文产生的盒，用于表示一行。在块盒里面，行盒从块盒一边排版到另一边。 当有浮动时, 行盒从左浮动的最右边排版到右浮动的最左边。


## BFC块级格式化上下文
BFC它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，Block Formatting Context提供了一个环境，HTML在这个环境中按照一定的规则进行布局。

### 如何触发BFC?
* 根元素或其他包含它的元素
* 浮动float: left/right,inherit
* 绝对定位元素position: absolute/flexd
* 行内块 display: inline-block
* 表格单元格 display： table-cell
* 表格标题 display: table-caption
* 溢出元素 overflow: hidden/scroll/auto/inherit
* 弹性盒子 display: flex/inline-flex

### BFC布局规则
* 内部的BOX会在垂直方向，一个接一个放置
* Box垂直方向的距离由margin决定。同一个BFC的两个相邻BOX的margin会发生重叠
* 每个元素的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
* BFC的区域不会与float box重叠。
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
* 计算BFC的高度时，浮动元素也参与计算

### BFC应用场景
* 解决块级元素垂直方向margin重叠
* 解决高度塌陷问题
* 清除浮动

## IFC 行内级格式化上下文

### 如何触发IFC？
块级元素中仅包含内联级别元素

形成条件非常简单，需要注意的是当IFC中有块级元素插入时，会产生两个匿名块将父元素分割开来，产生两个IFC。

### IFC布局规则
* 在一个IFC内，子元素是水平方向横向排列的，并且垂直方向起点为元素顶部。
* 子元素只会计算横向样式空间，【padding、border、margin】，垂直方向样式空间不会被计算，【padding、border、margin】。
* 在垂直方向上，子元素会以不同形式来对齐（vertical-align）
* 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块（containing box）和与其中的浮动来决定。
* IFC中的line box一般左右边贴紧其包含块，但float元素会优先排列。
* IFC中的line box高度由 CSS 行高计算规则来确定，同个IFC下的多个line box高度可能会不同
* 当 inline boxes的总宽度少于包含它们的line box时，其水平渲染规则由 text-align 属性值来决定。
* 当一个inline box超过父元素的宽度时，它会被分割成多个boxes，这些boxes分布在多个line box中。如果子元素未设置强制换行的情况下，inline box将不可被分割，将会溢出父元素。

### IFC应用场景
* 元素水平居中 当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。
* 多行文本水平垂直居中创建一个IFC，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

## GFC 栅格格式化上下文

### 如何触发GFC
当为一个元素设置display值为grid或者inline-grid的时候，此元素将会获得一个独立的渲染区域

### GFC布局规则
通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列（grid definition columns）属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间（具体可以在MDN上查看）

### 应用场景
* 任意魔方布局

## FFC 弹性格式化上下文

### 如何触发FFC
当 display 的值为 flex 或 inline-flex 时，将生成弹性容器（Flex Containers）, 一个弹性容器为其内容建立了一个新的弹性格式化上下文环境（FFC）

### FFC布局规则
设置为 flex 的容器被渲染为一个块级元素
设置为 inline-flex 的容器被渲染为一个行内元素
弹性容器中的每一个子元素都是一个弹性项目。弹性项目可以是任意数量的。弹性容器外和弹性项目内的一切元素都不受影响。简单地说，Flexbox 定义了弹性容器内弹性项目该如何布局

### FFC应用场景
这里只介绍它对于其它布局所相对来说更方便的特点，其实flex布局现在是非常普遍的，很多前端人员都喜欢用flex来写页面布局，操作方便且灵活，兼容性好。
* 自动撑开剩余高度/宽度


## 总结
一般来说，FFC能做的事情，通过GFC都能搞定，反过来GFC能做的事通过FFC也能实现。
通常弹性布局使用FFC，二维网格布局使用GFC，所有的FFC与GFC也是一个BFC，在遵循自己的规范的情况下，向下兼容BFC规范。
现在所有的FC都介绍完了，了解清楚的去奖励自己一顿KFC吧😄～