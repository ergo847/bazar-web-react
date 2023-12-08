import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BuscadorComponent from '../components/BuscadorComponent';
import EstrellasRatingComponent from '../components/EstrellasRatingComponent';

const ProductosPage = () => {
    const urlApi = 'https://bazar-api-laravel-production.up.railway.app/api';
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('search') || '';
    const page = queryParams.get('page') || 1;

    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(page);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const getProductos = async () => {
            try {
                const response = await fetch(`${urlApi}/productos?search=${query}&page=${currentPage}`);
                if (!response.ok) {
                    throw new Error('Error al obtener productos');
                }

                const data = await response.json();
                console.log(data);

                // Set pagination details
                setCurrentPage(data.data.current_page);
                setTotalPages(data.data.last_page);

                setProductos(data.data.data);
                setCargando(false);
            } catch (error) {
                console.error('Error al obtener productos:', error);
                setError('Hubo un error al obtener los productos');
                setCargando(false);
            }
        };

        getProductos();
    }, [query, currentPage]);

    const renderProductos = () => {
        return (
            <div className="row">
                {/* si no hay productos poner un div que dice que no hy registrls */}

                {productos.length === 0 && (
                    <div className="col-12">
                        <div id='sin-productos' className="alert alert-info">
                            No hay productos registrados.
                        </div>
                    </div>
                )}

                {productos.map((producto) => (
                    <div key={producto.id} className="col-md-4 mb-4">
                        <div className="card">
                            <img
                                src={producto.thumbnail}
                                className="card-img-top img-fluid"
                                alt={producto.title}
                                style={{ objectFit: 'contain', maxHeight: '200px' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{producto.title}</h5>
                                <p className="card-text">{producto.description}</p>
                                <p className="card-text">Categoría: {producto.category}</p>
                                <p className="card-text">Precio: ${producto.price}</p>
                                <EstrellasRatingComponent rating={parseFloat(producto.rating)} />
                                <Link to={`/productos/${producto.id}`} className="btn btn-outline-secondary m-1 ver-producto">
                                    Ver Detalles
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        );
    };


    if (cargando) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="row">
            <div className="col-12">
                <h1 className='mt-5'>
                    <i className="fa-solid fa-shop"></i>
                </h1>
                <h1>
                    <Link to="/" className="btn btn-outline-secondary me-2">
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                    Listado de Productos
                    <Link to="/producto/create" className="btn btn-outline-secondary ms-2">
                        <i className="fa-solid fa-plus" id='agregar-producto'></i>
                    </Link>
                </h1>
                <BuscadorComponent />
                {renderProductos()}

                {/* Pagination */}
                <nav aria-label="Paginación" className="d-flex justify-content-center">
                    <ul className="pagination">
                        <li className="page-item">
                            <button
                                className='page-link'
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                            >
                                &laquo; Anterior
                            </button>
                        </li>
                        <li className="page-item disable">
                            <span className='page-link'>
                                Página {currentPage} de {totalPages}
                            </span>
                        </li>
                        <li className="page-item">
                            <button
                                className='page-link'
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                            >
                                Siguiente &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default ProductosPage;
