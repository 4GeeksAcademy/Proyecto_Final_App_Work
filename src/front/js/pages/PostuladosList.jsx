import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/PostuladosList.css'
import { Link } from "react-router-dom";

export const PostuladosList = () => {
    const { store, actions } = useContext(Context);
    const { oferta_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [postulados, setPostulados] = useState([]);


    useEffect(() => {
        const fetchPostulados = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.BACKEND_URL}/api/oferta/${oferta_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${store.token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setPostulados(data.oferta.postulados);

                } else {
                    setError(data.msg);
                }
            } catch (error) {
                setError('Error al obtener los postulados');
            } finally {
                setLoading(false);
            }
        };

        if (oferta_id) {
            fetchPostulados();
        }
    }, [oferta_id, store.token]);

    return (
        <div className="container mt-4">
            <div className="postulados-box-header text-center">
                <h2 className="postulados-header text-secondary fw-bold">
                    Es hora de <span className="color-title-postulado">contactar!</span>
                </h2>
                <p className="text-secondary p-header">
                    Cada vez más cerca de encontrar el candidato perfecto
                </p>
            </div>
            {loading && <p className="text-center">Cargando...</p>}
            {error && <p className="text-center">{error}</p>}
            <div className="row">
                {postulados.map((postulado) => (
                    <div className="col-lg-4 col-md-6 col-sm-12 my-3 d-flex justify-content-between" key={postulado.user_id}>
                        <div className="card card-box h-100 shadow-sm">
                            <div className="card-body card-body-body">
                                <h5 className="card-title text-center fw-bold fs-4">{postulado.username}</h5>
                                <p className="postulados-card-text">
                                    <strong>Email:</strong> {postulado.email}
                                </p>
                                <p className="postulados-card-text">
                                    <strong>Estado:</strong> {postulado.estado}
                                </p>
                                <p className="postulados-card-text">
                                    <strong>Datos de interés:</strong> {postulado.programador.id}
                                </p>
                                <ul className="data-list-postulado d-flex">
                                    <li className="data-postulado"></li>
                                    <li className="data-postulado"></li>
                                    <li className="data-postulado"></li>
                                </ul>
                                <Link to={`/Form_Contact_Postulados/${postulado.user_id}`}>
                                    <button className="boton-contactar">Contactar</button>
                                </Link>
                            </div>
                            <div className="card-footer">
                                <small className="text-muted text-center">Más detalles en el perfil</small>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
