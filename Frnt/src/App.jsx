import { useState } from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowEjercicio from '../../Frnt/src/Components/ShowEjercicio';
import EjercicioBanco from './Components/BuscarEjercicio';
import BuscarEjercicios from './Components/BuscarEjercicio';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<BuscarEjercicios/>}/>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
