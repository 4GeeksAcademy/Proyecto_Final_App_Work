import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";



export const Inicio = () => {
    const { store } = useContext(Context);

    

    return (

        <div className="inicio-container container mt-5 text-muted">
            <div className="row align-items-center">
                <div className="col-lg-6 text-center text-lg-start">
                    <h1 className="display-4 fw-bold">
                        Bienvenido a <span className="titulo" style={{ color: '#6793AE', padding: '0 10px', borderRadius: '5px' }}>Loopy: <span className="small">Freelance Code Connect</span></span>
                    </h1>
                    <p className="lead text-secondary mt-3">
                        ¿Eres un programador en busca de proyectos desafiantes? ¿O una empresa que necesita talento tecnológico para llevar sus ideas al siguiente nivel? ¡Estás en el lugar indicado!
                    </p>
                    {store.suscripcion?.payment && (
                        <div class="alert alert-success my-2" role="alert">
                            {store.suscripcion?.payment}
                        </div>
                    )}
                    {!store.user && (
                        <div className="mt-4">
                            <Link to={"/register"}>
                                <button type="button" className="btn btn-primary btn-lg me-5 mb-2 shadow-lg" style={{ backgroundColor: "#6793AE", borderColor: "#6793AE" }}>
                                    Inscribirse a Ofertas
                                </button>
                                <button type="button" className="btn btn-primary btn-lg mb-2 shadow-lg" style={{ backgroundColor: "#ffffff", color: "#6793AE", borderColor: "#6793AE" }}>
                                    Contratar Freelancers
                                </button>
                            </Link>
                        </div>
                    )}
                    

                </div>
                <div className="col-lg-6 text-center mt-4 mt-lg-0">
                    <img
                        src="https://www.shutterstock.com/image-vector/backend-development-coding-software-engineering-600nw-2378388687.jpg"
                        alt="Desarrollo de Software"
                        className="img-fluid rounded shadow-lg"
                        style={{ border: "2px solid #6793AE" }}
                    />
                </div>
            </div>

            {/* Features Section */}
            <div className="row mt-5 text-center text-lg-start">
                <div className="col-md-6 mb-4" style={{ borderRadius: "10px", padding: "40px 30px", border: "2px solid #6793AE", marginBottom: "30px", marginRight: "25px", marginLeft: "-15px" }}>
                    <div className="feature-box">
                        <h3 className="text-secondary">Para Programadores</h3>
                        <ul className="list-unstyled mt-3 text-secondary">
                            <li className="mb-2"><strong>Proyectos a tu medida:</strong> Encuentra proyectos que se alineen con tu experiencia y preferencias.</li>
                            <li className="mb-2"><strong>Flexibilidad total:</strong> Trabaja desde cualquier lugar, a tu ritmo y con las condiciones que elijas.</li>
                            <li className="mb-2"><strong>Pago seguro y garantizado:</strong> Recibe pagos de manera segura por tu trabajo, sin complicaciones.</li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-6 mb-4" style={{ backgroundColor: '#6793AE', borderRadius: "10px", padding: "40px 30px", marginBottom: "30px", marginRight: "-15px" }}>
                    <div className="feature-box">
                        <h3 className="text-white">Para Empresas</h3>
                        <ul className="list-unstyled mt-3 text-white">
                            <li className="mb-2"><strong>Acceso a talento especializado:</strong> Miles de programadores con experiencia en diferentes tecnologías.</li>
                            <li className="mb-2"><strong>Proceso de contratación simplificado:</strong> Filtra candidatos, revisa portfolios y selecciona el mejor talento con solo unos clics.</li>
                            <li className="mb-2"><strong>Garantía de calidad:</strong> Contrata con confianza, sabiendo que trabajas con profesionales validados.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};