import * as React from 'react';
import classnames from 'classnames';
import { Tooltip, Icon } from 'antd';
import storage from '@/utils/storage';
import styles from './tips.less';

type PlacementType = 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' |
'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';

export interface MGuideTipsProps {
  children?: React.ReactNode;
  text: string;
  name: string; // 唯一标示
  placement?: PlacementType;
  overlayClassName?: string;
}

interface MGuideTipsState {
  visible: boolean;
  isRead: boolean;
}

class MGuideTips extends React.Component<MGuideTipsProps & any, MGuideTipsState> {
  constructor(props: MGuideTipsProps & any) {
    super(props);
    const isRead = storage.get(`__Guide__${props.name.toUpperCase()}`, '');
    this.state = {
      visible: !isRead,
      isRead: !!isRead,
    };
  }

  onClose = () => {
    this.setState({
      visible: false,
    }, () => {
      storage.set(`__Guide__${this.props.name.toUpperCase()}`, '1');
    });
  }

  render() {
    const {
      text, placement, children, overlayClassName,
    } = this.props;
    const { isRead } = this.state;
    if (isRead) {
      return children;
    }
    return (
      <Tooltip
        overlayClassName={classnames(styles.container, overlayClassName)}
        visible={this.state.visible}
        getPopupContainer={(triggerNode: Element) => triggerNode.parentElement!}
        placement={placement}
        title={(
          <div className={styles.content}>
            <div className={styles.text}>{text}</div>
            <div className={styles.close}><Icon type="close" onClick={this.onClose} /></div>
          </div>
        )}
      >
        {children}
      </Tooltip>
    );
  }
}

export default MGuideTips;
