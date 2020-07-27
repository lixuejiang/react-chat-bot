// import React from 'react';
import { CURRENT } from './index';

// function isPromise(obj) {
//   return (
//     Boolean(obj) &&
//     (typeof obj === 'object' || typeof obj === 'function') &&
//     typeof obj.then === 'function'
//   );
// }

/**
 * 通用权限检查方法
 * Common check permissions method
 * @param { 权限判定 Permission judgment type string |array | Promise | Function } authority
 * @param { 你的权限 Your permission description  type:string} currentAuthority
 * @param { 通过的组件 Passing components } target
 * @param { 未通过的组件 no pass components } Exception
 */
const checkPermissions = (authority, currentAuthority, target, Exception) => {
  // 没有判定权限.默认不能查看
  // Retirement authority, return target;
  // console.log('authority',authority)
  // console.log('currentAuthority',currentAuthority)
  // console.log('target',target)
  // console.log("Exception",Exception)
  if (!authority) {
    return Exception;
  }
  // 数组处理
  if (Array.isArray(authority)) {
    if (authority.indexOf(currentAuthority) >= 0) {
      return target;
    }
    return Exception;
  }

  // String 处理
  if (typeof authority === 'string') {
    if (authority === currentAuthority) {
      return target;
    }
    return Exception;
  }
};

export { checkPermissions };

const check = (authority, target, Exception) => {
  return checkPermissions(authority, CURRENT, target, Exception);
};

export default check;
