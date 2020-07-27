import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'dva/router';
import { connect } from 'react-redux';
import {
  MView,
  MHeader,
} from '@/components/index';
import styles from './index.less';

class DevelopingPage extends PureComponent<RouteComponentProps, {}> {
  render() {
    return (
      <MView resize className={styles.page}>
        <MHeader title="Developing 开发中" />
        <div className={styles.wrap}>
          <h3>抱歉</h3>
          <div className={styles.row}>
            <div className={styles.col}>
              当前页面尚未完成。
            </div>
          </div>
        </div>
      </MView>
    );
  }
}

export default connect()(DevelopingPage);
