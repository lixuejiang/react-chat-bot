/**
 * @description Service层汇总
 * - 可选 依然可以直接在model层引入指定的 Service 文件
 */
import * as exampleService from './example';
import * as authService from './auth';

export {
  exampleService,
  authService,
};
