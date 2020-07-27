import React from 'react';
import classnames from 'classnames';

// import { MScrollView } from '@/components';

import styles from './index.less';

/**
 * 通用组件-表格筛选显示菜单
 * @param menu 菜单选项
 * @param selected 已选菜单项
 * @param onSelect 选中菜单项的触发函数
 */
export interface MenuItem {
  name: string;
  value: string;
}

interface TableFilterProps {
  menu?: string[];
  menuWithItem?: MenuItem[];
  selected: string | undefined;
  className?: string;
  children?: any;
  onSelect: (value: string) => void;
}

export default function TableFilter(props: TableFilterProps) {
  const {
    menu, menuWithItem, selected, className, children, onSelect,
  } = props;

  const renderFilter = ({ name, value }: MenuItem) => (
    <div
      key={value}
      className={classnames(styles.item, {
        [styles.selected]: selected === value,
      })}
      onClick={() => onSelect(value)}
    >
      {name}
    </div>
  );

  return (
    // <MScrollView>
    <div className={classnames(styles.container, className)}>
      {children}
      {
        menu && menu.map(item => {
          return renderFilter({ name: item, value: item });
        })
      }
      {
        menuWithItem && menuWithItem.map(item => {
          return renderFilter(item);
        })
      }
    </div>
    // </MScrollView>
  );
}
