import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar/';

import './evento-cadastro.css';

export default function EventoCadastro() {

  const [carregando, setCarregando] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [titulo, setTitulo] = useState();
  const [tipo, setTipo] = useState();
  const [detalhes, setDetalhes] = useState();
  const [data, setData] = useState();
  const [hora, setHora] = useState();
  const [foto, setFoto] = useState();
  const usuarioEmail = useSelector(state=>state.usuarioEmail);

  const storage = firebase.storage();
  const db = firebase.firestore();

  function cadastrar() {
    setMsgTipo(null);
    setCarregando(true);

    storage.ref(`imagens/${foto.name}`).put(foto).then(() => {
          db.collection('eventos').add({
            titulo: titulo,
            tipo: tipo,
            detalhes: detalhes,
            data: data,
            hora: hora,
            usuario: usuarioEmail,
            visualizacoes: 0,
            foto: foto.name,
            publico: 1,
            criacao: new Date()
          }).then(() => {
            setMsgTipo('sucesso');
            setCarregando(false);
          }).catch(erro => {
            setMsgTipo('erro');
            setCarregando(false);
          })
        });
  }


  return (
    <>
      <Navbar />
      <div className="col-12 mt-3">
        <div className="row">
          <h4 className="mx-auto font-weight-bold">Novo evento</h4>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="">Título</label>
            <input type="text" className="form-control" onChange={(e)=>setTitulo(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="">Tipo do evento</label>
            <select name="" id="" className="form-control" onChange={(e)=> setTipo(e.target.value)}>
              <option disable selected value>Selecione um tipo</option>
              <option value="">Festa</option>
              <option value="">Teatro</option>
              <option value="">Show</option>
              <option value="">Eventos</option>
            </select>
          </div>
          <div className="form-group"> 
            <label htmlFor="">Descrição do evento</label>
            <textarea type="text" rows="3" className="form-control" onChange={(e)=>setDetalhes(e.target.value)}></textarea>
          </div>
          <div className="form-group row">
            <div className="col-6">
              <label htmlFor="">Data</label>
              <input type="date" className="form-control" onChange={(e)=>setData(e.target.value)}/>
            </div>
            <div className="col-6">
              <label htmlFor="">Hora</label>
              <input type="time" className="form-control" onChange={(e)=>setHora(e.target.value)}/>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Upload da foto:</label>
            <input type="file" className="form-control" onChange={(e)=>setFoto(e.target.files[0])}/>
          </div>
          <div>
            {
              carregando ? <div class="spinner-border mx-auto" role="status"><span class="sr-only">Loading...</span></div>
              : <button className="btn btn-lg btn-block mt-3 btn-cadastro" type="button" onClick={cadastrar}>Publicar evento</button>
            }
          </div>
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