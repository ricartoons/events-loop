import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from '../src/store/';
import { PersistGate } from 'redux-persist/integration/react';

/**
 * páginas
 */
import Login from './view/login/index';
import NovoUsuario from './view/usuario-novo/';
import Home from './view/home/';
import RecuperarSenha from './view/usuario-recuperar-senha/';
import EventoCadastro from './view/evento-cadastro/';
import EventoDetalhes from './view/evento-detalhes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading = {null} persistor={persistor}>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
          <Route path="/eventos/:parametro" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/novousuario" component={NovoUsuario} />
          <Route exact path="/recuperarsenha" component={RecuperarSenha} />
          <Route exact path="/cadastrarevento" component={EventoCadastro} />
          <Route path="/eventodetalhes/:id" component={EventoDetalhes} />
          <Route path="/editarevento/:id" component={EventoCadastro} />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
