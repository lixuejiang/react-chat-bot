import React, { Component } from 'react';
import chrome from './chrome.png';
import styles from './index.less';

export default class DownloadChrome extends Component {
  render() {
    return (
      <div className={styles.container}>
        <img src={chrome} />
        <p>
          网站目前仅支持
          <a href="https://www.google.cn/chrome/" target="_blank"> Chrome浏览器 </a>
          为您带来的不便请谅解
        </p>
      </div>
    );
  }
}
