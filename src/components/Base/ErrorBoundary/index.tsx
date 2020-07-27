/**
 * @description React 错误边界处理组件, 与Hook API 搭配使用时需要注意
 */
import React from 'react';
import { Icon, Button } from 'antd';
import classnames from 'classnames';
import * as Sentry from '@sentry/browser';
import sentryCaptureException from '@/utils/sentry';
import styles from './index.less';

interface IErrorBoundaryProps {
  report?: boolean; // 是否上报
  customUI?: React.ReactNode; // 自定义的错误UI提示
  customErrorTips?: string; // 自定义的错误文字提示 和 customUI 互斥
  style?: React.CSSProperties;
  className?: string;
}

interface IErrorBoundaryState {
  hasError: boolean;
  eventId: string;
}

export default class ErrorBoundary extends React.Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      eventId: '',
    };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    // console.log(error, info);
    const eventId = Sentry.captureException(error.originalError || error);
    this.setState({
      eventId,
    });
    sentryCaptureException({
      level: 'error',
      action: 'ErrorBoundary',
      content: error,
    });
  }

  reportError = () => {
    Sentry.showReportDialog({
      eventId: (this.state.eventId),
      title: '看来我们遇到了问题。',
    });
  }

  render() {
    const { hasError } = this.state;
    const {
      report = false, customUI, className, style, customErrorTips = '哦豁，组件崩溃了...',
    } = this.props;
    if (hasError) {
      return (
        <div className={classnames(styles.container, className)} style={style}>
          {
            customUI ? ({ customUI }) : (
              <React.Fragment>
                <Icon type="smile" rotate={180} />
                <span className={styles.tips}>{customErrorTips}</span>
              </React.Fragment>
            )
          }
          {report && <Button size="small" type="primary" onClick={this.reportError}>上报错误</Button>}
        </div>
      );
    }

    return this.props.children;
  }
}
