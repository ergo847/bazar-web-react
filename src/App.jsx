import { BrowserRouter, Routes, Route } from "react-router-dom"
import InicioPage from "./pages/InicioPage";
import ProductosPage from "./pages/ProductosPage";
import ProductoPage from "./pages/ProductoPage";

const App = () => {

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InicioPage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/productos/:id" element={<ProductoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
