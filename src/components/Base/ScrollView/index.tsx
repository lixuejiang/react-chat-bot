import React from 'react';
import classnames from 'classnames';
import ScrollView from 'react-custom-scrollbars';
import styles from './index.less';

export interface MScrollViewProps {
  children?: React.ReactNode;
  onScroll?: (event: React.UIEvent<any>) => void;
  className?: string;
}

// const MScrollView: React.FC<MScrollViewProps> = props => {
//   const {
//     children,
//     onScroll,
//     className,
//     ref,
//   } = props;
//   return (
//     <div className={classnames(styles.container, className)}>
//       <ScrollView autoHide onScroll={onScroll} ref={ref}>
//         {children}
//       </ScrollView>
//     </div>
//   );
// };

const MScrollView = React.forwardRef((props: MScrollViewProps, ref: React.Ref<any>) => {
  const {
    children,
    onScroll,
    className,
  } = props;
  return (
    <div className={classnames(styles.container, className)}>
      <ScrollView autoHide onScroll={onScroll} ref={ref}>
        {children}
      </ScrollView>
    </div>
  );
});

export default (MScrollView);
