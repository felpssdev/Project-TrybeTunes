import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userData: '',
  };

  componentDidMount() {
    this.updateUserName();
  }

  updateUserName = async () => {
    const username = await getUser();
    this.setState({ userData: username });
  };

  render() {
    const { userData } = this.state;
    return (userData
      ? (
        <header data-testid="header-component">
          <p data-testid="header-user-name">{`Olá, ${userData.name}!`}</p>
        </header>)
      : <Loading />
    );
  }
}

export default Header;
