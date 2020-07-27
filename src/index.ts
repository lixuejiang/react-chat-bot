import '@babel/polyfill';
import 'url-polyfill';
import * as Sentry from '@sentry/browser';
import dva, { DvaInstance } from 'dva';
import { createBrowserHistory } from 'history';
import { message } from 'antd';
import createLoading from 'dva-loading';
import * as ModelSet from './models/index';
import { SENTRY_DSN } from '@/constants';

import './index.less';

export interface IDvaInstance extends DvaInstance {
  _store?: any;
}

export interface versionInfoProps {
  VERSION: string;
  ENV: 'DEV' | 'TEST' | 'PRE' | 'PROD';
  INIT: boolean;
}
declare global {
  interface Window {
    __app?: IDvaInstance;
    versionInfo: versionInfoProps;
    spm: any;
  }
}

// 本地开发、测试环境 不上报错误
if (window.versionInfo.INIT) {
  Sentry.init({
    dsn: SENTRY_DSN, // dsn链接
    environment: (window.versionInfo!.ENV) || 'NONE', // 环境
    release: (window.versionInfo!.VERSION.split('.').slice(0, -1).join('.')) || '', // 版本号
    ignoreErrors: [
      /The play\(\) request was interrupted/,
      /Failed to load because no supported source was found/,
      /The element has no supported sources/,
      /InvalidStateError: Failed to execute 'send' on 'WebSocket': Still in CONNECTING state/,
    ],
    whitelistUrls: [],
    beforeSend(event, hint) {
      // Check if it is an exception, and if so, show the report dialog
      if (event.exception) {
        // 用户反馈
        // Sentry.showReportDialog({ eventId: event.event_id });
      }
      if (hint) {
        const reg = /The play\(\) request was interrupted | Failed to load | The element has no supported sources /;
        const result = reg.test(hint.data && hint.data.stack && hint.data.stack.message);
        if (result) {
          return null;
        }
      }
      return event;
    },
  });
}

// 1. Initialize
const app: IDvaInstance = dva({
  ...createLoading({
    effects: true,
  }),
  history: createBrowserHistory(),
  onError(error) {
    message.error(error.message);
  },
});

// 2. Model 迁移到路由中
// app.model(require('./models/example'));
// Model统一汇总到 /model/index,此处统一注入
Object.values(ModelSet).forEach(model => {
  app.model(model as any);
});
// 3. Router
app.router(require('./router').default);

// 4. Start
app.start('#root');

export default app._store;

window.__app = app;
