import React, { useState, useEffect, useContext } from 'react';
import OfferCard from './OfferCard';
import { Button, Modal, Form } from 'react-bootstrap';
import { ListOffers } from '../CardListOffers.jsx';
import { Context } from '../../store/appContext.js';

const OfferManager = ({ empleador_id }) => {
    const { store, actions } = useContext(Context);
    const [offers, setOffers] = useState([]);
    const [offerCount, setOfferCount] = useState(0);
    const [selectedOfferIndex, setSelectedOfferIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [numeroInscritos, setNumeroInscritos] = useState(0);
    const [modalData, setModalData] = useState({
        title: '',
        description: '',
        status: 'Activo',
        price: 100,
    });



    useEffect((id) => {
        if (store.jobOffers.length > 0) {
            const employerOffers = store.jobOffers.filter(offer => offer.empleador_id === store.user?.id);
            console.log('ofertas del usuario: ', employerOffers)
            setOffers(employerOffers);
        }
        if (store.user && store.user.profile_programador) {
            const subscribed = store.user.inscribedOffers?.includes(id);
            setIsSubscribed(subscribed);
        }
        // actions.getNumeroPostulados(id).then((count) => {
        //     if (count !== null) {
        //         setNumeroInscritos(count);
        //     }
        // });
        
    }, [store.jobOffers, empleador_id]);

    const createNewOffer = () => {
        const newOffer = {
            id: generateOfferId(),
            title: `Oferta ${offerCount + 1}`,
            description: `Descripción de la oferta ${offerCount + 1}`,
            status: 'Activo',
            price: 100,
        };
        setOffers([...offers, newOffer]);
        setOfferCount(offerCount + 1);

       
        navigate(`/formoffer`);
    };

    return (
        <div className="container">
            <div className="text-center mb-4">
                <Button variant="btn btn-secondary" onClick={createNewOffer}>
                    Crear nueva oferta
                </Button>
                <div className="fs-1 text-secondary fw-bold">
                    Tienes {numeroInscritos} candidatos a tus ofertas:
                </div>
            </div>
            
            <div className="d-flex flex-wrap justify-content-center">
                {offers.map((offer) => (
                    <OfferCard
                        key={index}
                        title={offer.name}
                        description={offer.descripcion}
                        status={offer.status}
                        price={offer.salario}
                        oferta_id={offer.id}
                        onEdit={() => handleOpenModal(index)}
                    />
                ))}
            </div>

            {/* Modal para crear y editar ofertas */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedOfferIndex !== null ? 'Editar Oferta' : 'Nueva Oferta'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={modalData.title}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={modalData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="range"
                                name="price"
                                min="50"
                                max="500"
                                value={modalData.price}
                                onChange={handleChange}
                            />
                            <Form.Text>€ {modalData.price}</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Estado</Form.Label>
                            <Form.Control
                                as="select"
                                name="status"
                                value={modalData.status}
                                onChange={handleChange}
                            >
                                <option value="Activo">Activo</option>
                                <option value="Cerrado">Cerrado</option>
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSaveOffer}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default OfferManager;


