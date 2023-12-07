import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'


const EditProductoPage = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState({
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
        thumbnail: '',
        images: [],
    });    
    const urlApi = 'https://bazar-api-laravel-production.up.railway.app/api/';

    useEffect(() => {
        // Check if an ID is present to determine if it's an update or a create operation
        if (id) {
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
                }
            };
    
            fetchProducto();
        } else {
            // If no ID is present, it's a new product, so initialize an empty state
            setProducto({
                title: '',
                description: '',
                price: 0,
                discountPercentage: 0,
                rating: 0,
                stock: 0,
                brand: '',
                category: '',
                thumbnail: '',
                images: ['', '', ''], // Initialize with empty strings for three images
            });
        }
    }, [id]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };
    
    const handleInputImgChange = (e) => {
        /* junta el texto de los 3 inputs de imagen en un array y agregalo al producto */
        const { name, value } = e.target;
        const images = [producto.images[0], producto.images[1], producto.images[2]];
        images[name] = value;
        console.log(images[name], images);
        setProducto({ ...producto, images });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(producto);
        const requestOptions = {
            method: 'POST', // Change the method to POST for creating a new product
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto),
        };
        try {
            const response = await fetch(`https://bazar-api-laravel-production.up.railway.app/api/productos`, requestOptions);
            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }
            const data = await response.json();
            console.log(data);
            alert('Producto creado');
        } catch (error) {
            console.error('Error al crear el producto:', error);
            alert('Error al crear el producto');
        }
    };
    

    /* 
        request:
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

        response:
        {
            "success": true,
            "message": "Producto encontrado",
            "data": {
                "id": 151,
                "title": "Crystal chandelier maria theresa for 12 light",
                "description": "Crystal chandelier maria theresa for 12 light",
                "brand": "YIOSI",
                "category": "lighting",
                "thumbnail": "https://i.dummyjson.com/data/products/100/thumbnail.jpg",
                "price": "47.00",
                "discountPercentage": "16.00",
                "rating": "4.74",
                "stock": 130,
                "created_at": "2023-12-07T18:19:54.000000Z",
                "updated_at": "2023-12-07T18:26:16.000000Z",
                "images": [
                    {
                        "id": 669,
                        "producto_id": 151,
                        "url": "https://i.dummyjson.com/data/products/100/1.jpg",
                        "created_at": "2023-12-07T18:26:16.000000Z",
                        "updated_at": "2023-12-07T18:26:16.000000Z"
                    },
                    {
                        "id": 670,
                        "producto_id": 151,
                        "url": "https://i.dummyjson.com/data/products/100/2.jpg",
                        "created_at": "2023-12-07T18:26:16.000000Z",
                        "updated_at": "2023-12-07T18:26:16.000000Z"
                    },
                    {
                        "id": 671,
                        "producto_id": 151,
                        "url": "https://i.dummyjson.com/data/products/100/3.jpg",
                        "created_at": "2023-12-07T18:26:16.000000Z",
                        "updated_at": "2023-12-07T18:26:16.000000Z"
                    }
                ]
            }
        }
    */

    return (
        <div>
            <h1 className='mt-5'>
                <i className="fa-solid fa-shop"></i>
            </h1>
            <h1>
                <Link to="/productos" className="btn btn-outline-secondary me-2">
                    <i className="fa-solid fa-arrow-left"></i>
                </Link>
                Editar producto
            </h1>
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
                    <label htmlFor="images" className="form-label">
                        Imágenes
                    </label>
                    <input
                        className="form-control"
                        id="images1"
                        name={0}
                        /* value del primer valor del producto.images */
                        value={producto?.images[0]}
                        onChange={handleInputImgChange}
                    ></input>
                    <input
                        className="form-control"
                        id="images2"
                        name={1}
                        /* value del segundo valor del producto.images */
                        value={producto?.images[1]}
                        onChange={handleInputImgChange}
                    ></input>
                    <input
                        className="form-control"
                        id="images3"
                        name={2}
                        /* value del tercer valor del producto.images */
                        value={producto?.images[2]}
                        onChange={handleInputImgChange}
                    ></input>
                </div>

                <button type="submit" className="btn btn-primary">Guardar</button>

            </form>
        </div>
    );
};

export default EditProductoPage;
