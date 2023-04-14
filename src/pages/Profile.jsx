import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

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

  render() {
    const { isLoading, user } = this.state;

    return (
      <div data-testid="page-profile">
        Profile
        <Header />
        {isLoading ? <Loading />
          : (
            <div>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <img src={ user.image } alt={ user.name } data-testid="profile-image" />
              <p>{user.description}</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
