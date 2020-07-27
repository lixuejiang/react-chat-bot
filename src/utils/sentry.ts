import * as Sentry from '@sentry/browser';

export interface sentryCaptureExceptionOptions {
  level?: 'fatal' | 'error' | 'warning' | 'info' | 'debug';
  action?: string;
  content?: string | Error;
  source?: string;
}
/**
 * @description sentry 错误上报
 * @param {string} [level = 'error'] - 错误等级 -   'fatal', 'error', 'warning', 'info', 'debug'
 * @param {string} [action] - 功能
 * @param {string} [content] - 内容(具体错误上报内容)
 * @param {string} [source] - 错误来源
 */
export default function sentryCaptureException({
  level = 'error',
  action = '',
  content = '',
  source = '',
}: sentryCaptureExceptionOptions) {
  Sentry.withScope((scope) => {
    scope.setLevel(level as Sentry.Severity);
    scope.setExtra('action', action);
    scope.setExtra('content', content);
    scope.setExtra('source', source);
    scope.setTag('source', source);
    if ((typeof (content) === 'string')) {
      Sentry.captureMessage(content);
    } else {
      Sentry.captureException(content);
    }
  });
}
