import { Button, Input, InputBase, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const endpoint = "http://127.0.0.1:8000/api/";

function BuscarEjercicios() {

    const [texto, setTexto] = useState('');
    const [ejercicios, setEjercicios] = useState([]);
    


    
    const handleClick = async () => 
    {
      const respuesta = await axios.get(`${endpoint}Ejercicios/search/${texto}`)
      setEjercicios(respuesta.data)
    };

    const handleChange = (e) => {
      setTexto(e.target.value);
      handleClick()
    };

  return (
    <div>
      <InputBase
        type="text"
        value={texto}
        placeholder="Mensaje"
        onChange={handleChange}
      />
      <Button onClick={handleClick}>Buscar</Button>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>TITULO</TableCell>
              <TableCell align="right">ENUNCIADO</TableCell>
              <TableCell align="right">DIFICULTAD</TableCell>
              <TableCell align="right">ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ejercicios.length > 0 ? (
              ejercicios.map((ejercicio) => (
                <TableRow key={ejercicio.id}>
                  <TableCell align="right">{ejercicio.titulo}</TableCell>
                  <TableCell align="right">{ejercicio.enunciado}</TableCell>
                  <TableCell align="right">{ejercicio.dificultad}</TableCell>
                  <TableCell align="right">
                    <Link to={`/edit/${ejercicio.id}`}>Edit</Link>
                    <Button
                      className="btn btn-danger"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No se encontraron resultados.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
      </TableContainer>
    </div>
  );
}

export default BuscarEjercicios ;
