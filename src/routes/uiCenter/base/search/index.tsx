import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'dva/router';
import { connect } from 'react-redux';
import {
  MView,
  MHeader,
  MSearch,
  MTools,
} from '@/components';
import styles from '../../index.less';

interface MSearchState {
  keyword: string;
}

class SearchPage extends PureComponent<RouteComponentProps, MSearchState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      keyword: '', // 搜索关键词
    };
  }

  // 搜索
  handleSearch = (keyword = '') => {
    this.setState({
      keyword,
    }, () => {
      if (keyword) {
        MTools.Tips('info', keyword);
      }
    });
  };

  // 清空搜索关键词
  handleClear = () => {
    this.handleSearch();
  }

  // 更改搜索关键词
  changeSearch = (keyword: string) => {
    this.setState({
      keyword,
    });
  }

  render() {
    const {
      keyword,
    } = this.state;
    return (
      <MView resize className={styles.page}>
        <MHeader title="MSearch 搜索框组件" />
        <div className={styles.wrap}>
          <h3>组件演示</h3>
          <div className={styles.row}>
            <div className={styles.col}>
              <MSearch
                placeholder="请输入关键词搜索"
                keyword={keyword}
                onClear={this.handleClear}
                onSearch={this.handleSearch}
                onChange={this.changeSearch}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <MSearch
                placeholder="请输入关键词搜索"
                keyword={keyword}
                onClear={this.handleClear}
                onSearch={this.handleSearch}
                onChange={this.changeSearch}
                options={[
                  { key: 'base', value: '搜索 标题/说明/标签' },
                  { key: 'algo', value: '搜索 语音/字幕' },
                ]}
              />
            </div>
          </div>
        </div>
      </MView>
    );
  }
}

export default connect()(SearchPage);
