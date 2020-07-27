import * as React from 'react';
import classnames from 'classnames';
import styles from './grid.less';

export interface MRowTableProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const MRowTable: React.SFC<MRowTableProps> = props => {
  return (
    <div className={classnames(styles.rowTable, props.className)} style={props.style}>
      {props.children}
    </div>
  );
};

export default MRowTable;
