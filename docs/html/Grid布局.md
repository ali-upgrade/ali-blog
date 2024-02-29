# Grid布局
Grid布局与flex布局的差别:
* flex是一维布局，一次只能出来一个维度上的元素布局，一行或者一列，支持对齐和分布
* Grid是二维布局，将容器划分成了行和列的网格，并能够精准地控制每个网格的大小和位置，更适合创建复杂的布局

## 基本实现

grid-template-columns 属性设置列宽，grid-template-rows 属性设置行高，这两个属性在 Grid 布局中尤为重要，它们的值是有多种多样的，而且它们的设置是比较相似的，下面针对 grid-template-columns 属性进行讲解

repeat() 函数：可以简化重复的值。该函数接受两个参数，第一个参数是重复的次数，第二个参数是所要重复的值。比如上面行高都是一样的，我们可以这么去实现，实际效果是一模一样的

auto-fill 关键字：表示自动填充，让一行（或者一列）中尽可能的容纳更多的单元格。grid-template-columns: repeat(auto-fill, 200px) 表示列宽是 200 px，但列的数量是不固定的，只要浏览器能够容纳得下，就可以放置元素，代码以及效果如下图所示

grid-template-rows: repeat(2, 50px);
grid-template-columns: repeat(auto-fill, 200px)

fr 关键字：Grid 布局还引入了一个另外的长度单位来帮助我们创建灵活的网格轨道。fr 单位代表网格容器中可用空间的一等份。grid-template-columns: 200px 1fr 2fr 表示第一个列宽设置为 200px，后面剩余的宽度分为两部分，宽度分别为剩余宽度的 1/3 和 2/3。

minmax() 函数：我们有时候想给网格元素一个最小和最大的尺寸，minmax() 函数产生一个长度范围，表示长度就在这个范围之中都可以应用到网格项目中。它接受两个参数，分别为最小值和最大值。grid-template-columns: 1fr 1fr minmax(300px, 2fr) 的意思是，第三个列宽最少也是要 

auto 关键字：由浏览器决定长度。通过 auto 关键字，我们可以轻易实现三列或者两列布局。grid-template-columns: 100px auto 100px 表示第一第三列为 100px，中间由浏览器决定长度
```html
<div class="container">
  <div class="item one">Item one</div>
  <div class="item two">Item two</div>
  <div class="item third">Item third</div>
  <div class="item one">Item four</div>
  <div class="item two">Item five</div>
  <div class="item third">Item six</div>
</div>


<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;  // 网格容器将被分成三个相等的列
    grid-template-rows: auto;  // 行
  }
  .item {
    margin: 20px;
    padding: 20px;
    height: 80px;
    line-height: 80px;
  }
  .one {
    background-color: #c9eccb;
  }
  .two {
    background-color: #c7e7e9;
  }
  .third {
    background-color: #b2ede2;
  }
</style>
```
grid-row-gap: 10px 表示行间距是 10px，grid-column-gap: 20px 表示列间距是 20px。grid-gap: 10px 20px 实现的效果是一样的
grid-template-areas 属性用于定义区域，一个区域由一个或者多个单元格组成

```css
.wrapper {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 120px  120px  120px;
  grid-template-areas:
    ". header  header"
    "sidebar content content";
  background-color: #fff;
  color: #444;
}

```

grid-auto-flow  属性控制着自动布局算法怎样运作，精确指定在网格中被自动布局的元素怎样排列。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行，即下图英文数字的顺序 one,two,three...。这个顺序由 grid-auto-flow 属性决定，默认值是 row。
pgsql复制代码

```css
.wrapper {
  display: grid;
  grid-template-columns: 100px 200px 100px;
  grid-auto-flow: row;
  grid-gap: 5px;
  grid-auto-rows: 50px;
}

```

justify-items 属性设置单元格内容的水平位置（左中右），align-items 属性设置单元格的垂直位置（上中下）

```css
.container {
  justify-items: start | end | center | stretch;
  align-items: start | end | center | stretch;
}

```

justify-content 属性是整个内容区域在容器里面的水平位置（左中右），align-content 属性是整个内容区域的垂直位置（上中下）


```css
.container {
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;  
}

```
隐式和显式网格：显式网格包含了你在 grid-template-columns 和 grid-template-rows 属性中定义的行和列。如果你在网格定义之外又放了一些东西，或者因为内容的数量而需要的更多网格轨道的时候，网格将会在隐式网格中创建行和列

那么它的行高和列宽可以根据 grid-auto-columns 属性和 grid-auto-rows 属性设置。它们的写法和grid-template-columns 和 grid-template-rows 完全相同。如果
不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行高


### 项目属性
grid-column-start 属性：左边框所在的垂直网格线
grid-column-end 属性：右边框所在的垂直网格线
grid-row-start 属性：上边框所在的水平网格线
grid-row-end 属性：下边框所在的水平网格线