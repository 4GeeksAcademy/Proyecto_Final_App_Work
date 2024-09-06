import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import { Context } from '../../store/appContext'; 

export const EditUserPrice = ({ userId, increaseProgress }) => {
    const { store, actions } = useContext(Context); // Usa el contexto
    const [showModal, setShowModal] = useState(false);

    // Recuperar el precio y la moneda desde localStorage o usar valores por defecto
    const [userPrice, setUserPrice] = useState(() => {
        const storedPrice = localStorage.getItem('userPrice');
        return storedPrice ? JSON.parse(storedPrice) : (store.user?.price || 50);
    });

    const [selectedCurrency, setSelectedCurrency] = useState(() => {
        const storedCurrency = localStorage.getItem('selectedCurrency');
        return storedCurrency ? JSON.parse(storedCurrency) : (store.user?.currency || 'EUR');
    });

    useEffect(() => {
        const fetchUserPrice = async () => {
            try {
                await actions.getUserPrice(userId);
                // Actualiza los estados locales después de cargar los datos
                setUserPrice(store.user?.price || 50);
                setSelectedCurrency(store.user?.currency || 'EUR');
            } catch (error) {
                console.error("Error al obtener el precio del usuario:", error);
            }
        };

        fetchUserPrice();
    }, [userId, actions, store.user?.price, store.user?.currency]);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await actions.updateUserPrice(userId, userPrice, selectedCurrency);
            if (response) {
                // Guardar los cambios en localStorage
                localStorage.setItem('userPrice', JSON.stringify(userPrice));
                localStorage.setItem('selectedCurrency', JSON.stringify(selectedCurrency));
                increaseProgress(10);
            }
        } catch (error) {
            console.error("Error al guardar el precio del usuario:", error);
        } finally {
            handleClose();
        }
    };

    return (
        <>
            <div className="d-flex align-items-center" style={{ color: 'Black', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                <button
                    type="button"
                    className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center ms-2"
                    style={{ width: 25, height: 25, backgroundColor: 'rgba(103, 147, 174, 1)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)', marginRight: '10px' }}
                    onClick={handleShow}
                >
                    <FontAwesomeIcon icon={faEdit} style={{ width: '15px', height: '15px' }} />
                </button>
                <div>
                    <p className="mb-0">Precio/Hora</p>
                    <p className="mb-0">{`${userPrice} ${selectedCurrency}`}</p>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Precio / Hora</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        <Form.Group controlId="formUserPrice">
                            <Form.Label>Selecciona el precio por hora</Form.Label>
                            <Form.Range
                                min="10"
                                max="500"
                                step="5"
                                value={userPrice}
                                onChange={(e) => setUserPrice(e.target.value)}
                            />
                            <Form.Text>{`Precio Seleccionado: ${userPrice} ${selectedCurrency}`}</Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formCurrencySelect" className="mt-4">
                            <Form.Label>Selecciona la moneda</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedCurrency}
                                onChange={(e) => setSelectedCurrency(e.target.value)}
                            >
                                <option value="EUR">EUR - Euro</option>
                                <option value="USD">USD - Dólar</option>
                                <option value="GBP">GBP - Libra esterlina</option>
                                <option value="JPY">JPY - Yen japonés</option>
                                <option value="CNY">CNY - Yuan chino</option>
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" variant="secondary" style={{ backgroundColor: 'rgba(103, 147, 174, 0.27)', color: 'rgba(103, 147, 174, 1)' }}>
                            Guardar
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: 'rgba(103, 147, 174, 1)' }}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
