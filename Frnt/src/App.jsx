import { useState } from 'react'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowEjercicio from '../../Frnt/src/Components/ShowEjercicio';
import EjercicioBanco from './Components/BuscarEjercicio';
import BuscarEjercicios from './Components/BuscarEjercicio';
import Diagramador from './Components/PantallaDiagramador/Diagramador';
import Diagramador2 from './Components/PantallaDiagramador/Diagramador2';
import FlowDiagram from './Components/PantallaDiagramador/FlowDiagram';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<BuscarEjercicios/>}/>
          <Route path='/Diagram' element={<Diagramador/>}></Route>
          <Route path='/Diag' element={<Diagramador2/>}></Route>
          <Route path='/D' element={<FlowDiagram/>}></Route>

        </Routes>
      </BrowserRouter>
      </div>
    </>
  )
}

export default App
