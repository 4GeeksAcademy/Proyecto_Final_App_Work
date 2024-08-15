import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import {SingleOffer} from "./pages/SingleOffer.jsx"
import { TimeLine } from "./component/TimeLine.jsx"

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
<<<<<<< HEAD
import { LoginPage } from "./pages/login";
=======
>>>>>>> b5c2fbf (Ruta añadida del front para el timeLine)
import { Inicio } from "./pages/inicio.js";
import { TimeLine } from "./pages/TimeLine.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element ={<Inicio />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<LoginPage />} path="/login" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<TimeLine/>} path="/timeline"/>
                        <Route element={<SingleOffer />} path="/singleoffer/:id" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
