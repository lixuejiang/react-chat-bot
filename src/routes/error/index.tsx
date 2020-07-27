import React from 'react';
// import { Icon } from 'antd';
import { router } from 'dva';
import styles from './index.less';

const { Link } = router;

interface IErrorProps {
}

const Error: React.FC<IErrorProps> = () => (
  <div className={styles.exceptionContent}>
    <img
      src="//s.newscdn.cn/file/2018/04/97484006-6246-442d-9c09-dc6aa0971933.png"
      className={styles.imgException}
      alt="页面不存在"
    />
    <div className={styles.prompt}>
      <h3 className={styles.title}>
        抱歉，你访问的页面不存在
      </h3>
      <p className={styles.description}>
        您要找的页面没有找到，请返回<Link to="/">首页</Link>继续浏览
      </p>
    </div>
  </div>
);

export default Error;
