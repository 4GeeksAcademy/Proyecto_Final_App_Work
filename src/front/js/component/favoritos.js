import React, { useContext, useEffect, useState } from 'react'; // Importar useState
import { Context } from "../store/appContext";
import { CardOffer } from "./CardOffer.jsx";
import "../../styles/favoritos.css";

export const Favoritos = () => {
    const { store, actions } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTerm, setFilterTerm] = useState("");
    const [filters, setFilters] = useState({ 
        
        searchText: "",

    });

    useEffect(() => {
        actions.getFavorites(); 
    }, []);

    if (!store.favorites || store.favorites.length === 0) {
        return <div className="favorites-no-favorites">No tienes ofertas guardadas como favoritas.</div>;
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        setFilterTerm(searchTerm);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleFiltersChange = (updatedFilters) => {
        setFilters(updatedFilters);
    };

    return (
        <div className="favorites-body">
            <div className="favorites-container">
                <h1 className="favorites-title">Tus Favoritos</h1>
                <div className="search-bar d-flex">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar favoritos..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button className="btn btn-search ms-3" onClick={handleSearchClick}>
                        Buscar
                    </button>
                </div>
                <div className="favorites-row">
                    {store.favorites
                        .filter(favoriteOffer => 
                            favoriteOffer.name.toLowerCase().includes(filterTerm.toLowerCase())
                        )
                        .map((favoriteOffer) => (
                            <div className="favorites-card-offer" key={favoriteOffer.id}>
                                <CardOffer id={favoriteOffer.id} />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};