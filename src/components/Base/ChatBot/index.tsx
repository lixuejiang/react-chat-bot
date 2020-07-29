import React, { Component } from 'react';
import ChatWindow from './ChatWindow';
import ChatBotIcon from './assets/chat.gif';
import styles from './styles/index.less';

interface IChatBotProps {
  // onMessageWasReceived: (activeKey: string) => void;
  onMessageWasSent: (text: string) => void;
  newMessagesCount: number;
  isOpen: boolean;
  onClose: () => void;
  messageList: any[];
  agentProfile: any;
}

interface IChatBotState {
  isOpen: boolean;
}

class ChatBot extends Component<IChatBotProps, IChatBotState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleClose = () => {
    if (this.props.onClose !== undefined) {
      this.props.onClose();
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }

  render() {
    const isOpen = ('isOpen' in this.props) ? this.props.isOpen : this.state.isOpen;
    const classList = [
      styles['sc-launcher'],
      (isOpen ? styles.opened : ''),
    ];
    return (
      <div id="sc-launcher">
        <div className={classList.join(' ')} onClick={this.handleClose}>
          <img className={styles['sc-open-icon']} src={ChatBotIcon} />
        </div>
        <ChatWindow
          messageList={this.props.messageList}
          onUserInputSubmit={this.props.onMessageWasSent}
          agentProfile={this.props.agentProfile}
          isOpen={isOpen}
          onClose={this.handleClose}
        />
      </div>
    );
  }
}

export default ChatBot;
