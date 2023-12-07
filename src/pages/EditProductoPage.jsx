import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'


const EditProductoPage = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const urlApi = 'https://bazar-api-laravel-production.up.railway.app/api/';

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`${urlApi}productos/${id}`);
                if (!response.ok) {
                    throw new Error('Error al obtener detalles del producto');
                }

                const data = await response.json();
                setProducto(data.data);
            } catch (error) {
                console.error('Error al obtener detalles del producto:', error);
            }
        };

        fetchProducto();
    }, [id]);

    const handleInputChange = (e) => {
        setProducto({
            ...producto,
            [e.target.name]: e.target.value,
        });
    };

    const handleImagesChange = (e) => {
        // Trata las imágenes como una lista de URLs separadas por saltos de línea
        const images = e.target.value.split('\n').filter((url) => url.trim() !== '');
        setProducto({
            ...producto,
            images,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto),
        };

        fetch(`${urlApi}productos/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert('Producto actualizado');
            })
            .catch((error) => {
                console.error('Error al actualizar el producto:', error);
                alert('Error al actualizar el producto');
            });
    };

    /* 
        {
            "title": "Crystal chandelier maria theresa for 12 light",
            "description": "Crystal chandelier maria theresa for 12 light",
            "price": 47,
            "discountPercentage": 16,
            "rating": 4.74,
            "stock": 130,
            "brand": "YIOSI",
            "category": "lighting",
            "thumbnail": "https://i.dummyjson.com/data/products/100/thumbnail.jpg",
            "images": [
                "https://i.dummyjson.com/data/products/100/1.jpg",
                "https://i.dummyjson.com/data/products/100/2.jpg",
                "https://i.dummyjson.com/data/products/100/3.jpg"
            ]
        }
    */

    return (
        <div>
            <h1>Editar {producto.name}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={producto?.title}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={producto?.description}
                        onChange={handleInputChange}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        value={producto?.price}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="discountPercentage" className="form-label">Descuento</label>
                    <input
                        type="number"
                        className="form-control"
                        id="discountPercentage"
                        name="discountPercentage"
                        value={producto?.discountPercentage}
                        onChange={handleInputChange}
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Rating</label>
                    <input
                        type="number"
                        className="form-control"
                        id="rating"
                        name="rating"
                        value={producto?.rating}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input
                        type="number"
                        className="form-control"
                        id="stock"
                        name="stock"
                        value={producto?.stock}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="brand" className="form-label">Marca</label>
                    <input
                        type="text"
                        className="form-control"
                        id="brand"
                        name="brand"
                        value={producto?.brand}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Categoría</label>
                    <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                        value={producto?.category}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
                    <input
                        type="text"
                        className="form-control"
                        id="thumbnail"
                        name="thumbnail"
                        value={producto?.thumbnail}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="images" className="form-label">Imágenes (una URL por línea)</label>
                    <textarea
                        className="form-control"
                        id="images"
                        name="images"
                        value={producto?.images ? producto.images.join('\n') : ''}
                        onChange={handleImagesChange}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">Guardar</button>

            </form>
        </div>
    );
};

export default EditProductoPage;
