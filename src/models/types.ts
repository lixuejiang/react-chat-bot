import { IHookModelState } from './hook';
import { IExampleModelState } from './example';
import { IBaseState } from './base';


export type Loading = Readonly<{
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    auth?: boolean;
    base?: boolean;
    hook: IHookModelState;
    example?: boolean;
    deptDetail?: boolean;
  };
}>;

export interface ILocation {
  pathname: string;
  search: string;
  hash: string;
  key: string;
}

export type IRouterState = Readonly<{
  location: ILocation;
  action: string;
}>;

export type GlobalState = Readonly<{
  router: IRouterState;
  loading: Loading;
  base: IBaseState;
  hook: IHookModelState;
  example: IExampleModelState;
}>;

export interface Data {
  [key: string]: any;
}

// onResult 回调函数接口
export interface IOnResultCallBack<T> {
  onResult: (error: Error | null | string, data?: T) => void;
}
