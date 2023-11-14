import { useState } from 'react'

const InicioPage = () => {
    const [busqueda, setBusqueda] = useState(false)
    return (
        <>
            <h1><i className="fa-solid fa-shop"></i></h1>
            <h1>Bazar Online</h1>
            <div className="input-group m-3">
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
        </>
    )
}

export default InicioPage