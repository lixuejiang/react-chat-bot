import React, { Component } from 'react';
import Message from './Messages';
import styles from './styles/chat-window.less';

interface IMessageListProp {
  messages: any[];
}

class MessageList extends Component<IMessageListProp> {
  scrollList: any;

  componentDidUpdate() {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  render() {
    return (
      <div className={styles['sc-message-list']} ref={el => { this.scrollList = el; }}>
        {this.props.messages.map((message, i) => {
          return <Message message={message} key={message + i} />;
        })}
      </div>
    );
  }
}

export default MessageList;
