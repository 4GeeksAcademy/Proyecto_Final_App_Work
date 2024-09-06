import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Favoritos } from "../component/favoritos";
import "../../styles/favoritosPage.css";

export const FavoritosPage = () => {
    const { store } = useContext(Context);

    return (
        <div className="favoritos-page-container">
    
                <Favoritos />
        
        </div>
    );
};