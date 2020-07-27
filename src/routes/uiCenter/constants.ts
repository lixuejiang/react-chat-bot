import React from 'react';

export const menus = [{
  title: '通用配置',
  name: 'Info',
  items: [
    { title: '色彩规范', name: 'Color', page: React.lazy(() => import('./info/color')) },
    { title: '文字规范', name: 'Font', page: React.lazy(() => import('./info/font')) },
  ],
}, {
  title: '基础组件',
  name: 'Base',
  items: [
    { title: '图标', name: 'Icon', page: React.lazy(() => import('./base/icon')) },
    { title: '页面容器', name: 'View', page: React.lazy(() => import('./developing')) },
    { title: '滚动容器', name: 'ScrollView', page: React.lazy(() => import('./developing')) },
    { title: '头部导航条', name: 'Header', page: React.lazy(() => import('./developing')) },
    { title: '结果组件', name: 'Result', page: React.lazy(() => import('./base/result')) },
    { title: '状态组件', name: 'State', page: React.lazy(() => import('./base/state')) },
    { title: '分页组件', name: 'Pagination', page: React.lazy(() => import('./base/pagination')) },
    { title: '搜索框组件', name: 'Search', page: React.lazy(() => import('./base/search')) },
    { title: '选择标签组件', name: 'CheckableTag', page: React.lazy(() => import('./base/checkableTag')) },
    { title: '引导组件', name: 'Guide', page: React.lazy(() => import('./base/guide')) },
  ],
}, {
  title: '公共方法',
  name: 'Tools',
  items: [
    // { title: '页面跳转', name: 'Link', page: React.lazy(() => import('./developing')) },
  ],
}, {
  title: '业务组件',
  name: 'extended',
  items: [
    // { title: '媒资详情弹窗', name: 'MediaPopup', page: React.lazy(() => import('./developing')) },
    // { title: '作品详情弹窗', name: 'ContentPopup', page: React.lazy(() => import('./developing')) },
  ],
}, {
  title: '业务逻辑',
  name: 'Function',
  items: [
    // { title: '媒资管理', name: 'Media', page: React.lazy(() => import('./developing')) },
    // { title: '作品管理', name: 'Content', page: React.lazy(() => import('./developing')) },
    // { title: '人脸管理', name: 'Face', page: React.lazy(() => import('./developing')) },
  ],
},
{
  title: '埋点信息',
  name: 'SPM',
  items: [
    // { title: '编辑器', name: 'Editer', page: React.lazy(() => import('./developing')) },
    // { title: '作品', name: 'Content', page: React.lazy(() => import('./developing')) },
    // { title: '媒资', name: 'Media', page: React.lazy(() => import('./developing')) },
    // { title: '可视化', name: 'Vizz', page: React.lazy(() => import('./developing')) },
  ],
},
];
