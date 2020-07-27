import { routerRedux } from 'dva/router';
import {
  Model, createActionCreaters, Effects, Reducers,
} from '@shuwen/dva-ts-wrapper';
import {
  GlobalState,
} from './types';

export type IBaseState = Readonly<{
}>

export interface IReducersPayloads {

}

export interface IEffectsPayloads {
  gotoUrl: {
    url: string;
    search: string;
  };
  goBack: {

  };
  replaceUrl: {
    url: string;
    search: string;
  };
}

const effects: Effects<GlobalState, IEffectsPayloads> = {
  // 跳转页面
  *gotoUrl({ payload: { url = '/app', search } }, { put }) {
    yield put(routerRedux.push({
      pathname: url,
      search,
    }));
  },
  // 返回上一页
  *goBack(action, { put }) {
    yield put(routerRedux.goBack());
  },

  // 替换路由
  *replaceUrl({ payload: { url, search } }, { put }) {
    yield put(routerRedux.replace({ pathname: url, search }));
  },
};

const reducers: Reducers<IBaseState, IReducersPayloads> = {

};

const BaseModel: Model<IBaseState, GlobalState, IReducersPayloads, IEffectsPayloads> = {
  namespace: 'base',
  state: {
  },
  subscriptions: {
    setup({ history }) {
      return history.listen(async () => {
      });
    },
  },
  effects,
  reducers,
};

export default BaseModel;

export const baseActions = createActionCreaters(BaseModel);
