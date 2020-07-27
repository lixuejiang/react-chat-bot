import * as React from 'react';
import classnames from 'classnames';
import { Tabs } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;

interface ItemOptions {
  title: string;
  value: string;
  count?: number;
  isShowBadge?: boolean;
}

export interface MMenusTabPaneProps {
  items: ItemOptions[];
  selectedKey: string;
  panels: React.ReactNode[];
  className?: string;
}

const MMenusTabPane: React.SFC<MMenusTabPaneProps> = props => {
  const {
    className,
    selectedKey,
    items,
    panels,
  } = props;
  return (
    <Tabs activeKey={selectedKey} className={classnames(styles.tabPane, className)}>
      {(panels || []).map((panel, index) => (
        <TabPane tab={items[index].title} key={items[index].value}>{panel}</TabPane>
      ))}
    </Tabs>
  );
};

export default MMenusTabPane;
