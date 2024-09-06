import React, { useState, useContext } from 'react';
import '../../styles/login.css';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const credentials = { email: email, password: password };
        const result = await actions.login(credentials);
        if (result.token) {
            console.log("Inicio de sesión correcto");
            navigate("/");
        } else {
            console.log("Error al iniciar sesión");
            setError(true)
        }
    };

    const handleForgotPassword = () => {
        // Aquí podrías redirigir a una página de restablecimiento de contraseña
        navigate('/reset-password'); // Suponiendo que tengas una ruta configurada para reset-password
    };

    return (
        <div className='centrar'>
            <section id="content">
                <form className="login-container" onSubmit={handleLogin}>
                    <h1 className='text-center'>Iniciar Sesión</h1>
                    {error && (
                        <div className="alert alert-warning m-0 p-2 text-center " role="alert">
                            No existe ningún usuario registrado con esos datos.
                        </div>
                    )}

                    <div className="username">
                        <input
                            className="inputname"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value.trim())}
                            required
                            autoComplete='off'
                            id="username"
                        />
                    </div>
                    <div className="password">
                        <input
                            className="inputpassword"
                            type="password"
                            placeholder="Password"
                            value={password}
                            id="password"
                            onChange={(e) => setPassword(e.target.value.trim())}
                            required
                        />
                    </div>
                    <button type="submit" className="loginbutton">Login</button>
                    <div>
                        <p onClick={handleForgotPassword} className="forgot-password-link fst-italic text-decoration-underline">
                            ¿Olvidaste tu contraseña?
                        </p>
                    </div>
                </form>
            </section>
        </div>
    );
};

