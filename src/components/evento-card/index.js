import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';

import './evento-card.css';

export default function EventoCard({key, img, titulo,detalhes,visualizacoes}) {

  const [urlImagem, setUrlImagem] = useState();
  
  useEffect(()=>{
    firebase.storage().ref(`imagens/${img}`).getDownloadURL()
      .then(url => setUrlImagem(url))
      .catch((erro)=>{
        console.log(`Ocorreu um erro na importação da imagem: ${erro.message}`);
      })
  });

  return (
    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 my-3 text-center">
      <div className="container-img-card">
        <img src={urlImagem} alt="Imagem do evento" className="card-img-top img-cartao" />
      </div>
        <h5 className="font-weight-bold card-title">{titulo}</h5>
        <p className="card-text text-justify">{detalhes}</p>
        <div className="rodape-card d-flex align-items-center justify-content-between">
          <Link to="/" className="btn btn-sm btn-detalhes">+ detalhes</Link>
          <div className="text-right ">
            <img src="../assets/eye.svg" alt="" className="ico-eye mx-2" />
            <span>{visualizacoes}</span>
          </div>
        </div>
    </div>
  );
}