import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/sobreNosotros.css";

export const SobreNosotros = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="contenedor ">
            <section className="about-us">
                <h2 className="frase">"Somos el puente entre empresas visionarias y programadores freelance talentosos, creando conexiones que impulsan la innovación" </h2>
            </section>
            <section className="mission-vision-section row mt-5">
                <div className="col-md-6 text-center text-lg-start mission-box">
                    <h2 className="text-secondary fw-bold">Nuestra Misión</h2>
                    <p className="mt-3 text-secondary">
                        Facilitar el acceso a proyectos emocionantes para desarrolladores freelance, mientras proporcionamos
                        a las empresas las herramientas necesarias para encontrar el talento perfecto para sus necesidades.
                    </p>
                </div>
                <div className="col-md-6 text-center text-lg-start vision-box">
                    <h2 className="text-secondary fw-bold">Nuestra Visión</h2>
                    <p className="mt-3 text-secondary">
                        Ser la plataforma líder en el mercado de trabajo freelance para programadores, creando un ecosistema
                        donde la calidad, la innovación y la confianza sean los pilares fundamentales.
                    </p>
                </div>
            </section>
            <section className="values-section text-center mt-5 section-margin">
                <h2 className="text-secondary fw-bold">Nuestros Valores</h2>
                <div className="row values-grid mt-4">
                    <div className="col-md-3 value-item innovation">
                        <i className="fas fa-lightbulb icon"></i>
                        <h3 className="text-secondary mt-3">Innovación</h3>
                        <p className="text-secondary mt-2">Impulsamos la creatividad y la búsqueda constante de nuevas soluciones.</p>
                    </div>
                    <div className="col-md-3 value-item quality">
                        <i className="fas fa-star icon"></i>
                        <h3 className="text-white mt-3">Calidad</h3>
                        <p className="text-white mt-2">Nos comprometemos con la excelencia en cada proyecto.</p>
                    </div>
                    <div className="col-md-3 value-item transparency">
                        <i className="fas fa-handshake icon"></i>
                        <h3 className="text-secondary mt-3">Transparencia</h3>
                        <p className="text-secondary mt-2">Creemos en la honestidad y la claridad en todas nuestras interacciones.</p>
                    </div>
                    <div className="col-md-3 value-item collaboration">
                        <i className="fas fa-users icon"></i>
                        <h3 className="text-white mt-3">Colaboración</h3>
                        <p className="text-white mt-2">Fomentamos un ambiente de trabajo colaborativo entre freelancers y empresas.</p>
                    </div>
                </div>
            </section>
            <section className="why-choose-us-section text-center mt-5 section-margin">
                <h2 className="text-secondary fw-bold">¿Por qué elegirnos?</h2>
                <div className="row benefits-grid mt-4">
                    <div className="col-md-3 benefit-item networking">
                        <i className="fas fa-network-wired icon"></i>
                        <p className="text-secondary mt-3">Una amplia red de contactos y oportunidades laborales.</p>
                    </div>
                    <div className="col-md-3 benefit-item tools">
                        <i className="fas fa-tools icon"></i>
                        <p className="text-white mt-3">Herramientas avanzadas para gestionar proyectos y colaborar en equipo.</p>
                    </div>
                    <div className="col-md-3 benefit-item support">
                        <i className="fas fa-graduation-cap icon"></i>
                        <p className="text-secondary mt-3">Soporte y recursos para mejorar tus habilidades y crecer profesionalmente.</p>
                    </div>
                    <div className="col-md-3 benefit-item security">
                        <i className="fas fa-shield-alt icon"></i>
                        <p className="text-white mt-3">Un ambiente seguro y confiable para trabajar y contratar.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};