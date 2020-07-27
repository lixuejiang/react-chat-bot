import React from 'react';
import styles from '../styles/message.less';

const ListMessage = (props: any) => {
  return (
    <div className={styles['sc-message--text']}>
      <div className={styles['sc-message--list-header']}>
        标题
      </div>
      <div className={styles['sc-message--list-wrapper']}>
        <div className={styles['sc-message--list-item']}>
          这是2022年的第7这是2022年的第7场地震场地
        </div>
        <div className={styles['sc-message--list-item']}>
          这是2022年的第7这是2022年的第7场地震场地
        </div>
        <div className={styles['sc-message--list-item']}>
          这是2022年的第7这是2022年的第7场地震场地
        </div>
        <div className={styles['sc-message--list-item']}>
          这是2022年的第7这是2022年的第7场地震场地
        </div>
      </div>
    </div>
  );
};

export default ListMessage;
