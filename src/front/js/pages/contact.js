import React, { useState, useRef } from "react";
import "../../styles/contact.css";


export const Contact = () => {
  const form = useRef();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    message: "",
    privacyPolicyAccepted: false,
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.lastName || !formData.email || !formData.message || !formData.privacyPolicyAccepted) {
      setSubmissionStatus("Todos los campos son obligatorios y debes aceptar la política de privacidad.");
      return;
    }


    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });



      if (response.ok) {
        emailjs
          .sendForm(process.env.EMAIL_SERVICE_ID, process.env.EMAIL_TEMPLATE_ID, form.current,
            process.env.EMAIL_USER_ID
          )
          .then(
            () => {
              console.log('SUCCESS!');
            },
            (error) => {
              console.log('FAILED...', error.text);
            },
          );
        setSubmissionStatus("Mensaje enviado con éxito.");
        setFormData({ name: "", lastName: "", email: "", message: "", privacyPolicyAccepted: false });
      } else {
        setSubmissionStatus("Hubo un problema al enviar el mensaje. Inténtalo de nuevo.");
      }
    } catch (error) {
      setSubmissionStatus("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="container-contact contenedor">
      <section className="contact-section text-center mt-5">
        <h2 style={{ color: "#6793AE" }} className="fw-bold">
          Contáctanos
        </h2>
        <p className="text-secondary mt-3">
          ¿Tienes alguna pregunta o estás interesado en nuestros servicios? ¡Estamos aquí para ayudarte! Completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
        </p>

        <div className="contact-info">
          <p>
            <i className="fas fa-phone-alt"></i> <div className="text-secondary"><strong>Teléfono: </strong> +34 123 456 789</div>
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i>  <div className="text-secondary"><strong>Dirección: </strong> Barcelona, España</div>
          </p>
          <p>
            <i className="fas fa-envelope"></i> <div className="text-secondary"><strong>Correo Electrónico: </strong> loopy@gmail.com</div>
          </p>
        </div>
      </section>

      <section className="contact-form-section">
        <form ref={form} className="row g-3 justify-content-center" onSubmit={handleSubmit}>

          <div className="col-6">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              placeholder="Ingresa tu nombre"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="col-6">
            <label htmlFor="lastName" className="form-label">
              Apellido
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              placeholder="Ingresa tu apellido"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-10">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="correo@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-10">
            <label htmlFor="message" className="form-label">
              Mensaje
            </label>
            <textarea
              className="form-control"
              id="message"
              name="message"
              aria-label="Mensaje"
              style={{ height: "150px" }}
              placeholder="Describe cómo podemos ayudarte"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="col-md-10 d-flex justify-content-start">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="privacyPolicyAccepted"
                checked={formData.privacyPolicyAccepted}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="privacyPolicyAccepted">
                Acepto la Política de Privacidad
              </label>
            </div>
          </div>

          <div className="col-md-10 text-center mt-3">
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
          </div>

          {submissionStatus && (
            <div className="col-md-10 text-center mt-3">
              <div class="alert alert-success" role="alert">
                {submissionStatus}
              </div>

            </div>
          )}
        </form>
      </section>
    </div>
  );
};