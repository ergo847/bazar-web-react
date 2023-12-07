import { BrowserRouter, Routes, Route } from "react-router-dom"
import InicioPage from "./pages/InicioPage";
import ProductosPage from "./pages/ProductosPage";
import ProductoPage from "./pages/ProductoPage";
import NewProductoPage from "./pages/NewProductoPage";
import EditProductoPage from "./pages/EditProductoPage";

const App = () => {

  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InicioPage />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/producto/create" element={<NewProductoPage />} />
            <Route path="/productos/:id" element={<ProductoPage />} />
            <Route path="/producto/:id/edit" element={<EditProductoPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
