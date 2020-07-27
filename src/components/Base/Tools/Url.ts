import { routerRedux } from 'dva/router';
import store from '@/index';

/**
 * MTools.Url.gotoUrl({ url, search })
 * MTools.Url.replaceUrl({ url, search })
 * MTools.Url.goBack()
 */

export interface UrlProps {
  url: string;
  search?: string;
}

const Url: any = {};

Url.gotoUrl = (props: UrlProps | string) => {
  let _url = '';
  let _search;
  if (typeof props === 'string') {
    _url = props;
  } else {
    const { url, search } = props;
    _url = url;
    _search = search;
  }
  store.dispatch(routerRedux.push({ pathname: _url, search: _search }));
};

Url.replaceUrl = (props: UrlProps) => {
  const {
    url = '/app',
    search,
  } = props;
  store.dispatch(routerRedux.replace({ pathname: url, search }));
};

Url.goBack = () => {
  store.dispatch(routerRedux.goBack());
};

export default Url;
