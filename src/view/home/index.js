import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import EventoCard from '../../components/evento-card/';
import Navbar from '../../components/navbar/';
import firebase from '../../config/firebase';

import './home.css';

export default function Home({ match }) {

  const [eventos, setEventos] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  let listaEventos = [];
  const usuarioEmail = useSelector(state => state.usuarioEmail);

  //Código em looping, fazendo várias requisições para o Banco de Dados
  
  useEffect(() => {
    if (match.params.parametro) {
      firebase.firestore().collection('eventos').where('usuario', '==', usuarioEmail).get()
        .then(async (resultado) => {
          await resultado.docs.forEach(doc => {
            if (doc.data().titulo.indexOf(pesquisa) >= 0) {
              listaEventos.push({
                id: doc.id,
                ...doc.data()
              })
            }
          })
          setEventos(listaEventos);
        })
        .catch((erro) => {
          console.log(`Erro ao carregar a lista de Eventos: ${erro.message}`);
        })
    } else {
      firebase.firestore().collection('eventos').get()
        .then(async (resultado) => {
          await resultado.docs.forEach(doc => {
            if (doc.data().titulo.indexOf(pesquisa) >= 0) {
              listaEventos.push({
                id: doc.id,
                ...doc.data()
              })
            }
          })
          setEventos(listaEventos);
        })
    }
  }, [pesquisa]);

  return (
    <>
      <Navbar />
      <div className="my-3 px-4">
        <h4 className="text-center mb-4 mx-auto font-weight-bold">Eventos</h4>
        <input
          type="text"
          className="form-control text-center"
          placeholder="Pesquisar evento pelo título..."
          onChange={(e) => setPesquisa(e.target.value)}
        />
      </div>
      <div className="container-fluid">
        <div className="row">
          {
            eventos.map(item => <EventoCard
              key={item.id} id={item.id}
              img={item.foto}
              titulo={item.titulo}
              detalhes={item.detalhes}
              visualizacoes={item.visualizacoes} />)
          }
        </div>
      </div>
    </>
  )
}