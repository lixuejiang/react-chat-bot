import React from 'react';
import classnames from 'classnames';
import NO_DEFAULT from './asserts/empty_data2.svg';
import NO_MANUSCRIPT from './asserts/empty_manuscript.svg';
import NO_DEFAULT2 from './asserts/empty_data.svg';

import styles from './index.less';

export const EmptyStateMap = {
  NO_DEFAULT, // 无数据 默认
  NO_MANUSCRIPT, // 暂无稿件
  NO_DEFAULT2, // 暂无数据
};

export type EmptyStateMapType = keyof typeof EmptyStateMap;

export interface IEmptyProps {
  title?: React.ReactNode | string;
  subtitle?: React.ReactNode | string;
  className?: string;
  style?: React.CSSProperties;
  status?: EmptyStateMapType;
  extra?: React.ReactNode;
}

const Empty: React.FC<IEmptyProps> = ({
  status = 'NO_DEFAULT',
  title,
  subtitle,
  style,
  className,
  extra,
}) => {
  const SVGComponent = EmptyStateMap[status as EmptyStateMapType];
  return (
    <div className={classnames(styles.emptyWrapper, className)} style={style}>
      <img className={classnames(styles.icon, 'icon')} src={SVGComponent} />
      <p className={classnames(styles.title, 'title')}>{title}</p>
      <p className={classnames(styles.subtitle, 'subtitle')}>{subtitle}</p>
      {extra}
    </div>
  );
};

export default Empty;
