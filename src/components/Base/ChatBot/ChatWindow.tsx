import React, { Component } from 'react';
import MessageList from './MessageList';
import UserInput from './UserInput';
import Header from './Header';
import styles from './styles/chat-window.less';

interface IChatWindowProps {
  messageList: any[];
  agentProfile: any;
  isOpen: boolean;
  onClose: () => void;
  onFilesSelected: (filesList: any) => void;
  onUserInputSubmit: (message: string) => void;
  showEmoji: boolean;
}

class ChatWindow extends Component<IChatWindowProps> {
  onUserInputSubmit = (message: string) => {
    this.props.onUserInputSubmit(message);
  }

  onFilesSelected = (filesList: any) => {
    this.props.onFilesSelected(filesList);
  }

  render() {
    const messageList = this.props.messageList || [];
    const classList = [
      styles['sc-chat-window'],
      (this.props.isOpen ? styles.opened : styles.closed),
    ];
    return (
      <div className={classList.join(' ')}>
        <Header
          teamName={this.props.agentProfile.teamName}
          imageUrl={this.props.agentProfile.imageUrl}
          onClose={this.props.onClose}
        />
        <MessageList
          messages={messageList}
          // imageUrl={this.props.agentProfile.imageUrl}
        />
        <UserInput
          onSubmit={this.onUserInputSubmit}
          onFilesSelected={this.onFilesSelected}
          showEmoji={this.props.showEmoji}
        />
      </div>
    );
  }
}

export default ChatWindow;
