import { message } from 'antd';
import request from '@/utils/request';

interface IObjectAny {
  [propName: string]: any;
}

export type Result<T> = {
  success: true;
  data: T;
  response: any; // 原始数据
} | {
  success: false;
  err: Error;
  message: string;
  data?: any;
}

/**
 * 自动解包多级 data （当 data 存在且仅存在 data 属性）
 * TODO 可以对 request 包一层，避免样板代码
 */
export function normalizeResult<T = any>(
  res: { err: Error | null; data: any },
): Result<T> {
  if (!res) {
    return {
      success: false,
      data: null,
      message: '',
      err: new Error(''),
    };
  }
  if (res.err) {
    return {
      success: false,
      err: res.err,
      message: '',
    };
  } else {
    // 第一层 data 是服务端返回的原始 response
    let { data } = res;

    /**
     * data 是数组的情况
     * （还没有发现什么接口什么情况下服务端会直接返回数组，虽然双春说有）
     */
    if (Array.isArray(data)) {
      return {
        success: true,
        data: data as any,
        response: res.data,
      };
    }

    /**
     * 返回错误
     */
    if (data.success !== true) {
      return data;
    }

    // 第二层 data 为 response 的 data 属性
    ({ data } = data);

    // 如果 data 下面有且只有一层 data，则进入下一层
    while (
      data &&
      Object.prototype.hasOwnProperty.call(data, 'data') &&
      Object.keys(data).length === 1
    ) {
      ({ data } = data);
    }

    return {
      success: true,
      data,
      response: res.data,
    };
  }
}

export function postJSON(url: string, data: any) {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

export type IMessageType = 'success' | 'error' | 'info' | 'warning' | 'warn' | 'loading';

// 全局提示
export const tips = (type: IMessageType, title: string) => {
  message.destroy();
  (message as any)[type](title);
};

// 若传入 format='format' 则走规范
export const dateFormat = (date: (string | number | Date), format = 'yyyy-MM-dd hh:mm:ss TT'): string => {
  if (!date) {
    date = new Date();
  }
  if (typeof date === 'string' && /^\d+$/.test(date)) {
    date = new Date(+date);
  }
  if (typeof date === 'number') {
    date = new Date(date);
  }
  if (typeof date !== 'number' && !(date instanceof Date)) {
    date = date.replace(/年|月/g, '-').replace(/日/g, '');
    date = new Date(date);
  }

  const duration = Date.now() - date.getTime();
  const level1 = 60 * 1000; // 1 分钟
  const level2 = 60 * 60 * 1000; // 1 小时
  const level3 = 24 * 60 * 60 * 1000; // 1 天
  const level4 = 2 * 24 * 60 * 60 * 1000; // 2天

  if (format === 'default') {
    if (duration < level1) {
      return '刚刚';
    }
    if (duration >= level1 && duration < level2) {
      return `${Math.round(duration / level1)}分钟前`;
    }
    if (duration >= level2 && duration < level3) {
      return `${Math.round(duration / level2)}小时前`;
    }
    if (duration >= level3 && duration < level4) {
      format = '昨天 hh:mm';
    }
    // 判断是否过年了
    const _date = new Date();
    const _year = _date.getFullYear();
    if ((new Date(`${_year}-01-01`)).getTime() <= date.getTime()) {
      format = 'MM月dd日 hh:mm';
    } else {
      format = 'yyyy年MM月dd日 hh:mm';
    }
  }

  const o: IObjectAny = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时 24进制
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
    'T+': date.getHours() < 12 ? 'AM' : 'PM',
    'H+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时 12进制
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, String(date.getFullYear()).substr(4 - RegExp.$1.length));
  }
  Object.keys(o).forEach(k => {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? (o[k]) : `00${o[k]}`.substr(String(o[k]).length),
      );
    }
  });
  return format;
};

export const getStringLength = (str: string) => {
  return str.replace(/[\u0391-\uFFE5]/gim, 'aa').length;
};

export const isMobile = () => {
  const userAgentInfo = navigator.userAgent;
  const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPod'];
  let flag = false;

  for (const v of Agents) {
    if (userAgentInfo.includes(v)) {
      flag = true;
      break;
    }
  }
  return flag;
};
