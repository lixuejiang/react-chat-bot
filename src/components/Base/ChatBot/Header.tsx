import React, { Component } from 'react';
import closeIcon from './assets/close-icon.png';
import styles from './styles/header.less';

interface IHeaderProps {
  imageUrl: string;
  teamName: string;
  onClose: () => void;
}

class Header extends Component<IHeaderProps> {
  render() {
    return (
      <div className={styles['sc-header']}>
        <div className={styles['sc-header--team-name']}> {this.props.teamName} </div>
        <div className={styles['sc-header--close-button']} onClick={this.props.onClose}>
          <img src={closeIcon} alt="" />
        </div>
      </div>
    );
  }
}

export default Header;
