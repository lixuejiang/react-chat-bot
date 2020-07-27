import React from 'react';
import styles from './index.less';

export interface IModalTitleProps {
  title?: React.ReactNode | string | null;
}

const ModalTitle: React.FC<IModalTitleProps> = ({
  title,
}) => {
  return (
    <div className={styles.title}>
      {title}
    </div>
  );
};

export default ModalTitle;
