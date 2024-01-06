import React, { Component } from 'react';
import { iniciarSesion } from './usuarios-services';
import '../../styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    // Agrega la clase al body cuando el componente se monta
    document.body.classList.add('login-page');
  }

  componentWillUnmount() {
    // Elimina la clase del body cuando el componente se desmonta
    document.body.classList.remove('login-page');
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleLogin = async () => {
    const { username, password } = this.state;

    try {
      const response = await iniciarSesion({ username, password });
      this.props.history.push('/home');
      console.log('Inicio de sesión exitoso:', response.data);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response.data);
    }
  };

  handleForgotPassword = () => {
    // Lógica para manejar el olvido de contraseña, por ejemplo, redirigir a la página de restablecimiento de contraseña.
    console.log('Forgot Password clicked');
  };

  render() {
    return (
      <div className="login-container">
        <form>
          <h1>Inicio de sesion</h1>
          <div className="inset">
            <p>
              <label htmlFor="username">USUARIO</label>
              <input
               type="text" 
               name="username" 
               id="username"
               onChange={this.handleInputChange}
               value={this.state.username} />
            </p>
            <p>
              <label htmlFor="password">CONTRASEÑA</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={this.handleInputChange}
                value={this.state.password } />
            </p>
          </div>
          <p className="p-container">
            <span>¿Olvido su contraseña?</span>
            <input
              type="submit"
              name="go"
              id="go"
              value="Log in"
              onClick={(e) => {
                e.preventDefault();
                this.handleLogin();
              }} />
          </p>
        </form>
      </div>
    );
  }
}

export default Login;


