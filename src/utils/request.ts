
import { message } from 'antd';
import fetch from 'isomorphic-fetch';
import * as Sentry from '@sentry/browser';
import { authService } from '@/services';
import storage from './storage';

export type IRequestMethod = 'GET' | 'PUT' | 'POST' | 'DELETE';
export interface ICheckStatusProps {
  response: Response;
  options?: any;
  url?: string;
}
interface ErrorWithResponse extends Error {
  response?: Response;
}

function checkStatus({ response, options, url }: ICheckStatusProps): Response {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error: ErrorWithResponse = new Error(response.statusText);
    error.response = response;
    error.message = JSON.stringify(response);

    Sentry.withScope((scope) => {
      scope.setLevel('error' as Sentry.Severity);
      scope.setTag('actions', 'RequestError');
      scope.setTag('requestUrl', `${url}`);
      scope.setExtra('requestOptions', options);
      Sentry.captureMessage(`Fetch Error - ${response.status} - ${url}`);
    });

    throw error;
  }
}

/**
 * 给 URL 加上 _t=时间戳
 * @param {string} url 完整 url 或者 path
 */
function addTimestamp(url: string): string {
  const t = `_t=${Date.now()}`;
  const sep = url.includes('?') ? '&' : '?';
  return url + sep + t;
}

function parseJSON(response: Response) {
  return response.json();
}


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {Promise<{ data: any, err: Error }>}           An object containing either "data" or "err"
 */
export default function request(_url: string, options?: any): Promise<{ err: Error | null; data: any }> {
  const url = addTimestamp(_url);
  const defaultOptions = {
    credentials: 'include',
    // redirect: 'manual',
  };
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'GET') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // NewOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  return fetch(url, newOptions)
    .then(response => checkStatus({
      response,
      options: newOptions,
      url: _url,
    }))
    .then(parseJSON)
    .then(data => {
      const { code } = data;
      if (code === 'SYSTEM_ERROR') {
        Sentry.withScope((scope) => {
          scope.setLevel('error' as Sentry.Severity);
          scope.setTag('actions', 'RequestError');
          scope.setExtra('requestOptions', newOptions);
          scope.setExtra('responseData', data);
          Sentry.captureMessage(`Fetch response Error - ${_url}`);
        });
      }
      return ({
        data,
        err: null,
      });
    })
    .catch((err: any) => {
      if (err && err.response && err.response.status === 400) {
        // 自定义报错
        return err.response.json()
          .then((data: any) => {
            // 重定向跳转
            if (data.code === 'UN_LOGIN' && location.href !== '/') {
              // 登录
              authService.logout().then(() => {
                storage.clear();
                message.error(`${data.message || '登陆已过期'},您需要重新登录,稍后将跳转至首页`);
                setTimeout(() => {
                  location.href = '/';
                }, 2000);
              });
            } else if ((data.code === 'UIC_MASTER_BLOCKED' || data.code === 'UIC_USER_BLOCKED') && location.href !== '/') {
              authService.logout().then(() => {
                storage.clear();
                message.error(`${data.message || '账号已被禁用'},您需要重新登录,稍后将跳转至首页`);
                setTimeout(() => {
                  location.href = '/';
                }, 2000);
              });
            } else {
              return ({ err: err || null });
            }
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
      return ({
        data: null,
        err: err || null,
      });
    });
}
