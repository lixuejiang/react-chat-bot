import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'dva/router';
import { connect } from 'react-redux';
import {
  MView,
  MHeader,
  MState,
} from '@/components';
import styles from '../../index.less';

class StatePage extends PureComponent<RouteComponentProps, {}> {
  render() {
    return (
      <MView resize className={styles.page}>
        <MHeader title="MState 状态组件" />
        <div className={styles.wrap}>
          <h3>组件演示</h3>
          <div className={styles.row}>
            <div className={styles.col}>
              <MState status="success" title="成功" subTitle="请在屏幕右上角任务中心中查看制作进度" />
            </div>
            <div className={styles.col}>
              <MState status="error" title="失败" />
            </div>
            <div className={styles.col}>
              <MState status="info" />
            </div>
            <div className={styles.col}>
              <MState status="warning" title="警告" />
            </div>
          </div>
        </div>
      </MView>
    );
  }
}

export default connect()(StatePage);
