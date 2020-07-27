import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

export interface IPageTitleProps {
  title?: React.ReactNode | string | null;
  subtitle?: React.ReactNode | string;
  right?: React.ReactNode | string;
  className?: string;
  style?: React.CSSProperties;
}

const PageTitle: React.FC<IPageTitleProps> = (props) => {
  const {
    title, subtitle, right, className, style,
  } = props;
  return (
    <div
      className={classnames(styles.titleWrapper, className)}
      style={style}
    >
      <div className={styles.left}>
        {
          title && (
            <div className={styles.title}>
              {title}
            </div>
          )
        }
        {
          subtitle && (
            <div className={styles.subtitle}>
              {subtitle}
            </div>
          )
        }
      </div>
      {
        right && (
          <div className={styles.right}>
            {right}
          </div>
        )
      }
    </div>
  );
};

export default PageTitle;
