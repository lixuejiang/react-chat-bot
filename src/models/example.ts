/* eslint-disable no-use-before-define */
import {
  Model, createActionCreaters, Effects, Reducers,
} from '@shuwen/dva-ts-wrapper';
import {
  GlobalState,
} from './types';

export type IExampleModelState = Readonly<{
  list: number[];
}>

interface IReducersPayloads {
  save: void | Partial<IExampleModelState>;
}

interface IEffectsPayloads {
  fetch: void;
}

const reducers: Reducers<IExampleModelState, IReducersPayloads> = {
  save(state, action) {
    return {
      ...state,
      ...action.payload,
    };
  },
};

const effects: Effects<GlobalState, IEffectsPayloads> = {
  *fetch({ payload }, { call, put }) {
    yield put(exampleActions.reducers.save({}, true));
  },
};


const ExampleModel: Model<IExampleModelState, GlobalState, IReducersPayloads, IEffectsPayloads> = {
  namespace: 'example',
  state: {
    list: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line

    },
  },

  effects,
  reducers,
};

export default ExampleModel;

export const exampleActions = createActionCreaters(ExampleModel);
