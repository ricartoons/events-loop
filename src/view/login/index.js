import React, { useState } from 'react';
import firebase from '../../config/firebase';
import {Link} from 'react-router-dom';
import 'firebase/auth';
import './login.css';

function Login(props){

  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();

  function logar(){
    firebase.auth()
      .signInWithEmailAndPassword(email,senha)
        .then(resultado =>{
          setMsgTipo('sucesso');
        })
        .catch(erro => {
          setMsgTipo('erro');
        })
  }

  return (
    <div className="login-content d-flex">
      <form className="form-signin mx-auto">
        <div className="text-center mb-4">
          <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">Login</h1>
        </div>
        <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email" />
        <input onChange={(e) => setSenha(e.target.value)}type="password" id="inputPassword" className="form-control my-2" placeholder="Senha" />
        <button className="btn btn-lg btn-block btn-login" type="button" onClick={logar}>Login</button>
        <div className="opcoes-login mt-3">
          <a href="#" className="mx-2">Recuperar minha senha</a>
          <span className="text-white">&#9733;</span>
          <Link to='novousuario' className="mx-2">Quero me cadastrar</Link>
        </div>
        {msgTipo === 'sucesso' && 
        <div className="msg-login text-white text-center my-5 text-center">
          <span><strong>WoW!!!</strong> Você está conectado &#128526;</span>
        </div>
        }
        {msgTipo === 'erro' && 
        <div className="msg-login text-white text-center my-5 text-center">
          <span><strong>Ops!!!</strong> Verifique se o Usuário/Senha estão corretos &#128549;</span>
        </div>
        }
      </form>
    </div>
  );
}

export default Login;