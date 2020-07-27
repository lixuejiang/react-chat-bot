import React from 'react';
import { connect, DispatchProp } from 'dva';
import { GlobalState } from '@/models/types';

interface IClassAPIProps {
  list: number[];
}

interface IClassAPIState {
  count: number;
}

class ClassAPI extends React.Component<IClassAPIProps & DispatchProp, IClassAPIState> {
  constructor(props: IClassAPIProps & DispatchProp) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    document.title = '';
  }

  render() {
    return (
      <div>
        <p>React-Class-API-DEMO</p>
        <button onClick={() => this.setState({
          count: this.state.count + 1,
        })}
        >
          {this.state.count}
        </button>
        <ul>
          {
            this.props.list.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`${item}-${index}`}>{item}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}


export default connect(({ hook }: GlobalState) => ({
  list: hook.list,
}))(ClassAPI);
