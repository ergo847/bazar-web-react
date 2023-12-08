import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BuscadorComponent = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [page] = useState(1);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        // Redirige a la ruta de productos con el parámetro de búsqueda
        navigate(`/productos?search=${query}&page=${page}`);
    };

    return (
        <div className="input-group mb-3">
            <input
                type="text"
                id='search'
                className="form-control"
                placeholder="Buscar"
                aria-label="Buscar"
                aria-describedby="button-addon2"
                value={query}
                onChange={handleInputChange}
            />
            <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={handleSearch}
            >
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    );
};

export default BuscadorComponent;