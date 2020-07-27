import React from 'react';
import FileIcon from '../icons/FileIcon';
import styles from '../styles/message.less';

const FileMessage = (props: any) => {
  return (
    <a className={styles['sc-message--file']} href={props.data.url} download={props.data.fileName}>
      <FileIcon />
      <p>{props.data.fileName}</p>
    </a>
  );
};

export default FileMessage;
