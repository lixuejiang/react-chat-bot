import React from 'react';
import Linkify from 'react-linkify';
import styles from '../styles/message.less';

const TextMessage = (props: any) => {
  return (
    <div className={styles['sc-message--text']}>
      <Linkify
        // @ts-ignore
        properties={{ target: '_blank' }}
      >
        {props.data.text}
      </Linkify>
    </div>
  );
};

export default TextMessage;
