// SingleOffer.jsx
import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { ModalJobApply } from "../component/ModalJobApply.jsx";
import { StarsRating } from "../component/StarsRating.jsx";
import "../../styles/SingleOffer.css";

export const SingleOffer = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [numeroInscritos, setNumeroInscritos] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('');
    const [showLoginButton, setShowLoginButton] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const offer = store.jobOffers.find((offer) => offer.id === parseInt(id));
    const isProgramador = store.user && store.user.profile_programador;

    useEffect(() => {
        if (offer) {
            actions.getNumeroPostulados(id).then((count) => {
                if (count !== null) {
                    setNumeroInscritos(count);
                }
            });
        }

        if (store.user && store.user.profile_programador) {
            const subscribed = store.user.inscribedOffers?.includes(parseInt(id));
            setIsSubscribed(subscribed);
        }
    }, [id, offer, actions, store.user]);

    const handleApplyClick = async () => {
        if (!store.user || !store.user.profile_programador) {
            setModalMessage("Solo los programadores pueden inscribirse en esta oferta.");
            setModalType("warning");
            setShowLoginButton(!store.user);
            setIsModalOpen(true);
            return;
        }

        try {
            let result;
            if (isSubscribed) {
                result = await actions.unapplyFromJobOffer(id);
                if (result?.msg) {
                    setModalMessage(result.msg);
                    setModalType(result.type === "success" ? "success" : "error");
                    setIsSubscribed(false);
                    setNumeroInscritos((prev) => prev - 1);
                } else {
                    throw new Error("Error al desinscribirse, intente nuevamente.");
                }
            } else {
                result = await actions.applyToJobOffer(id);
                if (result?.msg) {
                    setModalMessage(result.msg);
                    setModalType(result.type === "success" ? "success" : "error");
                    setIsSubscribed(true);
                    setNumeroInscritos((prev) => prev + 1);
                } else {
                    throw new Error("Error al inscribirse, intente nuevamente.");
                }
            }
        } catch (error) {
            setModalMessage(error.message);
            setModalType("error");
        } finally {
            setIsModalOpen(true);
        }
    };

    const handleViewCompany = () => {
        navigate(`/Companyview/${id}`);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setShowLoginButton(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: "numeric", month: "short" };
        return date.toLocaleDateString("es-ES", options);
    };

    if (!offer) {
        return <div className="container my-5">Oferta no encontrada</div>;
    }

    return (
        <>
            <div className="container my-4 p-0">
                <div className="card single-offer-box shadow-sm p-3 shadow-lg">
                    <div className="row">
                        <div className="col-3">
                            <img
                                src="https://img.freepik.com/vector-premium/concepto-pequena-empresa-fachada-cafeteria-tiendas-ventas_654623-1161.jpg"
                                alt="Company Logo"
                                className="img-fluid rounded-circle"
                            />
                            <div className="text-muted mt-2">
                                <span className="num-postulados">{numeroInscritos}</span> Inscritos
                            </div>
                        </div>
                        <div className="col-9">
                            <h2 className="offer-title">{offer.name}</h2>
                            <p className="company-info" onClick={handleViewCompany}>
                                {offer.nombre_empresa} - {offer.localidad}
                            </p>
                            <p className="date-posted">Publicado el {formatDate(offer.fecha_publicacion)}</p>
                            <StarsRating className="offer-rating" />
                            {isProgramador && (
                                <button className="btn btn-apply mt-2" onClick={handleApplyClick}>
                                    {isSubscribed ? "Desinscribirse" : "Inscribirse"}
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <ul className="offer-details">
                                <li>{offer.idiomas}</li>
                                <li>{offer.salario}</li>
                                <li>{offer.estudios_minimos}</li>
                                <li>{offer.modalidad}</li>
                                <li>{offer.tipo_contrato}</li>
                                <li>{offer.localidad}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <hr />
                            <h3>Requisitos Mínimos</h3>
                            <p className="requisitos-minimos">{offer.requisitos_minimos}</p>
                            <hr />
                            <h3>Descripción</h3>
                            <p className="offer-description">{offer.descripcion}</p>
                            {isProgramador && (
                                <div className="text-end mt-3">
                                    <button className="btn btn-apply btn-lg" onClick={handleApplyClick}>
                                        {isSubscribed ? "Desinscribirse" : "Inscribirse"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <ModalJobApply
                    message={modalMessage}
                    type={modalType}
                    onClose={handleCloseModal}
                    showLoginButton={showLoginButton}
                />
            )}
        </>
    );
};
