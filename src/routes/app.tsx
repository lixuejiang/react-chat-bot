import React, { ReactNode } from 'react';
import { Layout } from 'antd';
import {
  Header, MScrollView, MView, DownloadChrome,
} from '@/components';
import styles from './app.less';

interface IAppProps {
  children: ReactNode;
}

const { Content } = Layout;

const isChrome = navigator.userAgent.toLowerCase().includes('chrome');

const App: React.FC<IAppProps> = ({ children }) => {
  return (
    <div>
      <Layout className={styles.layout}>
        <Header className={styles.header} />
        <Content className={styles.content} id="content">
          <MScrollView>
            <MView className={styles.main}>
              {isChrome ? children : <DownloadChrome />}
            </MView>
          </MScrollView>
        </Content>
      </Layout>
    </div>
  );
};

export default App;
