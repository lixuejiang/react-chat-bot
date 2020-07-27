import * as React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { RouteComponentProps } from 'dva/router';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {
  MView,
  MHeader,
  MIcon,
  MTools,
} from '@/components';
import styles from '../../index.less';

class IconPage extends React.PureComponent<RouteComponentProps, {}> {
  onCopy = (text: string) => {
    MTools.Tips('success', (<span><code className={styles.copied}>{text}</code> copied !</span>));
  }

  render() {
    return (
      <MView resize className={styles.page}>
        <MHeader title="MIcon 图标" />
        <div className={styles.wrap}>
          <h3>组件演示</h3>
          <div className={styles.row}>
            {MIcon.list.map(name => (
              <CopyToClipboard text={`<MIcon name="${name}" />`} onCopy={(text: string) => this.onCopy(text)} key={name}>
                <div className={classnames(styles.col, styles.icon)}>
                  <MIcon name={name} />
                  <span>{name}</span>
                </div>
              </CopyToClipboard>
            ))}
          </div>
        </div>
      </MView>
    );
  }
}

export default connect()(IconPage);
