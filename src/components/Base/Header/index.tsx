import * as React from 'react';
import classnames from 'classnames';
import { Icon } from 'antd';
import { clickBack } from './script';
// import { MIcon } from '../../index';
import styles from './index.less';

export interface MHeaderProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string | React.ReactNode;
  desc?: string | React.ReactNode;
  left?: string | React.ReactNode;
  right?: string | React.ReactNode;
  back?: boolean | string | (() => void);
  border?: boolean;
}

const MHeader: React.SFC<MHeaderProps> = props => {
  const {
    className,
    style,
    title,
    desc = null,
    left = null,
    right = null,
    back = false,
    border = true,
  } = props;

  const isShowTitleText = (typeof title === 'string');
  const isShowDescText = (typeof desc === 'string');

  // 返回按钮
  const backIcon = back ? (
    <div className={classnames(styles.back)} onClick={() => clickBack(back)}>
      <Icon type="left" />
    </div>
  ) : null;

  // 标题
  const titleText = !desc ? (
    <div
      className={styles.title}
      style={{ width: left ? 'auto' : '100%' }}
      title={`${isShowTitleText ? title : ''}`}
    >
      {title}
    </div>
  ) :
    (
      <div className={styles.titlePanel} style={{ width: left ? 'auto' : '100%' }}>
        <div className={styles.title} title={`${isShowTitleText ? title : ''}`}>{title}</div>
        <div className={classnames(isShowDescText && styles.desc)} title={`${isShowDescText ? desc : ''}`}>{desc}</div>
      </div>
    );

  // 标题后侧的左侧区域 一般为菜单/副标题/统计数据等 由外部传入进来
  const leftPanel = left ? (
    <>
      <div className={styles.line} />
      <div className={styles.left}>{left}</div>
    </>
  ) : null;

  // 标题后侧的右侧区域 一般为搜索框/用户信息等数据 由外部传入进来
  const rightPanel = right ? (
    <>
      <div className={styles.right}>{right}</div>
    </>
  ) : null;

  return (
    <div className={classnames(styles.container, className)} style={style}>
      <div className={classnames(styles.main, border && styles.border)}>
        {backIcon}
        {titleText}
        {leftPanel}
        {rightPanel}
      </div>
    </div>
  );
};

export default MHeader;
