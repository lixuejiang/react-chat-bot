import request from '@/utils/request';

export function list() {
  return request('/api/example/list');
}
