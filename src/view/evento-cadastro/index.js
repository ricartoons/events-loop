import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar/';

import './evento-cadastro.css';

export default function EventoCadastro() {
  const [msgTipo, setMsgTipo] = useState('erro');
  return (
    <>
      <Navbar />
      <div className="col-12 mt-3">
        <div className="row">
          <h3 className="mx-auto font-weight-bold">Novo evento</h3>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="">Título</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="">Tipo do evento</label>
            <select name="" id="">
              <option disable selected value>Selecione um tipo</option>
              <option value="">Festa</option>
              <option value="">Teatro</option>
              <option value="">Show</option>
              <option value="">Eventos</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Descrição do evento</label>
            <textarea type="text" rows="3" className="form-control"></textarea>
          </div>
          <div className="form-group row">
            <div className="col-6">
              <label htmlFor="">Data</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-6">
              <label htmlFor="">Hora</label>
              <input type="time" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Upload da foto:</label>
            <input type="file" className="form-control" />
          </div>
          <button className="btn btn-lg btn-block mt-3 btn-cadastro">Publicar evento</button>
        </form>
        {msgTipo === 'sucesso' &&
          <div className="msg-login text-center text-center">
            <span><strong>WoW!!!</strong> Evento publicado &#128526;</span>
          </div>
        }
        {msgTipo === 'erro' &&
          <div className="msg-login text-center text-center">
            <span><strong>Ops!!!</strong> Não foi possível publicar o evento &#128549;</span>
          </div>
        }
      </div>
    </>
  );
}