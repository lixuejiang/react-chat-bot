import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'dva/router';
import { connect } from 'react-redux';
import { Button } from 'antd';
import {
  MView,
  MHeader,
  MResult,
} from '@/components';
import styles from '../../index.less';

class ResultPage extends PureComponent<RouteComponentProps, {}> {
  render() {
    return (
      <MView resize className={styles.page}>
        <MHeader title="MResult 状态组件" />
        <div className={styles.wrap}>
          <h3>组件演示</h3>
          <div className={styles.row}>
            <div className={styles.col}>
              <MResult status="noContent" title="暂无数据" />
            </div>
            <div className={styles.col}>
              <MResult status="noAccount" title="权限受限" />
            </div>
            <div className={styles.col}>
              <MResult status="noMaterial" title="暂无素材" />
            </div>
            <div className={styles.col}>
              <MResult status="noTheme" title="暂无主题" />
            </div>
            <div className={styles.col}>
              <MResult status="noVideo" title="暂无作品" />
            </div>
            <div className={styles.col}>
              <MResult status="processing" title="处理中" />
            </div>
            <div className={styles.col}>
              <MResult status="materialFail" title="获取素材信息失败" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <MResult status="noContent" extra={<Button type="primary" size="small">点击识别</Button>} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <MResult status="done" title="完成" />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <MResult status="ratioLand" title="16:9" />
            </div>
            <div className={styles.col}>
              <MResult status="ratioVer" title="9:16" />
            </div>
          </div>
        </div>
      </MView>
    );
  }
}

export default connect()(ResultPage);
