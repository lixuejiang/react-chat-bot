import React from 'react';
import { Link } from 'dva/router';
import styles from './index.less';

interface IRestrictedProps {

}

const Restricted: React.FC<IRestrictedProps> = (props) => {
  return (
    <div className={styles.exceptionContent}>
      <img
        src="//s.newscdn.cn/file/2018/04/97484006-6246-442d-9c09-dc6aa0971933.png"
        className={styles.imgException}
        alt="暂无权限访问"
      />
      <div className={styles.prompt}>
        <h3 className={styles.title}>
          抱歉，你暂无权限访问该页面
        </h3>
        <p className={styles.description}>
          {
            location.pathname === '/app' ?
              <React.Fragment>您暂无权限访问，请联系平台管理员开通权限</React.Fragment> :
              <React.Fragment>您暂无权限访问该页面，请返回<Link to="/app">首页</Link>继续浏览</React.Fragment>
          }
        </p>
      </div>
    </div>
  );
};


export default Restricted;
