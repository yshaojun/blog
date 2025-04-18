# React API 全面介绍

# React API 全面介绍

React 是一个用于构建用户界面的 JavaScript 库，它提供了一系列 API 来帮助开发者构建组件化、高效的应用。以下是 React API 的系统性介绍：

## 核心 API

### 1. 组件类 API

#### 类组件 API
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { /* 初始状态 */ };
  }

  componentDidMount() { /* 挂载后执行 */ }
  componentDidUpdate() { /* 更新后执行 */ }
  componentWillUnmount() { /* 卸载前执行 */ }
  
  render() {
    return <div>{/* JSX */}</div>;
  }
}
```

#### 类组件生命周期
- **挂载阶段**:
  - `constructor()`
  - `static getDerivedStateFromProps()`
  - `render()`
  - `componentDidMount()`

- **更新阶段**:
  - `static getDerivedStateFromProps()`
  - `shouldComponentUpdate()`
  - `render()`
  - `getSnapshotBeforeUpdate()`
  - `componentDidUpdate()`

- **卸载阶段**:
  - `componentWillUnmount()`

- **错误处理**:
  - `static getDerivedStateFromError()`
  - `componentDidCatch()`

### 2. 函数组件与 Hooks API

#### 基础 Hooks
- `useState`: 管理组件状态
  ```jsx
  const [state, setState] = useState(initialState);
  ```

- `useEffect`: 处理副作用
  ```jsx
  useEffect(() => {
    // 副作用逻辑
    return () => { /* 清理函数 */ };
  }, [dependencies]);
  ```

- `useContext`: 访问 Context
  ```jsx
  const value = useContext(MyContext);
  ```

#### 额外 Hooks
- `useReducer`: 复杂状态逻辑
  ```jsx
  const [state, dispatch] = useReducer(reducer, initialArg, init);
  ```

- `useCallback`: 记忆化回调函数
  ```jsx
  const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);
  ```

- `useMemo`: 记忆化计算结果
  ```jsx
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  ```

- `useRef`: 创建可变引用
  ```jsx
  const refContainer = useRef(initialValue);
  ```

- `useImperativeHandle`: 自定义暴露给父组件的实例值
  ```jsx
  useImperativeHandle(ref, () => ({ focus: () => { /* ... */ } }));
  ```

- `useLayoutEffect`: 类似 useEffect，但在 DOM 更新后同步触发
- `useDebugValue`: 在 React DevTools 中显示自定义 hook 的标签

## 高级 API

### 1. Context API
```jsx
const MyContext = React.createContext(defaultValue);

<MyContext.Provider value={/* 某个值 */}>
  {/* 子组件 */}
</MyContext.Provider>
```

### 2. Refs API
- `React.createRef`: 创建 ref 对象
  ```jsx
  class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
    render() {
      return <div ref={this.myRef} />;
    }
  }
  ```

- `React.forwardRef`: 转发 ref
  ```jsx
  const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="fancy">
      {props.children}
    </button>
  ));
  ```

### 3. 性能优化 API
- `React.memo`: 记忆化组件
  ```jsx
  const MyComponent = React.memo(function MyComponent(props) {
    /* 使用 props 渲染 */
  });
  ```

- `React.lazy` + `Suspense`: 懒加载组件
  ```jsx
  const OtherComponent = React.lazy(() => import('./OtherComponent'));

  function MyComponent() {
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </React.Suspense>
    );
  }
  ```

### 4. 其他高级 API
- `React.cloneElement`: 克隆并返回新的 React 元素
- `React.isValidElement`: 验证对象是否为 React 元素
- `React.Children`: 操作子元素的工具方法
  - `React.Children.map`
  - `React.Children.forEach`
  - `React.Children.count`
  - `React.Children.only`
  - `React.Children.toArray`

## React DOM API

### 1. 渲染 API
- `ReactDOM.render`: 渲染 React 元素到 DOM
  ```jsx
  ReactDOM.render(<App />, document.getElementById('root'));
  ```

- `ReactDOM.hydrate`: 服务端渲染后 hydrate
  ```jsx
  ReactDOM.hydrate(<App />, document.getElementById('root'));
  ```

- `ReactDOM.createPortal`: 创建 portal
  ```jsx
  ReactDOM.createPortal(child, container);
  ```

### 2. 其他 DOM API
- `ReactDOM.findDOMNode`: 查找 DOM 节点（不推荐使用）
- `ReactDOM.unmountComponentAtNode`: 卸载组件

## React 工具 API

### 1. PropTypes (类型检查)
```jsx
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  // ...
  requiredFunc: PropTypes.func.isRequired,
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error('Invalid prop');
    }
  }
};
```

### 2. React 测试工具
- `ReactTestUtils`: 基础测试工具
- `@testing-library/react`: 推荐测试库

## React 18 新增 API

### 1. 新的 Root API
```jsx
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

### 2. 并发模式 API
- `startTransition`: 标记非紧急更新
  ```jsx
  import { startTransition } from 'react';

  startTransition(() => {
    // 非紧急更新
    setNonCriticalState(newValue);
  });
  ```

- `useTransition`: 跟踪过渡状态
  ```jsx
  const [isPending, startTransition] = useTransition();
  ```

- `useDeferredValue`: 延迟更新值
  ```jsx
  const deferredValue = useDeferredValue(value);
  ```

### 3. 其他新 API
- `useId`: 生成唯一 ID
  ```jsx
  const id = useId();
  ```

- `useSyncExternalStore`: 外部存储同步
  ```jsx
  const state = useSyncExternalStore(subscribe, getSnapshot);
  ```

- `useInsertionEffect`: 主要用于 CSS-in-JS 库

## 总结

React API 提供了从组件定义、状态管理、生命周期控制到性能优化等全方位的功能。随着 React 的发展，函数组件和 Hooks 已成为主流开发模式，但类组件 API 仍然重要，特别是在维护旧代码时。理解这些 API 的适用场景和最佳实践，是成为高效 React 开发者的关键。

对于新项目，建议优先使用函数组件和 Hooks API，并考虑采用 React 18 的新特性来提升应用性能和用户体验。