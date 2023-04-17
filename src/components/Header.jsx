import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
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
    return (
      <header>
          <div className='content'>
            <div className='title'>
              <img src={logo} className="logo" />
            </div>
            <div className='nav-links'>
              <div className='search'>
                <Link to="/search" style={{ textDecoration: 'none' }} data-testid="link-to-search">
                <p><i className="fa fa-search" />Pesquisa</p>
              </Link>
              </div>
             
              <Link to="/favorites" style={{ textDecoration: 'none' }} data-testid="link-to-favorites">
                <p><i class="fa-solid fa-heart" />Favoritos</p>
              </Link>
              <Link to="/profile" style={{ textDecoration: 'none' }} data-testid="link-to-profile">
                <p><i class="fa-solid fa-user" />Perfil</p>
                </Link>
            </div>
          </div>
      </header>
    );
  }
}

export default Header;
