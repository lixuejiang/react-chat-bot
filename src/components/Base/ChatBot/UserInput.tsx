import React, { Component } from 'react';
import SendIcon from './icons/SendIcon';
import styles from './styles/user-input.less';

interface IUserInputProps {
  onFilesSelected: (file: any) => void;
  onSubmit: (input: any) => void;
  showEmoji: boolean;
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

  handleKeyDown(event: any) {
    if (event.keyCode === 13 && !event.shiftKey) {
      return this._submitText(event);
    }
  }

  handleKeyUp(event: any) {
    const inputText = event.target.innerHTML.length !== 0 &&
      event.target.innerText !== '\n';
    this.setState({ inputText });
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
      <form className={`${styles['sc-user-input']} ${(inputActive ? styles.active : '')}`}>
        <textarea
          value={inputText}
          onFocus={() => { this.setState({ inputActive: true }); }}
          onBlur={() => { this.setState({ inputActive: false }); }}
          onKeyDown={this.handleKeyDown.bind(this)}
          placeholder="请用一句话来描述你的问题吧"
          onChange={this.handleInputChange}
          className={styles['sc-user-input--text']}
        />
        <div className={styles['sc-user-input--buttons']}>
          <div className={styles['sc-user-input--button']}>
            <SendIcon onClick={this._submitText} />
          </div>
        </div>
      </form>
    );
  }
}

export default UserInput;
