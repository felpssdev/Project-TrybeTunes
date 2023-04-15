import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import './Login.css';
import logo from '../img/logo.png';

class Login extends Component {
  state = {
    name: '',
    email: '',
    image: '',
    description: '',
    isDisabled: true,
    isLoading: false,
  };

  enableButton = () => {
    const { name } = this.state;
    const minLength = 3;
    if (name.length >= minLength) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleChange = (event) => {
    const { target: { value, name } } = event;

    this.setState({ [name]: value }, this.enableButton);
  };

  userLogin = async (user) => {
    const { history } = this.props;

    this.setState({ isLoading: true });
    await createUser(user);
    history.push('/search');
  };

  render() {
    const { isDisabled, name, isLoading, email, image, description } = this.state;

    const user = {
      name,
      email,
      image,
      description,
    };

    return (
      isLoading
        ? <Loading />
        : (
          <div
            data-testid="page-login"
            className="login-section"
          >
            <img src={logo} />

            <div className='name'>
              <label htmlFor="name-input">
                <input
                  className='input'
                  type="text"
                  name="name"
                  id="name-input"
                  data-testid="login-name-input"
                  placeholder="Usuário*"
                  value={ name }
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>
            </div>

            <div className='email'>
            <label htmlFor="email-input">
              <input
                className='input'
                type="email"
                name="email"
                id="email-input"
                placeholder="E-mail"
                value={ email }
                onChange={ (event) => this.handleChange(event) }
              />
            </label>
            </div>
            
            <div className='image'>
              <label htmlFor="image-input">
                <input
                  className='input'
                  type="text"
                  name="image"
                  id="image-input"
                  placeholder="Caminho para a imagem"
                  value={ image }
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>
            </div>
            
            <div className='description'>
              <label htmlFor="description-input">
                <input
                  className='input'
                  type="textarea"
                  name="description"
                  id="description-input"
                  placeholder="Descrição"
                  value={ description }
                  onChange={ (event) => this.handleChange(event) }
                />
              </label>
            </div>
            
            <button
              className='login-btn'
              data-testid="login-submit-button"
              disabled={ isDisabled }
              onClick={ () => this.userLogin(user) }
            >
              Entrar
            </button>
          </div>)
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
