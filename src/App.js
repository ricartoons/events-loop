import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../src/store/';

/**
 * páginas
 */
import Login from './view/login/index';
import NovoUsuario from './view/usuario-novo/';
import Home from './view/home/';
import RecuperarSenha from './view/usuario-recuperar-senha/'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/novousuario" component={NovoUsuario} />
        <Route exact path="/recuperarsenha" component={RecuperarSenha} />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
