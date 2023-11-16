import BuscadorComponent from "../components/BuscadorComponent";

const InicioPage = () => {
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h1>
                        <i className="fa-solid fa-shop"></i>
                    </h1>
                    <h1>Bazar Online</h1>
                    <BuscadorComponent />
                </div>
            </div>
        </>
    );
};

export default InicioPage;
