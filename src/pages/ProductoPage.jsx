// ProductoPage.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EstrellasRatingComponent from '../components/EstrellasRatingComponent';

const ProductoPage = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`http://apiexamen.test/api/productos/${id}`);
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

    return (
        <div>
            {producto ? (
                <>
                    <h1 className='mt-5'>
                        <i className="fa-solid fa-shop"></i>
                    </h1>
                    <h1>{producto.title}</h1>
                    {producto.images.length > 0 ? (
                        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {producto.images.map((image, index) => (
                                    <div key={image.id} className={`carousel-item${index === 0 ? ' active' : ''}`}>
                                        <img src={image.url} className="d-block w-100" alt={`Imagen ${image.id}`} />
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
                        <p>No hay imágenes disponibles.</p>
                    )}
                    <EstrellasRatingComponent rating={parseFloat(producto.rating)} />
                    <p><span className="fw-bold">Descripción: </span>{producto.description}</p>
                    <p><span className="fw-bold">Marca: </span>{producto.brand}</p>
                    <p><span className="fw-bold">Categoría: </span>{producto.category}</p>
                    <p><span className="fw-bold">Precio: </span>${producto.price}</p>
                    <p className='text-danger'><span className="fw-bold">Descuento: </span>{producto.discountPercentage}%</p>
                    <p><span className="fw-bold">Rating: </span>{producto.rating}</p>
                    <p><span className="fw-bold">Stock: </span>{producto.stock}</p>

                </>
            ) : (
                <p>Cargando detalles del producto...</p>
            )}
        </div>
    );
};

export default ProductoPage;
