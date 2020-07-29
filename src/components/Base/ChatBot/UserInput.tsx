import React, { Component } from 'react';
import { Input } from 'antd';
import SendText from './assets/send-text.svg';
import SendIcon from './assets/send.svg';
import SendIconActive from './assets/send-active.svg';
import styles from './styles/user-input.less';

interface IUserInputProps {
  onSubmit: (input: any) => void;
}

interface IUserInputState {
  inputActive: boolean;
  inputText: any;
}

class UserInput extends Component<IUserInputProps, IUserInputState> {
  constructor(props: IUserInputProps) {
    super(props);
    this.state = {
      inputActive: false,
      inputText: '',
    };
  }

  handleKeyDown = (event: any) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      return this._submitText(event);
    }
  }

  _submitText = (event: any) => {
    event.preventDefault();
    const { inputText } = this.state;
    if (inputText && inputText.length > 0) {
      this.props.onSubmit({
        author: 'me',
        type: 'text',
        data: { text: inputText },
      });
      this.setState({
        inputText: '',
      });
    }
  }

  handleInputChange = (e: any) => {
    this.setState({
      inputText: e.target.value,
    });
  }

  render() {
    const {
      inputActive, inputText,
    } = this.state;
    return (
      <div className={`${styles['sc-user-input']} ${(inputActive ? styles.active : '')}`}>
        <Input.TextArea
          value={inputText}
          onFocus={() => { this.setState({ inputActive: true }); }}
          onBlur={() => { this.setState({ inputActive: false }); }}
          onKeyDown={this.handleKeyDown}
          placeholder="请用一句话来描述你的问题吧"
          onChange={this.handleInputChange}
          className={styles['sc-user-input--text']}
        />
        <div className={styles['sc-user-input--buttons']}>
          <div className={styles['sc-user-input--button']}>
            <img src={SendText} />
          </div>
          <div className={styles['sc-user-input--button']}>
            <img src={inputText.length ? SendIconActive : SendIcon} onClick={this._submitText} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserInput;
