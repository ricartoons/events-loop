import React, {useState} from 'react';
import { useSelector } from 'react-redux';

import './home.css';
import Navbar from '../../components/navbar/';

export default function Home(){
  return(
    <>
      <Navbar/>
      <h1>{useSelector(state => state.usuarioEmail)}</h1>
      <h1>Usuario logado? {useSelector(state => String(state.usuarioLogado))}</h1>
    </>
  )
}