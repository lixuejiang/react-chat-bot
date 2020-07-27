import { message } from 'antd';

declare type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';
/**
 * MTools.Tips({ type, title })
 */

const Tips = (type: NoticeType, title: string | React.ReactNode) => {
  message.destroy();
  message[type](title);
};

export default Tips;
