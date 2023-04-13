import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  state = {
    name: '',
    isDisabled: true,
    isLoading: false,
  };

  enableButton = (value) => {
    const minLength = 3;
    if (value.length >= minLength) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  handleChange = (event) => {
    const { target: { value } } = event;

    this.setState({ name: value }, this.enableButton(value));
  };

  userLogin = async (user) => {
    const { history } = this.props;

    this.setState({ isLoading: true });
    await createUser(user);
    history.push('/search');
  };

  render() {
    const { isDisabled, name, isLoading } = this.state;

    const user = {
      name,
    };

    return (
      isLoading
        ? <Loading />
        : (
          <div
            data-testid="page-login"
            className="login-section"
          >
            <h1>Login</h1>
            <label htmlFor="name-input">
              <input
                type="text"
                name="name-input"
                id="name-input"
                data-testid="login-name-input"
                value={ name }
                onChange={ (event) => this.handleChange(event) }
              />
            </label>
            <button
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
