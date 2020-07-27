import React from 'react';
import classnames from 'classnames';
import { Tabs } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;

interface NavigatorItem {
  key: string;
  text: string;
}
interface NavigatorProps {
  items: NavigatorItem[];
  selectedKey?: string;
  className?: string;
  style?: React.CSSProperties;
  onMenuClick: (activeKey: string) => void;
}
/**
 * 通用组件-页面头部菜单
 * @param items 菜单 [{text: 显示文字, key: 标示}] array
 * @param selectedKey 当前选中的菜单 string
 * @param onMenuClick 点击MenuItem调用此函数 function
 */
export default React.memo(function Navigator(props: NavigatorProps) {
  const {
    items, selectedKey, className, onMenuClick, style,
  } = props;
  return (
    <div className={classnames(styles.container, className)} style={style}>
      <Tabs
        activeKey={selectedKey}
        onChange={onMenuClick}
      >
        {
          items.map(item => {
            return (
              <TabPane tab={item.text} key={item.key} style={{ height: 0 }} />
            );
          })
        }
      </Tabs>
    </div>
  );
});
