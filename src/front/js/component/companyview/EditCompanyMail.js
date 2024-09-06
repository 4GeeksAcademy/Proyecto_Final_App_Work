import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Context } from '../../store/appContext';

export const EditCompanyMail = () => {
    const { store } = useContext(Context);
    const [newEmail] = useState(store.user?.email || 'Correo electronico');

    return (
        <>
            <div className="d-flex align-items-center" style={{
                color: 'black', fontFamily: 'Arial, sans-serif',
                fontWeight: 'bold', fontSize: '25px',
            }}>
                <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ color: '#6793AE', width: '25px', height: '25px', marginRight: '10px' }}
                />
                <p className="mb-0">{store.user?.email}</p>
            </div>
        </>
    );
}
