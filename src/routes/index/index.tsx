/* eslint-disable max-len */
import React, { Component } from 'react';
import { ChatBot } from '@/components';

const messageHistory = [
  { type: 'text', author: 'me', data: { text: "Why don't they have salsa on the table?" } },
  { type: 'text', author: 'them', data: { text: 'What do you need salsa for?' } },
  { type: 'text', author: 'me', data: { text: 'Salsa is now the number one condiment in America.' } },
  { type: 'text', author: 'them', data: { text: "You know why? Because people like to say 'salsa.' 'Excuse me, do you have salsa?' 'We need more salsa.' 'Where is the salsa? No salsa?'" } },
  { type: 'text', author: 'me', data: { text: "You know it must be impossible for a Spanish person to order seltzer and not get salsa. 'I wanted seltzer, not salsa.'" } },
  { type: 'text', author: 'them', data: { text: "Don't you know the difference between seltzer and salsa?? You have the seltezer after the salsa!" } },
  { type: 'text', author: 'me', data: { text: 'See, this should be a show. This is the show. ' } },
  { type: 'text', author: 'them', data: { text: 'What?' } },
  { type: 'text', author: 'me', data: { text: 'This. Just talking.' } },
  { type: 'text', author: 'them', data: { text: 'Yeah, right.' } },
  { type: 'text', author: 'me', data: { text: "I'm really serious. I think that's a good idea. " } },
  { type: 'text', author: 'them', data: { text: "Just talking? Well what's the show about?" } },
  { type: 'text', author: 'me', data: { text: "It's about nothing." } },
  { type: 'text', author: 'them', data: { text: 'No story?' } },
  { type: 'text', author: 'me', data: { text: 'No forget the story. ' } },
  { type: 'text', author: 'them', data: { text: "You've got to have a story." } },
  { type: 'list', author: 'them', data: { text: "You've got to have a story." } },
  { type: 'link', author: 'them', data: { text: "You've got to have a story." } },
  // {
  //   type: 'file', author: 'me',
  //   data: {
  //     url: monsterImgUrl,
  //     fileName: 'bigBlue.png'
  //   }
  // },
];

interface IDemoProps {

}

interface IDemoState {
  messageList: any[];
  newMessagesCount: number;
  isOpen: boolean;
}

export default class Demo extends Component<IDemoProps, IDemoState> {
  constructor(props: any) {
    super(props);
    this.state = {
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: true,
    };
  }

  _onMessageWasSent = (message: any) => {
    this.setState({
      messageList: [...this.state.messageList, message],
    });
  }

  _sendMessage = (text: any) => {
    if (text.length > 0) {
      const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1;
      this.setState({
        newMessagesCount,
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text },
        }],
      });
    }
  }

  handleClose = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0,
    });
  }

  render() {
    return (
      <div>
        <ChatBot
          agentProfile={{
            teamName: '智能对话机器人',
            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
          }}
          onMessageWasSent={this._onMessageWasSent}
          messageList={this.state.messageList}
          newMessagesCount={this.state.newMessagesCount}
          onClose={this.handleClose}
          isOpen={this.state.isOpen}
        />
      </div>
    );
  }
}
