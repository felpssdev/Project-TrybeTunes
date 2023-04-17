import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import './ProfileEdit.css';

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
      <div className='page-profile-edit'>
        <Header />
        <h1>Editar perfil</h1>
        {isLoading ? <Loading />
          : (
            <div className='profile-edit-main'>

              <div className="profile-edit-preview">
                <h3>Preview</h3>
                <div className='profile-edit-content'>
                  <div className='profile-edit-pic-name'>
                    <img src={ image } alt={ name } data-testid="profile-image" />
                    <h2>{name}</h2>
                    <h4>{email}</h4>
                  </div>
                  <div className='profile-edit-info'>
                    <h3>Descrição:</h3>
                    <p>{description}</p>
                  </div>
                </div>
              </div>
              
              <div className='profile-edit-edit'>

                <h3>Editar</h3>
                <div className='profile-edit-input'>
                  
                  <div className='name-input'>
                    <label htmlFor="name-input">
                      <input
                        type="text"
                        name="name"
                        id="name-input"
                        data-testid="edit-input-name"
                        placeholder="Usuário"
                        className='input'
                        value={ name }
                        onChange={ (event) => this.handleChange(event) }
                      />
                    </label>
                  </div>

                  <div className='email-input'>
                    <label htmlFor="email-input">
                      <input
                        type="email"
                        name="email"
                        id="email-input"
                        data-testid="edit-input-email"
                        placeholder="E-mail"
                        className='input'
                        value={ email }
                        onChange={ (event) => this.handleChange(event) }
                      />
                    </label>
                  </div>

                  <div className="image-input">
                    <label htmlFor="image-input">
                      <input
                        type="text"
                        name="image"
                        id="image-input"
                        data-testid="edit-input-image"
                        placeholder="Caminho para a imagem"
                        className='input'
                        value={ image }
                        onChange={ (event) => this.handleChange(event) }
                      />
                    </label>
                  </div>

                  <div className="description-input">
                    <label htmlFor="description-input">
                      <input
                        type="textarea"
                        name="description"
                        id="description-input"
                        data-testid="edit-input-description"
                        placeholder="Descrição"
                        className='input'
                        value={ description }
                        onChange={ (event) => this.handleChange(event) }
                      />
                    </label>
                  </div>

                  <button
                    className='update-btn'
                    data-testid="edit-button-save"
                    disabled={ isDisabled }
                    onClick={ () => this.updateUserInfo(user) }
                  >
                    Atualizar
                  </button>
                </div>
              </div>
              
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
