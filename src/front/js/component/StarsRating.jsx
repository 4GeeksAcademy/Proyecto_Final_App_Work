import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";

export const StarsRating = ({ totalStars = 5, offerId, SingleOfferRating }) => {
    const { store, actions } = useContext(Context);
    const [rating, setRating] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    const handleRating = async (rate) => {
        if (!offerId) {
            console.error("Offer ID is missing");
            return;
        }

        try {
            const current_user = store?.user?.profile_programador?.id;
            console.log(current_user)
            if (!current_user) {
                console.error("User ID is not available");
                return;
            }

            const result = await actions.createRating({
                from_id: current_user,
                to_id: offerId,
                value: rate,
            });

            console.log(result);
            if (result?.success) {
                setRating(rate);
                console.log("Calificación creada exitosamente:", result.rating);
                setSubmitted(true);
            } else {
                console.error(result?.msg || "Error al enviar la calificación");
            }
        } catch (error) {
            console.error("Error al enviar la calificación:", error);
        }
    };

    return (
        <div className={`rating d-flex ${SingleOfferRating}`}>
            {[...Array(totalStars)].map((_, index) => (
                <span
                    key={index}
                    onClick={() => handleRating(index + 1)}
                    style={{
                        color: index < rating ? "#ffd700" : "#ccc",
                        cursor: "pointer",
                    }}
                >
                    ★
                </span>
            ))}
            <p>({rating}) {submitted && "¡Gracias por tu calificación!"}</p>
        </div>
    );
};

