import * as React from 'react';
import MGuideTips from './tips';

class MGuide extends React.Component<any, any> {
  static Tips: typeof MGuideTips;
}

MGuide.Tips = MGuideTips;
export default MGuide;
