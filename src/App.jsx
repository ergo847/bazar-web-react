import { BrowserRouter, Routes, Route } from "react-router-dom"
import InicioPage from "./pages/InicioPage";


/* import { useState } from "react";
import BuscadorComponent from "./components/BuscadorComponent"; */

const App = () => {
  /* const [busqueda, setBusqueda] = useState(false); */

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InicioPage />} />
          <Route path="/productos" element={<h1>Listado</h1>} />
          <Route path="/productos/:id" element={<h1>Detalle</h1>} />
        </Routes>
      </BrowserRouter>


      {/* {<div className="d-flex flex-column min-vh-100 justify-content-center align-items-center text-center">
        {busqueda ? (
          <BuscadorComponent />
        ) : (
          <div>
            <h1><i className="fa-solid fa-shop"></i></h1>
            <h1>Bazar Online</h1>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar"
                aria-label="Buscar"
                aria-describedby="button-addon2"
              />
              <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => setBusqueda(true)}>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
          </div>
        )}
      </div>} */}
    </>
  );
};

export default App;
