import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EventoCard from '../../components/evento-card/';
import Navbar from '../../components/navbar/';
import firebase from '../../config/firebase';

import './home.css';

export default function Home() {

  const [eventos, setEventos] = useState([]);
  let listaEventos = [];
  useEffect(() => {
    firebase.firestore().collection('eventos').get()
      .then(async (resultado) => {
        await resultado.docs.forEach(doc => {
          listaEventos.push({
            id: doc.id,
            ...doc.data()
          })
        })
        setEventos(listaEventos);
      })
      .catch((erro) => {
        console.log(`Erro ao carregar a lista de Eventos: ${erro.message}`);
      })
  });

  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          {
            eventos.map(item => <EventoCard key={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes}/>)
          }
        </div>
      </div>
      <h1>{useSelector(state => state.usuarioEmail)}</h1>
      <h1>Usuario logado? {useSelector(state => String(state.usuarioLogado))}</h1>
    </>
  )
}