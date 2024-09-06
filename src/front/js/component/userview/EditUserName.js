import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Form } from 'react-bootstrap';
import { Context } from '../../store/appContext';

export const UserNameEdit = ({ increaseProgress }) => {
    const { store, actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [newName, setNewName] = useState('');
    useEffect(() => {
        const fetchCompanyName = async () => {
            try {
                const response = await actions.getCompanyName();
                if (response) {
                    setCompanyName(response);
                    setNewName(response);
                }
            } catch (error) {
                console.error("Error al obtener el nombre de la empresa:", error);
            }
        };
        fetchCompanyName();
    }, [actions]);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleSave = async (e) => {
        e.preventDefault();
        if (!newName.trim()) {
            console.error("El nombre de la empresa no puede estar vacío.");
            return;
        }
        try {
            const response = await actions.updateCompanyName(newName);
            if (response) {
                setCompanyName(newName);
                increaseProgress(10);

            } else {
                console.error("Error al actualizar el nombre de la empresa");

            }
        } catch (error) {
            console.error("Error al guardar el nombre de la empresa:", error);
        }
        finally {
            handleClose();
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave(e);
        }
    };
    return (
        <>
            <div className="d-flex align-items-center" style={{ color: 'white' }}>
                <h1 className="mb-0">{store.user?.name}</h1>
                <button
                    type="button"
                    className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center ms-2"
                    style={{ width: 25, height: 25, backgroundColor: 'rgba(103, 147, 174, 1)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
                    onClick={handleShow}
                >
                    <FontAwesomeIcon icon={faEdit} style={{ width: '15px', height: '15px', }} />
                </button>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Nombre de Programador</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onKeyDown={handleKeyDown} onSubmit={handleSave}>
                        <Form.Group controlId="formUserName">
                            <Form.Control
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
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
