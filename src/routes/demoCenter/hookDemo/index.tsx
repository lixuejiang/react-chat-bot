import React, { useState, useEffect } from 'react';
import {
  // useDispatch,
  useSelector,
  shallowEqual,
} from 'dva';
import { GlobalState } from '@/models/types';

export interface IHookAPIProps {
}

const HookAPI: React.FC<IHookAPIProps> = (props) => {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState<number>(0);

  const selectedData = useSelector((state: GlobalState) => state.hook, shallowEqual);
  // const dispatch = useDispatch();

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`;

    // 组件销毁或者后续渲染时重新执行副作用函数
    return () => {
      document.title = '';
    };
  }, [count]); // 仅在 count 更改时更新

  return (
    <div>
      <p>React-Hook-API-DEMO</p>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      <ul>
        {
          selectedData &&
          selectedData.list &&
          selectedData.list.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={`${item}-${index}`}>{item}</li>
          ))
        }
      </ul>
    </div>
  );
};

export default HookAPI;
