import React, { useContext, useEffect, useState } from "react";
import { CardOffer } from "./CardOffer.jsx";
import { CardOfferPremium } from "./CardOfferPremium.jsx";
import { Context } from "../store/appContext.js";
import "../../styles/CardListOffer.css";

export const ListOffers = ({ searchTerm, empleador_id }) => {
    const { store, actions } = useContext(Context);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            actions.loadAllJobOffers(); 
            setLoaded(true);
        }
    }, [loaded, actions]);

    const filterOffersByEmployer = (offers, empleador_id) => {
        if (!empleador_id) return offers;
        return offers.filter((offer) => offer.empleador_id === empleador_id);
    };

    const filterOffersBySearchTerm = (offers, searchTerm) => {
        if (!searchTerm) return offers;

        const term = searchTerm.toLowerCase();
        return offers.filter((offer) => {
            const nameMatch = offer.name?.toLowerCase().includes(term);
            const modalityMatch = offer.modality?.toLowerCase().includes(term);
            const salaryMatch = offer.salary?.toLowerCase().includes(term);
            return nameMatch || modalityMatch || salaryMatch;
        });
    };

    const offersByEmployer = filterOffersByEmployer(store.jobOffers || [], empleador_id);
    const filteredOffers = filterOffersBySearchTerm(offersByEmployer, searchTerm);

    const isEmployerPremium = (offer) => offer.premium === true;

    return (
        <div className="list-offer-container mt-3 m-auto">
            <div className="row d-flex flex-column text-start g-2">
                {filteredOffers.length > 0 ? (
                    filteredOffers.map((offer) => {
                        const isPremium = isEmployerPremium(offer);
                        return (
                            <div className="col list-offer-box" key={offer.id}>
                                {isPremium ? (
                                    <CardOfferPremium
                                        title={offer.name}
                                        id={offer.id}
                                    />
                                ) : (
                                    <CardOffer
                                        title={offer.name}
                                        id={offer.id}
                                    />
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p className="no-offers-section text-center shadow-lg">
                        No hay ofertas disponibles
                    </p>
                )}
            </div>
        </div>
    );
};
