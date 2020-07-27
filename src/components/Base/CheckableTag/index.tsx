import * as React from 'react';
import classnames from 'classnames';
import { Icon } from 'antd';
import styles from './index.less';

export type CheckableTagTheme = 'default' | 'stress';
interface CheckableTagItem {
  key: string;
  value: string;
}

export interface MCheckableTagProps {
  className?: string;
  style?: React.CSSProperties;
  name?: string;
  theme: CheckableTagTheme;
  multiple: boolean;
  needCollapsed: boolean;
  needAll?: boolean;
  items: CheckableTagItem[];
  defaultItems: string[];
  addonElement?: string | React.ReactNode;
  onChange?: (items: string[]) => void;
}

interface MCheckableTagState {
  selectItems: string[];
  collapsed: boolean;
}

class MCheckableTag extends React.Component<MCheckableTagProps, MCheckableTagState> {
  static defaultProps = {
    theme: 'default',
    multiple: false,
    needCollapsed: false,
    needAll: false,
    items: [],
    defaultItems: [],
  }

  constructor(props: MCheckableTagProps) {
    super(props);
    let selectItems: string[] = [];
    if (props.defaultItems.length > 0) {
      selectItems = props.defaultItems;
    } else if (props.needAll) {
      selectItems = ['all'];
    } else if (!props.multiple && props.items.length > 0) {
      selectItems = [props.items[0].key];
    }
    if (!props.multiple && selectItems.length > 0) {
      selectItems = selectItems.slice(0, 1);
    }
    this.state = {
      selectItems,
      collapsed: props.needCollapsed,
    };
  }

  handleChange = (key: string) => {
    const { props } = this;
    const { multiple } = this.props;
    const options: any = {};
    if (key !== 'all') {
      if (this.state.selectItems.includes(key)) {
        // 有
        if (props.multiple) {
          options.selectItems = this.state.selectItems.filter(i => i !== key);
        }
        if (props.multiple && props.needAll && options.selectItems.length === 0) {
          options.selectItems = ['all'];
        }
      } else {
        // 无
        options.selectItems = multiple ? this.state.selectItems.filter(i => i !== 'all').concat([key]) : [key];
        if (props.multiple && props.needAll && props.items.filter(i => i.key !== 'all').length === options.selectItems.length) {
          options.selectItems = ['all'];
        }
      }
    } else {
      options.selectItems = ['all'];
    }
    this.setState(options, () => {
      props.onChange && props.onChange(this.state.selectItems);
    });
  }

  changeCollapsed = (collapsed: boolean) => {
    this.setState({ collapsed });
  }

  render() {
    const { props } = this;
    const { selectItems, collapsed } = this.state;
    const items = (props.needAll ? [{ key: 'all', value: '全部' }] : []).concat(props.items.filter(i => i.key !== 'all'));

    return (
      <div
        className={classnames(
          styles.container,
          props.name && styles.needLabel,
          props.theme === 'stress' && styles.stress,
          props.className,
        )}
        style={props.style}
      >
        {props.name && (
          <div className={styles.label}>
            {props.name}
          </div>
        )}
        <div className={styles.value}>
          <div className={classnames(styles.tags, props.needCollapsed && styles.needCollapsed, collapsed && styles.collapsed)}>
            {items.map(item => (
              <div
                key={item.key}
                className={classnames(styles.tag, selectItems.includes(item.key) && styles.checked)}
                onClick={() => this.handleChange(item.key)}
              >
                {item.value}
                {props.multiple && item.key !== 'all' && <Icon type="check" />}
              </div>
            ))}
            {props.addonElement}
            {props.needCollapsed && !collapsed && (
              <div
                className={classnames(styles.tag, styles.collapsedBtn)}
                onClick={() => this.changeCollapsed(true)}
              >
                收起<Icon type="up" />
              </div>
            )}
          </div>
          {props.needCollapsed && collapsed && (
            <div className={styles.collapsedBtn} onClick={() => this.changeCollapsed(false)}>展开<Icon type="down" /></div>
          )}
        </div>
      </div>
    );
  }
}

export default MCheckableTag;
