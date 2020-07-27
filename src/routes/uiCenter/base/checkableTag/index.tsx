import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'dva/router';
import { connect } from 'react-redux';
import {
  MView,
  MHeader,
  MCheckableTag,
} from '@/components';
import styles from '../../index.less';

const tempTags = [
  { key: 'superShort', value: '超短' },
  { key: 'short', value: '短' },
  { key: 'medium', value: '中' },
  { key: 'long', value: '长' },
];

const tempTags2 = [
  { key: '1', value: '超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短' },
  { key: '2', value: '短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短短' },
  { key: '3', value: '中中中中中中中中中中中中中' },
  { key: '4', value: '中中中中中中中中中中中中中中中' },
  { key: '5', value: '超短超短超短超短超短超短超短超短' },
  { key: '6', value: '超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短' },
  { key: '7', value: '超短超短超短超短超短超短超短超短' },
  { key: '8', value: '超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短' },
  { key: '9', value: '超短超短超短超短超短超短超短超短' },
  { key: '0', value: '超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短' },
  { key: '11', value: '超短超短超短超短超短超短超短超短' },
  { key: '12', value: '超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短超短' },
  { key: '13', value: '超短超短超短超短超短超短超短超短' },
  { key: '14', value: '超短超短超短超短超短超短超短超短' },
];

class CheckableTagPage extends PureComponent<RouteComponentProps, any> {
  render() {
    return (
      <MView resize className={styles.page}>
        <MHeader title="MCheckableTag 选择标签组件" />
        <div className={styles.wrap}>
          <h3>组件演示</h3>
          <div className={styles.row}>
            <MCheckableTag items={tempTags} name="单选" />
          </div>
          <div className={styles.row}>
            <MCheckableTag items={tempTags} name="单选" needAll />
          </div>
          <div className={styles.row}>
            <MCheckableTag items={tempTags} name="多选" multiple />
          </div>
          <div className={styles.row}>
            <MCheckableTag items={tempTags} name="多选" multiple needAll />
          </div>
          <div className={styles.row}>
            <MCheckableTag items={tempTags} />
          </div>
          <div className={styles.row}>
            <MCheckableTag items={tempTags} multiple needAll />
          </div>
          <div className={styles.row}>
            <MCheckableTag items={tempTags} defaultItems={['short']} />
          </div>
          <div className={styles.row}>
            <MCheckableTag
              items={tempTags}
              multiple
              needAll
              defaultItems={['short', 'long']}
            />
          </div>
          <div className={styles.row}>
            <MCheckableTag items={tempTags} name="单选" needAll theme="stress" />
          </div>
          <div className={styles.row}>
            <MCheckableTag items={tempTags} name="多选" needAll multiple theme="stress" />
          </div>
          <div className={styles.row}>
            <MCheckableTag items={tempTags} theme="stress" />
          </div>
          <div className={styles.row}>
            <MCheckableTag items={tempTags} multiple theme="stress" />
          </div>

          <div className={styles.row}>
            <MCheckableTag
              items={
                tempTags2
              }
              multiple
              needAll
              needCollapsed
            />
          </div>
          <div className={styles.row}>
            <MCheckableTag
              items={
                tempTags2
              }
              needAll
              theme="stress"
              needCollapsed
            />
          </div>
        </div>
      </MView>
    );
  }
}

export default connect()(CheckableTagPage);
