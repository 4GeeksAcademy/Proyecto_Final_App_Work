import React, { useContext, useState, useRef, useEffect } from 'react'
import "../../styles/formContactPostulados.css"
import { Context } from '../store/appContext';
import emailjs from "emailjs-com"
import { useNavigate, useParams } from "react-router-dom";


const Form_Contact_Postulados = () => {
    const { id_programador } = useParams()
    const { store, actions } = useContext(Context);
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })
    const [error, setError] = useState(false)
    const [isConfirmSend, setIsConfirmSend] = useState(false)
    const form = useRef();
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if ([formData.message].includes("")) {
            setError(true)
            return
        }
        else {
            console.log(formData)
            emailjs
                .sendForm("service_phmi053", "template_mb20irn", form.current,
                    process.env.EMAIL_USER_ID
                )
                .then(
                    () => {
                        setIsConfirmSend(true)
                        const timer = setTimeout(() => {

                            console.log('Se ha enviado el correo al postulado!');

                            navigate("/")



                        }, 3000);
                        return () => clearTimeout(timer);
                    },

                    (error) => {
                        console.log('FAILED...', error.text);
                    },
                );
        }

    }

    useEffect(() => {
        setFormData({
            email: `${store.user?.email}`,
            name: `${store.user?.name}`,

        })


        if (id_programador) {
            actions.getUser(id_programador)
        }


    }, [])



    return (
        <div>
            <section className='seccion-form text-center'>
                <h1 >CONTACTAR CON EL POSTULADO</h1>
                <div className="form-contact-postulados ">
                    {error && (
                        <div className="alert alert-warning" role="alert">
                            El campo del mensaje está vacío, para continuar debes rellenar el mensaje.
                        </div>
                    )}
                    {isConfirmSend && (
                        <div className="alert alert-success" role="alert">
                            Mensaje enviado correctamente al postulado.
                        </div>
                    )}
                    <form ref={form} onSubmit={handleSubmit} >
                        <h5 >Datos del Postulado</h5>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <label htmlFor="nombre">Nombre</label>
                            <input type="text" name="nombre" value={store.postulado?.name} disabled />
                        </div>
                        <div className="input-field">
                            <i className="fa-solid fa-user-group"></i>
                            <label htmlFor="apellidos">Apellidos</label>
                            <input type="text" name="apellidos" value={store.postulado?.username} disabled />
                        </div>

                        <div className="input-field">
                            <i className="fas fa-at"></i>
                            <label htmlFor="emaildev">Email</label>
                            <input type="email" name="emaildev" value={store.postulado?.email} disabled />
                        </div>
                        <h5>Datos del contactante</h5>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <label htmlFor="name">Nombre</label>
                            <input id="name" type="text" name="name" onChange={handleOnChange} value={formData.name}  />
                        </div>
                        <div className="input-field">
                            <i className="fa-solid fa-user-group"></i>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="email" name="email" onChange={handleOnChange} value={formData.email}  />
                        </div>


                        <div className="input-field">
                            <i className="fas fa-pen"></i>
                            <label className='mb-5' htmlFor="message">Mensaje</label>
                            <textarea id='message' name="message" rows="20" length="500" value={formData.message} onChange={handleOnChange} required></textarea>
                        </div>

                        <div className="btn-block">
                            <button className="btn" type="submit"><i className="fas fa-paper-plane"></i>ENVIAR</button>
                        </div>

                    </form>
                </div>
            </section>
        </div>
    )

}
export default Form_Contact_Postulados