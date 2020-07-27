import * as React from 'react';
import classnames from 'classnames';
import { MState } from '../../index';

import noContent from './exception/noContent.svg';
import noAccount from './exception/noAccount.svg';
import noMaterial from './exception/noMaterial.svg';
import noTheme from './exception/noTheme.svg';
import noVideo from './exception/noVideo.svg';
import processing from './exception/processing.svg';
import materialFail from './exception/materialFail.svg';
import done from './exception/done.svg';
import ratioLand from './exception/ratioLand.svg';
import ratioVer from './exception/ratioVer.svg';

import styles from './index.less';

export const ExceptionMap = {
  noContent, // 无数据
  noAccount,
  noMaterial,
  noTheme,
  noVideo,
  processing,
  materialFail,
  done,
  ratioLand,
  ratioVer,
};

export type ExceptionStatusType = keyof typeof ExceptionMap;

export interface MResultProps {
  className?: string;
  style?: React.CSSProperties;
  status: ExceptionStatusType;
  title?: string | React.ReactNode;
  extra?: React.ReactNode;
}

const MResult: React.SFC<MResultProps> = props => {
  const {
    className,
    style,
    status,
    title,
    extra,
  } = props;
  return (
    <MState
      className={classnames(styles.container, className)}
      style={style}
      status={status}
      title={title && <div className={styles.title}>{title}</div>}
      extra={extra && <div className={styles.extra}>{extra}</div>}
    />
  );
};


export default MResult;
