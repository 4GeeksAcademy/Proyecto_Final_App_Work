import React, { useState, useEffect } from "react";
import "../../styles/FilterListOffer.css";

export const FilterListOffer = ({ filters, handleFiltersChange }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    // Este useEffect se ejecuta cuando localFilters cambia, para notificar al componente padre
    useEffect(() => {
        handleFiltersChange(localFilters);
    }, [localFilters, handleFiltersChange]);

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        setLocalFilters((prevFilters) => {
            const newExperience = checked
                ? [...prevFilters.experience, value]
                : prevFilters.experience.filter((item) => item !== value);

            return {
                ...prevFilters,
                experience: newExperience
            };
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setLocalFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const handleSalaryChange = (event) => {
        const [min, max] = event.target.value.split(',').map(Number);
        setLocalFilters((prevFilters) => ({
            ...prevFilters,
            salario: [min, max]
        }));
    };


    return (
        <div className="FilterListOffer-box p-3 ms-5 shadow-lg">
            <h2 className="text-start fw-bold text-muted fs-4">Filtrar Ofertas</h2>
            <div>
                <h3>Buscar</h3>
                <label htmlFor="searchText">Buscar por título o descripción:</label>
                <input
                    className="form-control"
                    id="searchText"
                    type="text"
                    name="searchText"
                    placeholder="Buscar por título o descripción"
                    value={filters.searchText}
                    onChange={handleInputChange}
                />
            </div>
            <div>
                <h3>Plazo</h3>
                <label htmlFor="plazo">Seleccione un plazo:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="YYYY-M-D"
                    name="plazo"
                    id="plazo"
                    onChange={handleInputChange}
                    value={filters.plazo}
                />
            </div>

            <div>
                <h3>Rango de Salario</h3>
                <label htmlFor="salaryMin">Salario Mínimo:</label>
                <input
                    id="salaryMin"
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={filters.salario[0]}
                    onChange={(e) => handleSalaryChange({ target: { value: `${e.target.value},${filters.salario[1]}` } })}
                />
                <label htmlFor="salaryMax">Salario Máximo:</label>
                <input
                    id="salaryMax"
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={filters.salario[1]}
                    onChange={(e) => handleSalaryChange({ target: { value: `${filters.salario[0]},${e.target.value}` } })}
                />
                <p>
                    Salario: ${filters.salario[0]} - ${filters.salario[1]}
                </p>
            </div>

            <div className="d-flex flex-column">
                <h3>Experiencia</h3>
                <label>
                    <input
                        type="checkbox"
                        name="experience"
                        value="Junior"
                        checked={filters.experience.includes("Junior")}
                        onChange={handleCheckboxChange}
                    />
                    Junior
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="experience"
                        value="Mid-senior"
                        checked={filters.experience.includes("Mid-senior")}
                        onChange={handleCheckboxChange}
                    />
                    Mid-senior
                </label>
                <label htmlFor="experience">
                    <input
                        type="checkbox"
                        name="experience"
                        value="Senior"
                        checked={filters.experience.includes("Senior")}
                        onChange={handleCheckboxChange}
                    />
                    Senior
                </label>
            </div>

            <div>
                <h3>Fecha de publicación</h3>
                <label htmlFor="fecha_publicacion">Seleccione fecha:</label>
                <input
                    className="form-control"
                    id="fecha_publicacion"
                    type="text"
                    name="fecha_publicacion"
                    placeholder="YYYY-MM-DD"
                    value={filters.fecha_publicacion}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};
