import React, { useState } from 'react';
import { iniciarSesion } from './usuarios-services';
import { useNavigate } from 'react-router-dom';
import '../../styles/Login.css';

function Login() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const { username, password } = credentials;
  
    try {
      const response = await iniciarSesion({ username, password });
      navigate('/');
      console.log('Inicio de sesión exitoso:', response.data);
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response.data);
      alert('Credenciales incorrectas. Por favor, verifique su usuario y contraseña.');
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password clicked');
  };

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
              onChange={handleInputChange}
              value={credentials.username}
            />
          </p>
          <p>
            <label htmlFor="password">CONTRASEÑA</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleInputChange}
              value={credentials.password}
            />
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
              handleLogin();
            }}
          />
        </p>
      </form>
    </div>
  );
}

export default Login;
