// ProductoPage.jsx
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import EstrellasRatingComponent from '../components/EstrellasRatingComponent';

const ProductoPage = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`https://bazar-api-laravel-production.up.railway.app/api/productos/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener detalles del producto');
                }

                const data = await response.json();
                setProducto(data.data);
            } catch (error) {
                console.error('Error al obtener detalles del producto:', error);
                // Puedes manejar el error según tus necesidades
            }
        };

        fetchProducto();
    }, [id]);

    /* funcion para boton de borrar */
    const handleDelete = async () => {
        try {
            const response = await fetch(`https://bazar-api-laravel-production.up.railway.app/api/productos/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al borrar producto');
            }

            // Redirige a la ruta de productos
            window.location.href = '/productos';
        } catch (error) {
            console.error('Error al borrar producto:', error);
            // Puedes manejar el error según tus necesidades
        }
    }

    return (
        <div className="container mt-5">
            {producto ? (
                <div>
                    <h1>
                        <i className="fa-solid fa-shop"></i>
                    </h1>
                    <h2>
                        <Link to="/productos" className="btn btn-outline-secondary me-2">
                            <i className="fa-solid fa-arrow-left"></i>
                        </Link>
                        {producto.title}
                        <Link to={`/producto/${producto.id}/edit`} className="btn btn-outline-secondary ms-2" id='producto-editar'>
                            <i className="fa-solid fa-edit"></i>
                        </Link>
                        <button className="btn btn-outline-danger ms-2 eliminar-producto" onClick={handleDelete}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </h2>
                    {producto.images.length > 0 ? (
                        <div id="carouselExampleControls" className="carousel slide mb-4" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {producto.images.map((image, index) => (
                                    <div key={index} className={`carousel-item${index === 0 ? ' active' : ''}`}>
                                        <img
                                            src={image}
                                            className="d-block w-100 img-fluid"
                                            style={{ maxHeight: '400px', objectFit: 'contain', margin: 'auto' }}
                                            alt={`Imagen ${index}`}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    ) : (
                        <p className="mb-4">No hay imágenes disponibles.</p>
                    )}
                    <EstrellasRatingComponent rating={parseFloat(producto.rating)} />
                    <p><span className="fw-bold">Descripción: </span>{producto.description}</p>
                    <p><span className="fw-bold">Marca: </span>{producto.brand}</p>
                    <p><span className="fw-bold">Categoría: </span>{producto.category}</p>
                    <p><span className="fw-bold">Precio: </span>${producto.price}</p>
                    <p className='text-danger'><span className="fw-bold">Descuento: </span>{producto.discountPercentage}%</p>
                    <p><span className="fw-bold">Stock: </span>{producto.stock}</p>
                    <button className="btn btn-primary">Comprar</button>
                </div>
            ) : (
                <p>Cargando detalles del producto...</p>
            )}
        </div>

    );
};

export default ProductoPage;
