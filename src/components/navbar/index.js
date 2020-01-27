import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-purple">
      <a className="navbar-brand" href="#">
        <img src="assets/logo.svg" alt="" className="ico-logo" />
        <span className="txt-logo">Event's loop</span>
      </a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse f" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="novousuario">Cadastrar</Link>
          </li>
          <li>
            <Link className="nav-link" to="Login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}