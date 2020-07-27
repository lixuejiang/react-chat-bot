import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'dva/router';
import { connect } from 'react-redux';
import {
  MView,
  MHeader,
  MPagination,
} from '@/components';
import styles from '../../index.less';

class PaginationPage extends PureComponent<RouteComponentProps, {}> {
  render() {
    return (
      <MView resize className={styles.page}>
        <MHeader title="MPagination 分页组件" />
        <div className={styles.wrap}>
          <h3>组件演示</h3>
          <div className={styles.row}>
            <div className={styles.col}>
              <MPagination pageNo={1} total={360} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <MPagination pageNo={14} total={360} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <MPagination pageNo={35} total={360} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <MPagination pageNo={1} total={360} showQuickJumper={false} hideOnLastPage />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <MPagination pageNo={14} total={360} showQuickJumper={false} hideOnLastPage />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <MPagination pageNo={35} total={360} showQuickJumper={false} hideOnLastPage />
            </div>
          </div>
        </div>
      </MView>
    );
  }
}

export default connect()(PaginationPage);
