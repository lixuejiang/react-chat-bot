import * as React from 'react';
import classnames from 'classnames';
import { Input, Dropdown, Menu } from 'antd';
import { MIcon } from '../../index';

import styles from './index.less';

interface Options {
  key: string;
  value: string;
}

export interface MSearchProps {
  className?: string;
  style?: React.CSSProperties;
  keyword?: string;
  placeholder?: string;
  onSearch?: (value: string, type?: string | undefined) => void;
  onChange?: (value: string) => void;
  onClear?: (type?: string | undefined) => void;
  options?: Options[];
}

interface MSearchState {
  visible: boolean;
}

class MSearch extends React.Component<MSearchProps, MSearchState> {
  inputSearchRef = React.createRef<any>();

  constructor(props: MSearchProps) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  onSearch = (v: string, key?: string) => {
    const { onSearch, options } = this.props;
    const _key = key || (options && options.length > 0 && options[0].key) || undefined;
    onSearch && onSearch(v, _key);
  }

  onBlur = () => {
    setTimeout(() => {
      this.setState({ visible: false });
    }, 100);
  }

  onClear = () => {
    const { onClear, options } = this.props;
    const _key = (options && options.length > 0 && options[0].key) || undefined;
    onClear && onClear(_key);
  }

  render() {
    const {
      keyword = '',
      className,
      style,
      placeholder = '请输入关键词进行搜索',
      onChange,
      onClear,
      options,
    } = this.props;

    const menu = options ? (
      <Menu
        defaultSelectedKeys={options.length > 0 ? [options[0].key] : []}
      >
        {options.map(i => (
          <Menu.Item
            key={i.key}
            className={styles.menuItem}
            onClick={() => this.onSearch(keyword, i.key)}
          >
            <span className={styles.menuValue}>{keyword}</span>
            <span className={styles.menuSuffix}>{i.value}</span>
          </Menu.Item>
        ))}
      </Menu>
    ) : null;

    const InputSearch = (
      <>
        <Input.Search
          placeholder={placeholder}
          onSearch={() => this.onSearch(keyword)}
          value={keyword}
          ref={this.inputSearchRef}
          onChange={e => onChange && onChange(e.target.value)}
        />
        {!!keyword && onClear && (
          <div className={styles.clear} onClick={this.onClear}>
            <MIcon name="search-clear" />
          </div>
        )}
      </>
    );

    return (
      menu ? (
        <div
          className={classnames(styles.container, onClear && styles.canClear, className)}
          style={style}
          onBlur={this.onBlur}
          onFocus={() => this.setState({ visible: true })}
        >
          <Dropdown
            visible={this.state.visible}
            getPopupContainer={(triggerNode: Element) => triggerNode.parentElement!}
            overlay={menu}
          >
            {InputSearch}
          </Dropdown>
        </div>
      ) : (
        <div className={classnames(styles.container, onClear && styles.canClear, className)} style={style}>
          {InputSearch}
        </div>
      )
    );
  }
}

export default MSearch;
