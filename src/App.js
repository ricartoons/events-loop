import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

/**
 * páginas
 */
import Login from './view/login/index';
import NovoUsuario from './view/usuario-novo/';
import Home from './view/home/';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/novousuario" component={NovoUsuario} />
    </BrowserRouter>
  );
}

export default App;
