import React, { Component } from 'react';
import ChatWindow from './ChatWindow';
import launcherIcon from './assets/logo-no-bg.svg';
import launcherIconActive from './assets/close-icon.png';
import styles from './styles/launcher.less';

interface ILauncherProps {
  // onMessageWasReceived: (activeKey: string) => void;
  onMessageWasSent: (activeKey: string) => void;
  onFilesSelected: (fileList: any) => void;
  newMessagesCount: number;
  isOpen: boolean;
  handleClick: () => void;
  messageList: any[];
  showEmoji: boolean;
  agentProfile: any;
}

interface ILauncherState {
  isOpen: boolean;
}

class Launcher extends Component<ILauncherProps, ILauncherState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleClick = () => {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
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
        <div className={classList.join(' ')} onClick={this.handleClick.bind(this)}>
          <MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
          <img className={styles['sc-open-icon']} src={launcherIconActive} />
          <img className={styles['sc-closed-icon']} src={launcherIcon} />
        </div>
        <ChatWindow
          messageList={this.props.messageList}
          onUserInputSubmit={this.props.onMessageWasSent}
          onFilesSelected={this.props.onFilesSelected}
          agentProfile={this.props.agentProfile}
          isOpen={isOpen}
          onClose={this.handleClick}
          showEmoji={this.props.showEmoji}
        />
      </div>
    );
  }
}

const MessageCount = (props: any) => {
  if (props.count === 0 || props.isOpen === true) { return null; }
  return (
    <div className={styles['sc-new-messages-count']}>
      {props.count}
    </div>
  );
};

export default Launcher;
