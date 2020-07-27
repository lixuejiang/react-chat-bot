import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'dva/router';
import { connect } from 'react-redux';
import {
  MView,
  MHeader,
} from '@/components';
import styles from '../index.less';

const TextColorData = [
  { color: 'rgba(0,0,0,0.85)', title: '#000000 (85%) Medium', content: '标题' },
  { color: 'rgba(0,0,0,0.65)', title: '#000000 (65%) Regular', content: '正文' },
  { color: 'rgba(0,0,0,0.45)', title: '#000000 (45%) Regular', content: '次要文字' },
  { color: 'rgba(0,0,0,0.25)', title: '#000000 (25%) Regular', content: '不可点击文字' },
];

const LineHeightData = [
  { size: 12, lineHeight: 20 },
  { size: 14, lineHeight: 22 },
  { size: 16, lineHeight: 24 },
  { size: 20, lineHeight: 28 },
  { size: 24, lineHeight: 32 },
  { size: 30, lineHeight: 38 },
];

const FontWeightData = [
  { size: 'thin', weight: 100 },
  { size: 'extralight', weight: 200 },
  { size: 'light', weight: 300 },
  { size: 'regular', weight: 400 },
  { size: 'medium', weight: 500 },
  { size: 'semibold', weight: 600 },
  { size: 'bold', weight: 700 },
  { size: 'extrabold', weight: 800 },
  { size: 'black', weight: 900 },
];

const FontFamily = 'font-family: Chinese Quote, -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC, Source Han Sans SC, ' +
  'Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial, sans-serif;';

class FontPage extends PureComponent<RouteComponentProps, {}> {
  render() {
    return (
      <MView resize className={styles.page}>
        <MHeader title="Font 字体规范" />
        <div className={styles.wrap}>
          <h3>字体设置</h3>
          <div className={styles.row}>
            <div className={styles.col}>
              {FontFamily}
            </div>
          </div>
        </div>
        <div className={styles.wrap}>
          <h3>字体类型</h3>
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
        <div className={styles.wrap}>
          <h3>字体行高</h3>
          <div className={styles.row}>
            <div className={styles.col} style={{ width: 100 }}>
              字体大小
            </div>
            {LineHeightData.map(item => (
              <div className={styles.col} key={item.size} style={{ width: 60, textAlign: 'center' }}>
                {item.size}
              </div>
            ))}
            <div className={styles.col} style={{ width: 60, textAlign: 'center' }}>
              ...
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col} style={{ width: 100 }}>
              文字行高
            </div>
            {LineHeightData.map(item => (
              <div className={styles.col} key={item.size} style={{ width: 60, textAlign: 'center' }}>
                {item.lineHeight}
              </div>
            ))}
            <div className={styles.col} style={{ width: 60, textAlign: 'center' }}>
              ...
            </div>
          </div>
        </div>
        <div className={styles.wrap}>
          <h3>字体粗细</h3>
          <div className={styles.row}>
            <div className={styles.col} style={{ width: 100 }}>
              字体格式
            </div>
            {FontWeightData.map(item => (
              <div className={styles.col} key={item.size} style={{ width: 80, textAlign: 'center' }}>
                {item.size}
              </div>
            ))}
          </div>
          <div className={styles.row}>
            <div className={styles.col} style={{ width: 100 }}>
              粗细大小
            </div>
            {FontWeightData.map(item => (
              <div className={styles.col} key={item.size} style={{ width: 80, textAlign: 'center' }}>
                {item.weight}
              </div>
            ))}
          </div>
        </div>
      </MView>
    );
  }
}

export default connect()(FontPage);
