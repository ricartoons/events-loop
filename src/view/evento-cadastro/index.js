import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar/';

import './evento-cadastro.css';

export default function EventoCadastro(props) {

  const [carregando, setCarregando] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [titulo, setTitulo] = useState();
  const [tipo, setTipo] = useState();
  const [detalhes, setDetalhes] = useState();
  const [data, setData] = useState();
  const [hora, setHora] = useState();
  const [fotoAtual, setFotoAtual] = useState();
  const [fotoNova, setFotoNova] = useState();

  const usuarioEmail = useSelector(state => state.usuarioEmail);

  const storage = firebase.storage();
  const db = firebase.firestore();

  useEffect(() => {
    if(props.match.params.id){
      firebase.firestore().collection('eventos').doc(props.match.params.id).get()
        .then(resultado => {
          setTitulo(resultado.data().titulo);
          setTipo(resultado.data().tipo);
          setDetalhes(resultado.data().detalhes);
          setData(resultado.data().data);
          setHora(resultado.data().hora);
          setFotoAtual(resultado.data().foto);
        })
    }
  }, [carregando]);

  function atualizar() {
    setMsgTipo(null);
    setCarregando(true);

    if (fotoNova) {
      storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);
    }
    db.collection('eventos').doc(props.match.params.id).update({
      titulo: titulo,
      tipo: tipo,
      detalhes: detalhes,
      data: data,
      hora: hora,
      foto: fotoNova ? fotoNova.name : fotoAtual
    }).then(() => {
      setMsgTipo('sucesso');
      setCarregando(false);
    }).catch(erro => {
      setMsgTipo('erro: ', erro);
      setCarregando(false);
    })
  }


  function cadastrar() {
    setMsgTipo(null);
    setCarregando(true);

    storage.ref(`imagens/${fotoNova.name}`).put(fotoNova).then(() => {
      db.collection('eventos').add({
        titulo: titulo,
        tipo: tipo,
        detalhes: detalhes,
        data: data,
        hora: hora,
        usuario: usuarioEmail,
        visualizacoes: 0,
        foto: fotoNova.name,
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
          <h4 className="mx-auto font-weight-bold">
            {
              props.match.params.id ?
                'Atualizar evento'
                :
                'Novo evento'
            }
          </h4>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="">Título</label>
            <input type="text" className="form-control" onChange={(e) => setTitulo(e.target.value)} value={titulo && titulo} />
          </div>
          <div className="form-group">
            <label htmlFor="">Tipo do evento</label>
            <select name="" id="" className="form-control" onChange={(e) => setTipo(e.target.value)} value={tipo && tipo}>
              <option disable="disabled">Selecione um tipo</option>
              <option>Festa</option>
              <option>Teatro</option>
              <option>Show</option>
              <option>Eventos</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Descrição do evento</label>
            <textarea type="text" rows="3" className="form-control" onChange={(e) => setDetalhes(e.target.value)} value={detalhes && detalhes}></textarea>
          </div>
          <div className="form-group row">
            <div className="col-6">
              <label htmlFor="">Data</label>
              <input type="date" className="form-control" onChange={(e) => setData(e.target.value)} value={data && data} />
            </div>
            <div className="col-6">
              <label htmlFor="">Hora</label>
              <input type="time" className="form-control" onChange={(e) => setHora(e.target.value)} value={hora && hora} />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="">Upload da foto: {props.match.params.id ? <em>Caso queira manter a mesma foto, não precisa clicar no botão "Escolher arquivo" </em> : null}</label>
            <input type="file" className="form-control" onChange={(e) => setFotoNova(e.target.files[0])}/>
          </div>
          <div className="mx-auto">
            {
              carregando ? <div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div>
                :
                <button
                  className="btn btn-lg btn-block mt-3 btn-cadastro"
                  type="button"
                  onClick={props.match.params.id ? atualizar : cadastrar}
                >
                  {
                    props.match.params.id ?
                      'Atualizar evento'
                      :
                      'Publicar evento'
                  }
                </button>
            }
          </div>
        </form>
        {msgTipo === 'sucesso' &&
          <div className="msg-login text-center text-center">
            <span><strong>WoW!!!</strong> Evento publicado <span>&#128526;</span></span>
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