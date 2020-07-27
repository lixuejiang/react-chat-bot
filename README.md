### react-dva-ts-boilerplate

dev
```bash
yarn
yarn run dev
```

build

```bash
# 测试环境 测试环境资源版本号默认为 1.0.0
yarn run ship

# 正式环境
yarn run ship-prod
```

### 重要
dll 包请在每个项目中打一个对应的项目dll，不要用本示例项目的线上地址

### 最佳实践

- 未来 React v17.0 版本中即将被移除的三个生命周期函数 `componentWillMount`，`componentWillReceiveProps`，`componentWillUpdate` 不再建议使用，推荐逐渐向 React v16.3 引入的新的生命周期函数 `getDerivedStateFromProps`，`getSnapshotBeforeUpdate` 迁移（Ps. HOOK API 暂时没有 getSnapshotBeforeUpdate 对应的api）

- React v16.4 引入了 `Hook API`，推荐使用 基于HOOK API 的 函数组件 对业务组件解耦，但不建议大幅度重构原有的 `class`组件

- ES6 引入了 `@Decorator`，推荐使用装饰器简化编码过程，例如 Dva 的 `@connect` 、antd 的 `@Form.create` 等

- Dva 2.6.0-beta.12 + 同时支持class api && hook api

- 为保证工程的可预测性，项目配置了 `eslint`，请务必遵循规范

- 项目路径配置了别名 `alias` 为方便管理，请使用 `alias` 的方式引入

### 推荐库

[react-spring](https://github.com/react-spring/react-spring) : A spring physics based React animation library

[react-use ](https://github.com/streamich/react-use)：A React Hooks library
