/* eslint-disable react/no-multi-comp */
import ReactDOM from 'react-dom';
import React, { PureComponent, ReactElement } from 'react';
import classnames from 'classnames';
import styles from './index.less';

const { document } = window;
const container = document.createElement('div');
document.body.appendChild(container);

interface PopTitleState {
  left: number;
  top: number;
}

class PopTitle extends PureComponent<{ fadeIn: boolean }, PopTitleState> {
  state: PopTitleState = {
    left: -9999,
    top: -9999,
  };

  setPosition(state: PopTitleState) {
    this.setState(state);
  }

  render() {
    const { left, top } = this.state;
    const { fadeIn } = this.props;

    return ReactDOM.createPortal(
      (
        <div
          className={classnames(styles.title, fadeIn && styles.addAnimation)}
          style={{
            transform: `translate3d(${left}px, ${top}px, 0)`,
          }}
        >
          {this.props.children}
        </div>
      ),
      container,
    );
  }
}

interface HoverTitleProps {
  title: string;
  disabled?: boolean;
  children: ReactElement<any>;
  offsetX?: number;
  offsetY?: number;
  fadeIn?: boolean;
}

interface HoverTitleState {
  visible: boolean;
}

/**
 * 跟随鼠标移动的 tooltip(title) 组件
 * @example
 * ```
 * <HoverTitle title="aaa">
 *  <div>
 *   这个元素必须接受 onMouseMove / onMouseEnter / onMouseLeave
 *  </div>
 * </HoverTitle>
 * ```
 *
 * 为什么要通过 refs.popTitle.setPosition() 的方式控制 PopTitle 的位置，而不是使用 prop 控制:
 * 主要是因为如果通过 props 驱动 PopTitle 的位置，必然会造成 HoverTitle 尤其是它的 children
 * 在每个 MouseMove 的时候都重新 render，因为 children 可能会很大，而且move 频率很高，这样极容易导致性能问题。
 */
// tslint:disable-next-line: max-classes-per-file
export default class HoverTitle extends PureComponent<HoverTitleProps, HoverTitleState> {
  // 如果希望hover到内部某个元素时隐藏，需要给内部元素加上这个
  static preventClassname = 'hover-title-prevent';

  state = {
    visible: false,
  };

  popTitleRef = React.createRef<PopTitle>();

  // https://github.com/react-component/trigger/blob/master/src/index.js
  fireEvents(type: string, e: React.MouseEvent) {
    const childCallback = this.props.children.props[type];
    if (childCallback) {
      childCallback(e);
    }
  }

  handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const { offsetX, offsetY } = this.props;

    this.fireEvents('onMouseMove', e);
    const hoverPrevent = (e.target as HTMLElement).closest(`.${HoverTitle.preventClassname}`);

    this.setState({
      visible: !hoverPrevent,
    });

    if (!hoverPrevent && this.popTitleRef.current) {
      this.popTitleRef.current.setPosition({
        left: e.pageX + (offsetX || 0),
        top: e.pageY + (offsetY || 0),
      });
    }
  }

  handleMouseEnter = (e: React.MouseEvent) => {
    this.fireEvents('onMouseEnter', e);

    this.setState({
      visible: true,
    });
  }

  handleMouseLeave = (e: React.MouseEvent) => {
    this.fireEvents('onMouseLeave', e);

    this.setState({
      visible: false,
    });
  }

  render() {
    const {
      children, title, disabled, fadeIn,
    } = this.props;
    const { visible } = this.state;

    const trigger = React.cloneElement(React.Children.only(children), {
      key: 'trigger',
      onMouseMove: this.handleMouseMove,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    });

    return [
      trigger,
      visible && !disabled && (
        <PopTitle
          fadeIn={!!fadeIn}
          key="title"
          ref={this.popTitleRef}
        >
          {title}
        </PopTitle>
      ),
    ];
  }
}
