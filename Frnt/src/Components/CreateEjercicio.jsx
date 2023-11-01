import React, {useState}from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const endpoint = "http://127.0.0.1:8000/api";

export const CreateEjercicio = () => {
  const [titulo, setTitulo] = useState('');
  const [enunciado, setEnunciado] = useState(0);
  const [dificultad, setDificultad] = useState(0);
  const navigate = useNavigate();

  const store = async (e) => {
    e.preventDefault()
    await axios.post(endpoint, {titulo: titulo, enunciado: enunciado, dificultad: dificultad })
    navigate('/')
  } 

  return (
    <div>
      <h3>
        Create Ejercicio 
      </h3>
    </div>
  )
}
