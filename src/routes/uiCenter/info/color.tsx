import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'dva/router';
import { connect } from 'react-redux';
import {
  MView,
  MHeader,
} from '@/components';
import styles from '../index.less';

const TextColorData = [
  { color: 'rgba(0,0,0,0.85)', title: '#000000 (85%)', content: '用于主要标题文字和可点击的Icon' },
  { color: 'rgba(0,0,0,0.65)', title: '#000000 (65%)', content: '用于次要标题文字或正文' },
  { color: 'rgba(0,0,0,0.45)', title: '#000000 (45%)', content: '用于次要文字以及次要Icon' },
  { color: 'rgba(0,0,0,0.25)', title: '#000000 (25%)', content: '用于不可点击文字以及不可点击的Icon' },
  { color: 'rgba(0,0,0,0.15)', title: '#000000 (15%)', content: '用于分割线的颜色' },
  { color: 'rgba(0,0,0,0.05)', title: '#000000 ( 5% )', content: '用于大的背景色块' },
];

class ColorPage extends PureComponent<RouteComponentProps, {}> {
  render() {
    return (
      <MView resize className={styles.page}>
        <MHeader title="Color 色彩规范" />
        <div className={styles.wrap}>
          <h3>常见色彩</h3>
          <div className={styles.row}>
            <div className={styles.col} style={{ marginRight: 16 }}>
              <div className={styles.block} style={{ backgroundColor: '#4285f4' }}>#4285F4</div>
            </div>
            <div className={styles.col} style={{ marginRight: 16 }}>
              <div className={styles.block} style={{ backgroundColor: '#faa942' }}>#FAA942</div>
            </div>
            <div className={styles.col}>
              <div className={styles.block} style={{ backgroundColor: '#f04d56' }}>#F04D56</div>
            </div>
          </div>
        </div>
        <div className={styles.wrap}>
          <h3>字体颜色</h3>
          {TextColorData.map(item => (
            <div className={styles.row} key={item.color}>
              <div className={styles.col}>
                <div className={styles.color} style={{ backgroundColor: `${item.color}` }} />
              </div>
              <div className={styles.col}>
                <div style={{ marginLeft: 16 }}>{item.title}</div>
              </div>
              <div className={styles.col}>
                <div style={{ marginLeft: 24 }}>{item.content}</div>
              </div>
            </div>
          ))}
        </div>
      </MView>
    );
  }
}

export default connect()(ColorPage);
