import React, { Component } from 'react';
import TextMessage from './TextMessage';
import FileMessage from './FileMessage';
import ListMessage from './ListMessage';
import LinkMessage from './LinkMessage';
import chatIconUrl from '../assets/chat-icon.svg';
import styles from '../styles/message.less';

interface IMessageProps {
  message: any;
}

class Message extends Component<IMessageProps> {
  _renderMessageOfType = (type: string) => {
    switch (type) {
      case 'text':
        return <TextMessage {...this.props.message} />;
      case 'list':
        return <ListMessage {...this.props.message} />;
      case 'link':
        return <LinkMessage {...this.props.message} />;
      // case 'emoji':
      //   return <EmojiMessage {...this.props.message} />;
      case 'file':
        return <FileMessage {...this.props.message} />;
      default:
        console.error(`Attempting to load message with unsupported file type '${type}'`);
    }
  }

  render() {
    const contentClassList = [
      styles['sc-message--content'],
      (this.props.message.author === 'me' ? styles.sent : styles.received),
    ];
    const { author } = this.props.message;
    return (
      <div className={styles['sc-message']}>
        <div className={contentClassList.join(' ')}>
          {
            author !== 'me'
              ? (
                <div
                  className={styles['sc-message--avatar']}
                  style={{
                    backgroundImage: `url(${chatIconUrl})`,
                  }}
                />
              )
              : null
          }
          {this._renderMessageOfType(this.props.message.type)}
          {
            author === 'me'
              ? (
                <div
                  className={styles['sc-message--avatar']}
                >
                  我
                </div>
              )
              : null
          }
        </div>
      </div>
    );
  }
}

export default Message;
