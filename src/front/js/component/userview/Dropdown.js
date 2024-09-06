import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import countries from 'world-countries';

const formatOptionLabel = ({ value, label, flag }) => (
    <div className="d-flex align-items-center">
        <img src={flag} alt={label} style={{ width: '20px', marginRight: '10px' }} />
        <span>{label} ({value})</span>
    </div>
);



const CountrySelector = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({
        value: 'ES',
        label: 'Spain',
        flag: 'https://flagcdn.com/w20/es.png'
    });
    
    const countryOptions = countries.map((country) => ({
        value: country.cca2,
        label: country.name.common,
        flag: `https://flagcdn.com/w20/${country.cca2.toLowerCase()}.png`
    }));

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                // Recuperar el país del almacenamiento local
                const storedCountry = localStorage.getItem('selectedCountry');
                let initialCountry;
    
                if (storedCountry) {
                    initialCountry = JSON.parse(storedCountry);
                } else {
                    // Recuperar el país desde la API si no está en el almacenamiento local
                    const response = await fetch(`${process.env.BACKEND_URL}/api/get-country`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        const countryCode = data.country?.value;
                        initialCountry = countryCode ? {
                            value: countryCode,
                            label: countries.find(c => c.cca2 === countryCode)?.name || 'Unknown',
                            flag: `https://flagcdn.com/w20/${countryCode.toLowerCase()}.png`
                        } : {
                            value: 'ES',
                            label: 'Spain',
                            flag: 'https://flagcdn.com/w20/es.png'
                        };
                    } else {
                        console.error("Error al recuperar el país desde la API");
                        initialCountry = {
                            value: 'ES',
                            label: 'Spain',
                            flag: 'https://flagcdn.com/w20/es.png'
                        };
                    }
                }
    
                setSelectedCountry(initialCountry);
            } catch (error) {
                console.error("Error en la solicitud de recuperación del país:", error);
                setSelectedCountry({
                    value: 'ES',
                    label: 'Spain',
                    flag: 'https://flagcdn.com/w20/es.png'
                });
            }
        };
    
        fetchCountry();
    }, []);
    
    const handleCountryChange = async (selectedOption) => {
        console.log("Opción seleccionada:", selectedOption);
        setSelectedCountry(selectedOption);
        localStorage.setItem('selectedCountry', JSON.stringify(selectedOption));
    
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/update-country`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ country: selectedOption.value })
            });
    
            const responseData = await response.json();
            console.log("Respuesta del backend:", responseData);
    
            if (response.ok) {
                console.log("País actualizado correctamente");
            } else {
                console.error("Error al actualizar el país");
            }
        } catch (error) {
            console.error("Error en la solicitud de actualización del país:", error);
        }
    };
    
    return (
        <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="ms-3" style={{ color: '#6793AE', width: '30px', height: '30px' }} />
            {!dropdownOpen && (
                <button 
                    className="btn btn-link d-flex align-items-center p-0" 
                    onClick={() => setDropdownOpen(true)}
                    style={{ color: 'black', textDecoration: 'none' }} 
                >
                    <img 
                        src={selectedCountry.flag} 
                        alt={selectedCountry.label} 
                        style={{ width: '30px', marginRight: '20px' }} 
                    />
                    <span className="ms-2" style={{ color: 'black' }}>{selectedCountry.label}</span>
                    <FontAwesomeIcon icon={faCaretDown} className="ms-2" />
                </button>
            )}
    
            {dropdownOpen && (
                <Select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    options={countryOptions}
                    formatOptionLabel={formatOptionLabel}
                    className="country-select"
                    styles={customSelectStyles}  
                    autoFocus  
                />
            )}
        </div>
    );
};

    


const customSelectStyles = {
    control: (provided) => ({
        ...provided,
        minWidth: '150px',
        borderColor: '#007bff',
    }),
    menu: (provided) => ({
        ...provided,
        zIndex: 9999,  
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'black', 
    }),
    option: (provided) => ({
        ...provided,
        color: 'black', 
    }),
};

export default CountrySelector;
