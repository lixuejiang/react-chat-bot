/**
 * @description auth service层
 */
import request from '@/utils/request';
import { normalizeResult } from '@/utils/tool';

/**
 * @description 获取个人用户信息/机构信息
 */
export async function getUserInfo() {
  const res = await request('/api/uic/user');
  return normalizeResult<any>(res);
}

/**
 * @description 账号登出
 */
export async function logout() {
  const res = await request('/api/uic/user/logout');
  return normalizeResult<any>(res);
}
