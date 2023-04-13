import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </header>)
      : <Loading />
    );
  }
}

export default Header;
