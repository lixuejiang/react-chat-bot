import * as React from 'react';
import classnames from 'classnames';
import { Badge } from 'antd';
import styles from './index.less';

interface ItemOptions {
  title: string;
  value: string;
  count?: number;
  isShowBadge?: boolean;
}

export interface MMenusProps {
  items: ItemOptions[];
  selectedKey: string;
  onClick?: (value: string) => void;
  border?: boolean;
}

const MMenus: React.SFC<MMenusProps> = props => {
  const {
    border = true,
    items,
    selectedKey,
    onClick,
  } = props;
  return (
    <div className={classnames(styles.menus, !border && styles.hideBorder)}>
      {items.map(item => (
        <div className={classnames(styles.menu, (selectedKey === item.value && selectedKey !== '' ? styles.selected : ''))} key={item.value}>
          <div className={styles.title} onClick={() => onClick && onClick(item.value)}>
            <Badge dot={item.isShowBadge}>
              {item.title}
              {item.title && item.count !== undefined && (
                <span className={styles.count}>{`${item.count || 0}`}</span>
              )}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MMenus;
