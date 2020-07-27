import * as React from 'react';
import classnames from 'classnames';
import styles from './grid.less';

export interface MColTableProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
}

const MColTable: React.SFC<MColTableProps> = props => {
  const { children, width } = props;
  const styleWidth = width !== undefined ? { width } : {};
  const styleProps = { ...styleWidth, ...props.style };
  return (
    <div className={classnames(styles.colTable, props.className)} style={styleProps}>
      {children}
    </div>
  );
};

export default MColTable;
