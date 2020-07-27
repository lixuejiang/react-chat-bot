import * as React from 'react';
import classnames from 'classnames';
import { Pagination } from 'antd';
import styles from './index.less';

const JUMPER_PAGENUM = 25;

export interface MPaginationProps {
  className?: string;
  style?: React.CSSProperties;
  hide?: boolean;
  pageNo?: number;
  total?: number;
  hideOnSinglePage?: boolean;
  pageSize?: number;
  showQuickJumper?: boolean;
  hideOnLastPage?: boolean;
  onChange?: (page: number, pageSize?: number) => void;
}

const MPagination: React.SFC<MPaginationProps> = props => {
  const {
    hide = false,
    pageNo = 1,
    total = 0,
    hideOnSinglePage = true,
    pageSize = 10,
    showQuickJumper = true,
    hideOnLastPage = false,
  } = props;
  return (
    <div className={classnames(styles.container, props.className, hideOnLastPage && styles.hideOnLastPage)} style={props.style}>
      {!hide && (
        <Pagination
          current={pageNo}
          total={total}
          hideOnSinglePage={hideOnSinglePage}
          pageSize={pageSize}
          onChange={props.onChange}
          showQuickJumper={showQuickJumper ? Math.ceil(total / pageSize) > JUMPER_PAGENUM : false}
        />
      )}
    </div>
  );
};

export default MPagination;
