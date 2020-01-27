import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Navbar from '../../components/navbar/';

export default function Home(){
  return(
    <div>
      <Navbar/>
      <h1>Página inicial</h1>
    </div>
  )
}