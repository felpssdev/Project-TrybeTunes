import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';
import logo from '../img/logo.png'

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
    return (
      <header>
        {userData
        ? (
          <div className='content'>
            <div className='title'>
              <img src={logo} className="logo" />
            </div>
            <div className='nav-links'>
              <Link to="/search" style={{ textDecoration: 'none' }} data-testid="link-to-search">
              <p>Pesquisa</p>
              </Link>
              <Link to="/favorites" style={{ textDecoration: 'none' }} data-testid="link-to-favorites"><p>Favoritos</p></Link>
              <Link to="/profile" style={{ textDecoration: 'none' }} data-testid="link-to-profile"><p>Perfil</p></Link>
            </div>
          </div>)
        : <Loading />}
      </header>
    );
  }
}

export default Header;
