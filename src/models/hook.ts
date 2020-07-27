/* eslint-disable no-use-before-define */
import {
  Model, createActionCreaters, Effects, Reducers,
} from '@shuwen/dva-ts-wrapper';
import {
  GlobalState,
} from './types';

export type IHookModelState = Readonly<{
  list: number[];
}>

interface IReducersPayloads {
  save: void | Partial<IHookModelState>;
}

interface IEffectsPayloads {
  fetch: void;
}

const effects: Effects<GlobalState, IEffectsPayloads> = {
  *fetch({ payload }, { call, put }) {
    yield put(hookActions.reducers.save({}, true));
  },
};

const reducers: Reducers<IHookModelState, IReducersPayloads> = {
  save(state, action) {
    return {
      ...state,
      ...action.payload,
    };
  },
};

const HookModel: Model<IHookModelState, GlobalState, IReducersPayloads, IEffectsPayloads> = {
  namespace: 'hook',
  state: {
    list: [
      444,
      444,
      2,
    ],
  },
  effects,
  reducers,
};


export default HookModel;

export const hookActions = createActionCreaters(HookModel);
