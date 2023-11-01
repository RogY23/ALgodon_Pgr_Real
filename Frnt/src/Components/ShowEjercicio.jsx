import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputSearch from "./Layout/InputSearch";

const endpoint = "http://127.0.0.1:8000/api";
const ShowEjercicio = () => {
  const [ejercicio, setEjercicio] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    getAllEjercicios();
  }, []);

  const getAllEjercicios = async () => {
    try {
      const response = await axios.get(`${endpoint}/Ejercicios`);
      setEjercicio(response.data);
    } catch (error) {
      console.error("Error al obtener ejercicios", error);
    }
  };

  const deleteEjercicios = async (id) => {
    try {
      await axios.delete(`${endpoint}/Ejercicios/${id}`);
      getAllEjercicios(); // Corregir para llamar a la función
    } catch (error) {
      console.error("Error al eliminar ejercicio", error);
    }
  };

  const searchEjercicios = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/Ejercicios/search/${searchTerm}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error en la búsqueda", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchEjercicios();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputSearch
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit">Buscar</Button>
      </form>

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
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell align="right">{result.titulo}</TableCell>
                  <TableCell align="right">{result.enunciado}</TableCell>
                  <TableCell align="right">{result.dificultad}</TableCell>
                  <TableCell align="right">
                    <Link to={`/edit/${result.id}`}>Edit</Link>
                    <Button
                      onClick={() => deleteEjercicios(result.id)}
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
};

export default ShowEjercicio;
