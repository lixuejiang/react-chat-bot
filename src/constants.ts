// Your custom iconfont Symbol script Url
// eg：//at.alicdn.com/t/font_1039637_btcrd5co4w.js
// 注意：如果需要图标多色，Iconfont 图标项目里要进行批量去色处理
// Usage: https://github.com/ant-design/ant-design-pro/pull/3517
export const iconfontUrl = '//at.alicdn.com/t/font_1203261_yvy8ld6j34n.js';

// 分页
// 1.只有一页的时候 不显示分页
// 2.大于一页小于等于20页 正常分页
// 3.大于20页 显示跳页
export const JUMPER_PAGENUM = 20; // 显示跳页

export const DOMAIN = 'ai.xinwen.cn'; // 项目主域名
export const DOMAIN_ACCOUNT = 'account.shuwen.com'; // 账号中心主域名

// Sentry DSN 链接 => https://sentry.xinhuazhiyun.com/
export const SENTRY_DSN = '';

// 是否是开发模式
export const IS_DEV = [
  `dev.${DOMAIN}`,
].includes(location.hostname);

// 是否是测试模式
export const IS_TEST = [
  `test.${DOMAIN}`,
].includes(location.hostname);

// 是否是预发模式
export const IS_PRE = [
  `pre.${DOMAIN}`,
].includes(location.hostname);

// 账号中心 host
export const ACCOUNT_HOST = [
  `dev.${DOMAIN}`,
  `test.${DOMAIN}`,
].includes(location.hostname)
  ? location.protocol + `//test.${DOMAIN_ACCOUNT}`
  : (IS_PRE ? location.protocol + `//pre.${DOMAIN_ACCOUNT}` : `https://${DOMAIN_ACCOUNT}`); // 注意线上的账号中心地址强制https

// 项目 hosts
export const PROJECT_HOST = [
  `dev.${DOMAIN}`,
  `test.${DOMAIN}`,
].includes(location.hostname)
  ? location.protocol + `//${IS_DEV ? `dev.${DOMAIN}:8005`
    : `test.${DOMAIN}`}`
  : location.protocol + `//${IS_PRE ? `pre.${DOMAIN}` : `${DOMAIN}`}`;

//  MAGIC hosts
export const MAGIC_HOST = [
  `dev.${DOMAIN}`,
  `test.${DOMAIN}`,
].includes(location.hostname)
  ? location.protocol + '//test.magic.shuwen.com'
  : location.protocol + `//${IS_PRE ? 'pre.magic.shuwen.com' : 'magic.shuwen.com'}`;
