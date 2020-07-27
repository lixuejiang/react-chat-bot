import React, { Component } from 'react';
import { connect, DispatchProp } from 'dva';
import { GlobalState } from '@/models/types';
import styles from './index.less';

interface IHeaderProps {
}

interface IHeaderOwnProps {
  className: string;
}

interface IHeaderState {
}

class Header extends Component<IHeaderProps & IHeaderOwnProps & DispatchProp, IHeaderState> {
  constructor(props: IHeaderProps & IHeaderOwnProps & DispatchProp) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <div className={styles.header + ` ${this.props.className}`}>
        <img src="https://s.newscdn.cn/file/2019/12/b5a0cfe7-8b08-4dd4-bae2-8235b919692c.svg" />
      </div>
    );
  }
}

export default connect<IHeaderProps, null, IHeaderOwnProps, GlobalState>(
  (state) => {
    return {

    };
  },
)(Header);
