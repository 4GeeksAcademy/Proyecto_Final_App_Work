import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import { Context } from '../../store/appContext';

export const EditCompanyPhone = ({ increaseProgress }) => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false); 
    const [newPhone, setNewPhone] = useState(''); 
    
    useEffect(() => {
        const fetchCompanyPhone = async () => {
            try {
                const response = await actions.getCompanyPhone();
                if (response) {
                    setNewPhone(response);
                }
            } catch (error) {
                console.error("Error al obtener el telefono de la empresa:", error);
            }
        };
        fetchCompanyPhone();
    }, [actions.getCompanyPhone]); // Solo depende de getCompanyPhone
    
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    
    const handleSave = async (e) => {
        e.preventDefault();
        if (!newPhone.trim()) {
            console.error("El telefono de la empresa no puede estar vacío.");
            return;
        }
        try {
            const response = await actions.updateCompanyPhone(newPhone);
            if (response) {
                increaseProgress(10);
            } else {
                console.error("Error al actualizar el telefono de la empresa");
            }
        } catch (error) {
            console.error("Error al guardar el telefono de la empresa:", error);
        } finally {
            handleClose();
        }
    };
    
    return (
        <>
            <div className="d-flex align-items-center" style={{
                color: 'Black', fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold', fontSize: '25px',
            }}>
                <p className="mb-0">
                    <FontAwesomeIcon
                        icon={faPhone}
                        style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}
                    />
                    {store.user?.phone}
                </p>

                <button
                    type="button"
                    className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center ms-2"
                    style={{ width: 25, height: 25, backgroundColor: 'rgba(103, 147, 174, 1)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
                    onClick={handleShow}
                >
                    <FontAwesomeIcon icon={faEdit} style={{ width: '15px', height: '15px' }} />
                </button>
            </div>
            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar el Teléfono de la Empresa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSave}>
                        <Form.Group controlId="formPhone">
                            <Form.Control
                                type="text"
                                className="form-control"
                                value={newPhone}
                                onChange={(e) => setNewPhone(e.target.value)}
                                placeholder="Número de teléfono"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: 'rgba(103, 147, 174, 1)' }}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="secondary" onClick={handleSave} style={{ backgroundColor: 'rgba(103, 147, 174, 0.27)', color: 'rgba(103, 147, 174, 1)' }}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
