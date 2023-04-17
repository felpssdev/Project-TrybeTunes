import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import './Profile.css';

class Profile extends Component {
  state = {
    user: '',
    isLoading: true,
  };

  componentDidMount() {
    this.updateUser();
  }

  updateUser = async () => {
    const data = await getUser();
    this.setState({ isLoading: false, user: data });
  };

  handleRedirect = () => {
    const { history: { push } } = this.props;
    push('/profile/edit');
  };

  render() {
    const { isLoading, user } = this.state;

    return (
      <div data-testid="page-profile"
      className='page-profile'>
        <Header />
        <h1>Perfil</h1>
        {isLoading ? <Loading />
          : (
            <div className='profile'>
              <div className='profile-pic-name'>
                <img src={ user.image } alt={ user.name } data-testid="profile-image" />
                <h2>{user.name}</h2>
                <h4>{user.email}</h4>
                <p onClick={ this.handleRedirect }>Editar perfil</p>
              </div>
              <div className='info'>
                <h3>Descrição:</h3>
                <p>{user.description}</p>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
