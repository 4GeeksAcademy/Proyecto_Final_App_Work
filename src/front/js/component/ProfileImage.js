import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../store/appContext';

export const ProfileImage = ({ increaseProgress }) => {
    const { store, actions } = useContext(Context);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState(null);

    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                const response = await actions.getProfileImage(); 
                if (response) {
                    setProfileImageUrl(response);
                }
            } catch (error) {
                console.error("Error al obtener la imagen de perfil:", error);
            }
        };

        fetchProfileImage();
    }, [actions.getProfileImage]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            
            if (increaseProgress) {
                increaseProgress(10);
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!image) return;

        try {
            const response = await actions.uploadProfileImage(image);  
            if (response) {
                setProfileImageUrl(response);  
                if (increaseProgress) {
                    increaseProgress(10);  
                }
            } else {
                console.error("Error al subir la imagen de perfil.");
            }
        } catch (error) {
            console.error("Error al subir la imagen de perfil:", error);
        } finally {
            setShowModal(false);  
        }
    };

    return (
        <div className="text-center">
            <div className="d-flex flex-column align-items-center mb-3">
                
                <img src="{{ user.photo }}" alt="Profile Image" className="rounded"
                    width="200"
                    height="200"/>

                <Button
                    className="btn btn-outline-light rounded-circle d-flex align-items-center justify-content-center mt-2"
                    style={{ width: 30, height: 30, backgroundColor: 'rgba(103, 147, 174, 1)', boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)' }}
                    onClick={() => setShowModal(true)}
                >
                    <FontAwesomeIcon icon={faEdit} />
                </Button>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Seleccionar Imagen de Perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formFile">
                            <Form.Control 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageChange} 
                            />
                        </Form.Group>
                        {preview && (
                            <div className="mt-3 text-center">
                                <h5>Vista previa:</h5>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="rounded-circle"
                                    width="150"
                                    height="150"
                                />
                            </div>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)} style={{ backgroundColor: 'rgba(103, 147, 174, 1)' }}>
                        Cancelar
                    </Button>
                    <Button variant="secondary" onClick={handleSave} style={{ backgroundColor: 'rgba(103, 147, 174, 0.27)', color: 'rgba(103, 147, 174, 1)' }}>
                        Guardar Cambios
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
