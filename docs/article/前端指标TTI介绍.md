# 前端指标TTI介绍

TTI（Time To Interactive，即可交互时间）是衡量网页加载性能的重要指标之一，表示页面从开始加载到**主要子资源完成渲染**、用户能够可靠地与页面交互（如点击按钮、输入文本）的时间。计算TTI通常需要借助浏览器API或性能监测工具，以下是具体方法和步骤：

---

### **1. 核心定义**
TTI的标准定义需满足以下条件：
- **页面已显示有用内容**（即FCP，首次内容渲染已完成）。
- **大多数可见的页面元素已可交互**（DOM事件绑定完成）。
- **主线程处于空闲状态**（无长任务阻塞，通常指任务耗时≤50ms）。

---

### **2. 手动计算TTI的步骤**
#### **方法一：使用Chrome DevTools的Performance面板**
1. 打开Chrome浏览器，按 `F12` 进入开发者工具。
2. 切换到 **Performance** 面板，点击录制按钮后刷新页面。
3. 停止录制后，分析时间轴：
   - 找到 **FCP（First Contentful Paint）** 的时间点。
   - 向后查找 **第一个主线程空闲期（无长任务）**，且持续至少5秒的安静窗口。
   - TTI ≈ FCP之后 **最后一个长任务结束的时间**。

#### **方法二：使用Web Vitals JavaScript库**
```javascript
import {getTTI} from 'web-vitals';

getTTI((tti) => {
  console.log('TTI:', tti);
});
```
此库会自动计算TTI并返回结果。

#### **方法三：Lighthouse自动化工具**
运行Lighthouse审计（通过Chrome DevTools或命令行）：
```bash
lighthouse https://example.com --output=json --quiet
```
在生成的JSON报告中查找 `timing.tti` 字段。

---

### **3. 关键指标关联**
- **FCP（首次内容渲染）**：TTI必须发生在FCP之后。
- **长任务（Long Tasks）**：任何执行时间超过50ms的任务会延迟TTI。
- **DOMContentLoaded事件**：TTI通常在其之后，但二者不一定同步。

---

### **4. 优化TTI的建议**
- **减少JavaScript阻塞**：代码拆分、延迟加载非关键JS。
- **压缩资源**：缩小JS/CSS文件，提升下载速度。
- **预加载关键资源**：使用 `<link rel="preload">`。
- **优化主线程**：避免复杂同步操作，使用Web Worker。

---

### **示例结果**
- **良好**：TTI ≤ 3.8秒（移动端）。
- **需改进**：TTI > 3.8秒但 ≤ 7.3秒。
- **差**：TTI > 7.3秒。

---

通过上述工具和方法，可以准确测量并优化TTI，提升用户体验。如果需要更深入的性能分析，建议结合其他指标（如TBT、CLS）综合评估。