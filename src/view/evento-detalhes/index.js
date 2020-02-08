import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar/';

import './eventos-detalhes.css';


export default function EventoDetalhes(props) {

  const [evento, setEvento] = useState({});
  const [urlImg, setUrlImg] = useState({});
  const [carregando, setCarregando] = useState(true);
  const usuarioLogado = useSelector(state => state.usuarioEmail);
  const [excluido, setExcluido] = useState();

  function remover(){
    firebase.firestore().collection('eventos').doc(props.match.params.id).delete()
        .then(() => {
          setExcluido(true);
        });
  }

  useEffect(() => {
    if (carregando) {
      firebase.firestore().collection('eventos').doc(props.match.params.id).get()
        .then(resultado => {
          setEvento(resultado.data());
          firebase.firestore().collection('eventos').doc(props.match.params.id).update('visualizacoes', resultado.data().visualizacoes + 1);
          firebase.storage().ref(`imagens/${resultado.data().foto}`).getDownloadURL()
            .then(url => {
              setUrlImg(url);
              setCarregando(false);
            })
        })
    } else {
      firebase.storage().ref(`imagens/${evento.foto}`).getDownloadURL()
        .then(url => setUrlImg(url))
    }
  }, []);

  return (
    <>
      <Navbar />
      { excluido ? <Redirect to="/" /> : null }
      <div className="container-fluid">

        {
          carregando ?
            <div className="row mt-5">
              <div className="spinner-border mx-auto" role="status"><span className="sr-only">Loading...</span></div>
            </div>
            :
            <div>
              <div className="row">
                <div className="container-img">
                  <img src={urlImg} alt="Banner" className="img-banner" />
                </div>
                <div className="col-md-12 mt-2 text-right ">
                  <img src="../assets/eye.svg" alt="" className="ico-eye mx-2" />
                  <span>{evento.visualizacoes + 1}</span>
                </div>
              </div>
              <h4 className="mt-4 text-center font-weigth-bold title">{evento.titulo}</h4>
              <div className="row mt-3 d-flex justify-content-around">
                <div className="col-md-3 col-sm-12 box-info p3 my-3">
                  <img src="../assets/tickets.svg" alt="" />
                  <h5>
                    <strong>
                      Tipo
                  </strong>
                  </h5>
                  <span className="mb-3">{evento.tipo}</span>
                </div>
                <div className="col-md-3 col-sm-12 box-info p3 my-3">
                  <img src="../assets/date.svg" alt="" />
                  <h5>
                    <strong>
                      Data
                  </strong>
                  </h5>
                  <span className="mb-3">{evento.data}</span>
                </div>
                <div className="col-md-3 col-sm-12 box-info p3 my-3">
                  <img src="../assets/hour.svg" alt="" />
                  <h5>
                    <strong>
                      Hora
                  </strong>
                  </h5>
                  <span className="mb-3">{evento.hora}</span>
                </div>
              </div>
              <div className="box-detalhes mt-5">
                <h5 className="mx-auto"><strong>Detalhes do evento</strong></h5>
                <p className="text-justify">{evento.detalhes}</p>
              </div>
              {
                usuarioLogado === evento.usuario ?
                  <Link to={`/editarevento/${props.match.params.id}`} className="btn-editar">
                    <img src="../assets/edit.svg" alt="" className="ico-btn-editar" />
                    <span className="txt-btn-editar">Editar evento</span>
                  </Link>
                :
                  ''
              }
              {
                usuarioLogado === evento.usuario ?
                  <button
                    className="btn-remover"
                    type="button"
                    onClick={remover}
                  >
                    <img src="../assets/remove.svg" alt="" className="ico-btn-editar" />
                    <span className="txt-btn-editar">Remover evento</span>
                  </button>
                :
                  null
              }
            </div>

        }
      </div>
    </>
  );
}