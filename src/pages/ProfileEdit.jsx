import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isLoading: true,
    isDisabled: true,
  };

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const data = await getUser();
    this.setState({
      isLoading: false,
      name: data.name,
      email: data.email,
      image: data.image,
      description: data.description,
    });
  };

  handleChange = (event) => {
    const { target: { value, name } } = event;

    this.setState({ [name]: value }, this.enableButton);
  };

  enableButton = () => {
    const { name, email, image, description } = this.state;
    const emailMinLenght = 4;
    const emailCheck = email
      .includes('@') && email.includes('.com') && email.length > emailMinLenght;
    const minLength = 1;

    if (name.length >= minLength
       && emailCheck
       && image.length >= minLength
       && description.length >= minLength) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  updateUserInfo = async (user) => {
    const { history } = this.props;

    this.setState({ isLoading: true });
    await updateUser(user);
    history.push('/profile');
  };

  render() {
    const { isLoading, isDisabled, name, email, image, description } = this.state;

    const user = {
      name,
      email,
      image,
      description,
    };

    return (
      <div data-testid="page-profile-edit">
        <Header />
        <h1>Editar perfil</h1>
        {isLoading ? <Loading />
          : (
            <div>
              <label htmlFor="name-input">
                <input
                  type="text"
                  name="name"
                  id="name-input"
                  data-testid="edit-input-name"
                  placeholder="Usuário"
                  value={ name }
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>
              <label htmlFor="email-input">
                <input
                  type="email"
                  name="email"
                  id="email-input"
                  data-testid="edit-input-email"
                  placeholder="E-mail"
                  value={ email }
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>
              <label htmlFor="image-input">
                <input
                  type="text"
                  name="image"
                  id="image-input"
                  data-testid="edit-input-image"
                  placeholder="Caminho para a imagem"
                  value={ image }
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>
              <label htmlFor="description-input">
                <input
                  type="textarea"
                  name="description"
                  id="description-input"
                  data-testid="edit-input-description"
                  placeholder="Descrição"
                  value={ description }
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>
              <button
                data-testid="edit-button-save"
                disabled={ isDisabled }
                onClick={ () => this.updateUserInfo(user) }
              >
                Entrar
              </button>
            </div>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
