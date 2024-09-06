import React, { useState, useContext, useEffect } from "react";
import "../../styles/CardOffer.css";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import { ModalJobApply } from "./ModalJobApply.jsx";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export const CardOffer = ({ id }) => {
    const navigate = useNavigate();
    const { actions, store } = useContext(Context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [numeroInscritos, setNumeroInscritos] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false); // Nuevo estado

    const offer = store.jobOffers.find((offer) => offer.id === id);
    if (!offer) return <div>Oferta no encontrada</div>;

    // Función que determina si la oferta es favorita
    const checkIfFavorite = () => {
        return store.favorites?.some((fav) => fav.id === id);
    }

    useEffect(() => {
        if (store.user && store.user.profile_programador) {
            const subscribed = store.user.inscribedOffers?.includes(id);
            setIsSubscribed(subscribed);
        }

        actions.getNumeroPostulados(id).then((count) => {
            if (count !== null) {
                setNumeroInscritos(count);
            }
        });

        // Verifica si la oferta ya es favorita al cargar el componente
        setIsFavorite(checkIfFavorite());

    }, [store.user, id, actions, store.favorites]);

    const handleViewDetails = () => {
        navigate(`/singleoffer/${id}`);
    };

    const handleViewCompany = () => {
        navigate(`/Companyview/${id}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long' };
        return date.toLocaleDateString('es-ES', options);
    };

    const handleApplyClick = async () => {
        if (!store.user || !store.user.profile_programador) {
            setModalMessage("Solo los programadores pueden inscribirse en esta oferta.");
            setModalType("warning");
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

    const handleFavoriteClick = async () => {
        if (!store.user) {
            setModalMessage("Debes estar registrado para agregar a favoritos.");
            setModalType("warning");
            setIsModalOpen(true);
            return;
        }
        const programador_id = store.user.profile_programador?.id || null;
        const empleador_id = store.user.profile_empleador?.id || null;
        const oferta_id = id;

        try {
            if (isFavorite) {
                const result = await actions.removeFavorite(programador_id, empleador_id, oferta_id);
                if (result) {
                    setIsFavorite(false);
                } else {
                    throw new Error("No se pudo eliminar de favoritos. Intenta nuevamente.");
                }
            } else {
                const result = await actions.addFavorite(programador_id, empleador_id, oferta_id);
                if (result) {
                    setIsFavorite(true);
                } else {
                    throw new Error("No se pudo agregar a favoritos. Intenta nuevamente.");
                }
            }
        } catch (error) {
            setModalMessage(error.message);
            setModalType("error");
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="card-offer mt-2">
                <div className="card-offer-logo-container col-12 col-md-4 col-lg-3">
                    <img
                        className="card-offer-logo img-fluid"
                        src="https://img.freepik.com/vector-premium/concepto-pequena-empresa-fachada-cafeteria-tiendas-ventas_654623-1161.jpg"
                        alt="Company Logo"
                    />
                    <span className="num-postulados m-2">
                        {numeroInscritos} Se han inscrito
                    </span>
                </div>
                <div className="card-offer-content ms-3 col-12 col-md-8 col-lg-9">
                    <div className="title-heart d-flex align-items-center justify-content-between mb-2">
                        <h2 className="card-offer-title">
                            {offer.name}
                        </h2>
                        <div
                            onClick={handleFavoriteClick}
                            className="heart-icon"
                            style={{ cursor: "pointer" }}
                        >
                            {isFavorite ? <FaHeart /> : <FaRegHeart />}
                        </div>
                    </div>
                    <span
                        className="card-offer-company mt-2"
                        onClick={handleViewCompany}
                    >
                        {offer.nombre_empresa} - {offer.localidad}
                    </span>
                    <div className="card-offer-description mt-2">
                        <p className="text-description">{offer.descripcion}</p>
                    </div>
                    <div className="data-footer d-flex mt-1">
                        <ul className="card-offer-details list-unstyled d-flex">
                            <li className="list-footer-details me-3">
                                Publicada el {formatDate(offer.fecha_publicacion)}
                            </li>
                            <li className="list-footer-details me-3">
                                {offer.modalidad}
                            </li>
                            <li className="list-footer-details me-3">
                                {offer.salario}
                            </li>
                            <li className="list-footer-details">
                                {offer.experiencia_minima}
                            </li>
                        </ul>
                        <div className="card-offer-actions mt-2">
                            <button
                                onClick={handleViewDetails}
                                className="btn btn-details btn-sm me-3"
                            >
                                Ver detalles
                            </button>
                            {!store.user ||
                                (store.user && store.user.profile_programador && (
                                    <button
                                        className={`btn ${
                                            isSubscribed
                                                ? "btn-desinscribirse"
                                                : "btn-inscribirse"
                                        } btn-sm`}
                                        onClick={handleApplyClick}
                                    >
                                        {isSubscribed ? "Desinscribirse" : "Inscribirse"}
                                    </button>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <ModalJobApply
                    message={modalMessage}
                    type={modalType}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};