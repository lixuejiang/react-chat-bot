import React from 'react';
import styles from '../styles/message.less';

const LinkMessage = (props: any) => {
  return (
    <div className={styles['sc-message--text']}>
      <div className={styles['sc-message--link-detail']}>
        关于提问只有纯文字回答，比如说死亡人数具体多少人，最多三行展示关于提问只有纯文字回答，比如说死亡人数具体多少人，最多三行展示。
      </div>
      <div className={styles['sc-message--link-url']}>
        <a href="/app">查看详情</a>
      </div>
    </div>
  );
};

export default LinkMessage;
