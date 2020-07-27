import * as React from 'react';
import classnames from 'classnames';
import { Icon } from 'antd';

import { ExceptionMap, ExceptionStatusType } from '../Result';

import styles from './index.less';

export const IconMap = {
  success: 'check-circle',
  error: 'close-circle',
  info: 'exclamation-circle',
  warning: 'warning',
};

export type StateStatusType = ExceptionStatusType | keyof typeof IconMap;

export interface MStateProps {
  className?: string;
  style?: React.CSSProperties;
  status: StateStatusType;
  icon?: React.ReactNode;
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  children?: React.ReactNode;
  extra?: React.ReactNode;
}

const ExceptionStatus = Object.keys(ExceptionMap);

const renderIcon = ({ status, icon }: MStateProps) => {
  // svg
  if (ExceptionStatus.includes(status)) {
    const SVGComponent = ExceptionMap[status as ExceptionStatusType];
    return (
      <div className={styles.image}>
        <img src={SVGComponent} />
      </div>
    );
  }
  // icon
  const iconString: string = IconMap[status as Exclude<StateStatusType, ExceptionStatusType>];
  const iconNode = icon || <Icon type={iconString} theme="filled" />;

  return <div className={styles.icon}>{iconNode}</div>;
};

const renderTitle = ({ title }: MStateProps) => title && (typeof title === 'string' ? <div className={styles.title}>{title}</div> : title);
const renderSubTitle = ({ subTitle }: MStateProps) => subTitle &&
  (typeof subTitle === 'string' ? <div className={styles.subTitle}>{subTitle}</div> : subTitle);
const renderChildren = ({ children }: MStateProps) => children && <div className={styles.content}>{children}</div>;
const renderExtra = ({ extra }: MStateProps) => extra && <div className={styles.extra}>{extra}</div>;

const MState: React.SFC<MStateProps> = props => {
  const {
    className,
    style,
  } = props;
  return (
    <div className={classnames(styles.container, className)} style={style}>
      {renderIcon(props)}
      {renderTitle(props)}
      {renderSubTitle(props)}
      {renderChildren(props)}
      {renderExtra(props)}
    </div>
  );
};

MState.defaultProps = {
  status: 'info',
};

export default MState;
