# CSS grid 详解

# CSS Grid 布局详解

CSS Grid 布局（网格布局）是 CSS 中一种强大的二维布局系统，它允许开发者在行和列两个维度上创建复杂的网页布局。相比传统的布局方法（如浮动、定位等）和 Flexbox（一维布局），Grid 提供了更直观、更灵活的方式来设计网页结构。

## 基本概念

### 1. 网格容器 (Grid Container)

通过将元素的 `display` 属性设置为 `grid` 或 `inline-grid` 来创建一个网格容器：

```css
.container {
  display: grid;
}
```

### 2. 网格项 (Grid Items)

网格容器的直接子元素自动成为网格项。

### 3. 网格线 (Grid Lines)

网格线是构成网格结构的分界线，有水平的行网格线和垂直的列网格线。

### 4. 网格轨道 (Grid Tracks)

网格轨道是两条相邻网格线之间的空间，分为行轨道和列轨道。

### 5. 网格单元格 (Grid Cell)

四条网格线包围的最小单位空间。

### 6. 网格区域 (Grid Area)

由一个或多个网格单元格组成的矩形区域。

## 主要属性

### 容器属性

#### 定义网格

```css
.container {
  display: grid | inline-grid;
  
  /* 显式定义列 */
  grid-template-columns: 100px 100px 200px;
  
  /* 显式定义行 */
  grid-template-rows: 80px auto 120px;
  
  /* 简写方式 */
  grid-template: 
    "header header header" 80px
    "main main sidebar" auto
    "footer footer footer" 120px
    / 100px 100px 200px;
}
```

#### 重复模式

```css
.container {
  /* 重复3列，每列1fr */
  grid-template-columns: repeat(3, 1fr);
  
  /* 复杂重复模式 */
  grid-template-columns: repeat(2, 100px 50px);
}
```

#### 间距

```css
.container {
  /* 行间距 */
  row-gap: 20px;
  
  /* 列间距 */
  column-gap: 15px;
  
  /* 简写 */
  gap: 20px 15px;
}
```

#### 自动填充与适应

```css
.container {
  /* 自动填充尽可能多的列，每列最小200px，最大1fr */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  
  /* 自动适应列数，确保内容不溢出 */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

#### 隐式网格

```css
.container {
  /* 隐式行的大小 */
  grid-auto-rows: minmax(100px, auto);
  
  /* 隐式列的创建方向 */
  grid-auto-flow: row | column | row dense | column dense;
}
```

### 项目属性

#### 位置控制

```css
.item {
  /* 基于网格线定位 */
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 4;
  
  /* 简写 */
  grid-column: 1 / 3;
  grid-row: 2 / 4;
  
  /* 跨越多个轨道 */
  grid-column: span 2;
  
  /* 基于命名区域定位 */
  grid-area: header;
}
```

#### 对齐方式

```css
.item {
  /* 单元格内水平对齐 */
  justify-self: start | end | center | stretch;
  
  /* 单元格内垂直对齐 */
  align-self: start | end | center | stretch;
  
  /* 简写 */
  place-self: center stretch;
}
```

## 命名网格

### 命名网格线

```css
.container {
  grid-template-columns: [first] 100px [line2] 100px [end];
  grid-template-rows: [row1-start] 80px [row1-end] auto [last-line];
}
```

### 命名网格区域

```css
.container {
  grid-template-areas: 
    "header header header"
    "main main sidebar"
    "footer footer footer";
}

.header { grid-area: header; }
.main { grid-area: main; }
.sidebar { grid-area: sidebar; }
.footer { grid-area: footer; }
```

## 实际应用示例

### 经典布局

```css
.container {
  display: grid;
  grid-template: 
    "header header header" 80px
    "nav main aside" 1fr
    "footer footer footer" 60px
    / 200px 1fr 200px;
  gap: 15px;
  height: 100vh;
}

header { grid-area: header; }
nav { grid-area: nav; }
main { grid-area: main; }
aside { grid-area: aside; }
footer { grid-area: footer; }
```

### 响应式网格

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}
```

## 浏览器支持

现代浏览器对 Grid 布局的支持良好：
- Chrome 57+ (2017)
- Firefox 52+ (2017)
- Safari 10.1+ (2017)
- Edge 16+ (2017)
- Opera 44+ (2017)

对于旧版浏览器，可以使用特性查询提供回退方案：

```css
@supports (display: grid) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

@supports not (display: grid) {
  .container {
    display: flex;
    flex-wrap: wrap;
  }
  .container > * {
    flex: 1 1 50%;
  }
}
```

## 总结

CSS Grid 布局提供了强大的二维布局能力，特别适合构建复杂的网页结构。它与 Flexbox 可以很好地配合使用 - Grid 用于整体布局，Flexbox 用于组件内部布局。掌握 Grid 布局可以大大提高前端开发的效率和灵活性。