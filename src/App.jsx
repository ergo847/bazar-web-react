import { useState } from "react";
import BuscadorComponent from "./components/BuscadorComponent";

const App = () => {
  const [busqueda, setBusqueda] = useState(false);

  return (
    <>
      {/* div container todo centrado */}
      <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center text-center">
        {busqueda ? (
          <BuscadorComponent />
        ) : (
          <div>
            <h1><i className="fa-solid fa-shop"></i></h1>
            <h1>Bazar Online</h1>
            <div className="input-group mb-3">
              {/* Corrected the input tag */}
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
      </div>
    </>
  );
};

export default App;
