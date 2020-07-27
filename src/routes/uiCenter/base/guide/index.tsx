import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'dva/router';
import { connect } from 'react-redux';
import { Button } from 'antd';
import {
  MView,
  MHeader,
  MGuide,
} from '@/components';
import storage from '@/utils/storage';
import styles from '../../index.less';

class GuidePage extends PureComponent<RouteComponentProps, {}> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showSider = () => {
    this.setState({
      visible: true,
    });
  }

  hideSider = () => {
    this.setState({
      visible: false,
    });
  }

  clearStorage = (name: string) => {
    storage.remove(`__Guide__${name.toUpperCase()}`);
  }

  render() {
    return (
      <MView resize className={styles.page}>
        <MHeader title="MGuide 引导" />
        <div className={styles.wrap}>
          <h3>组件演示</h3>
          <div className={styles.row}>
            <div className={styles.col}>
              <MGuide.Tips
                text="点选 “初始化 Tips引导” 重新刷新页面，唤起一次性引导"
                name="Guide_Tips_Test"
                placement="bottomLeft"
              >
                <Button onClick={() => this.clearStorage('Guide_Tips_Test')}>初始化 Tips引导</Button>
              </MGuide.Tips>
            </div>
          </div>
        </div>
      </MView>
    );
  }
}

export default connect()(GuidePage);
