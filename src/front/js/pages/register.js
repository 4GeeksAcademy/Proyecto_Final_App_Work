import React, { useState, useContext } from "react";
import "../../styles/register.css";
import { useForm } from "react-hook-form";
import { Context } from "../store/appContext";
import AlertSuccess from "../component/alertSuccess";
import { useNavigate } from "react-router-dom";


export const Register = () => {

  const { store, actions } = useContext(Context);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();


  const onSubmit = (formData) => {
    actions.register(formData)

    const timer = setTimeout(() => {
      if (store.success) {
        if (store.programador) {
          navigate("/Userview")
        }
        if (store.empleador) {
          navigate("/Companyview")
        }
      }
    }, 3000);
    return () => clearTimeout(timer);
  }



  return (
    <div className="container-fluid p-0">
      <div className="d-flex justify-content-center py-4 my-4 centrar">
        <div className="row contenedor-registro border rounded shadow " >
          <div className='col header-formulario'>
            <h1 className="fw-bold fs-1">Bienvenido!!!</h1>
            <span className="fw-lighter fs-5 mb-5">Empieza tu viaje con nosotros.</span>
          </div>
          <div className="col my-auto">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-2 my-3 "
            >
              <div className=" w-100 text-center ">
                <h1 className="fw-bold fs-1" >Crear Cuenta</h1>
              </div>

              {store?.msg && <AlertSuccess />}

              <div className="w-100  mb-1 bg-white rounded ">
                <div className="form-group mb-2  ">

                  <input
                    type="text"
                    className="sombreado form-control"
                    id="name"
                    name="name"
                    placeholder="Nombre.."
                    {...register("name", {
                      required: true,
                      pattern: {
                        value: /^[A-Za-z]+$/i,
                        message: "Solo se permiten letras",
                      },
                    })}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  {errors.name?.type === "required" && (
                    <button className="btn btn-warning w-100 mt-2" role="alert">
                      El campo nombre está vacío
                    </button>
                  )}
                  {errors.name?.message && (
                    <button className="btn btn-warning w-100 mt-2" role="alert">
                      {errors.name.message}
                    </button>
                  )}
                </div>
                <div className="form-group mb-2">
                  <input
                    type="text"
                    className="sombreado form-control"
                    id="username"
                    placeholder="Apellidos.."
                    {...register("username", { required: true })}
                    aria-invalid={errors.username ? "true" : "false"}
                  />
                  {errors.username?.type === "required" && (
                    <button className="btn btn-warning w-100 mt-2" role="alert">
                      El campo apellidos está vacío
                    </button>
                  )}
                </div>

                <div className="form-group mb-2">
                  <input
                    type="email"
                    className="sombreado form-control"
                    id="email"
                    placeholder="Email.."
                    {...register("email", { required: true })}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email?.type === "required" && (
                    <button className="btn btn-warning w-100 mt-2" role="alert">
                      El campo email está vacío
                    </button>
                  )}
                </div>
                <div className="form-group mb-2">
                  <input
                    type="text"
                    className="sombreado form-control"
                    id="country"
                    placeholder="Pais.."
                    {...register("country", { required: true })}
                    aria-invalid={errors.country ? "true" : "false"}
                  />
                  {errors.country?.type === "required" && (
                    <button className="btn btn-warning w-100 mt-2" role="alert">
                      El campo pais está vacío
                    </button>
                  )}
                </div>
                <div className="form-group mb-2">

                  <input
                    type="password"
                    className="sombreado form-control"
                    id="password"
                    placeholder="Contraseña.."
                    {...register("password", {
                      required: true,
                      minLength: {
                        value: 6,
                        message: "Debe tener mínimo 6 caracteres",
                      },
                    })}
                    aria-invalid={errors.password ? "true" : "false"}
                  />
                  {errors.password?.type === "required" && (
                    <button className="btn btn-warning w-100 mt-2" role="alert">
                      El campo contraseña está vacío
                    </button>
                  )}
                  {errors.password?.message && (
                    <button className="btn btn-warning w-100 mt-2" role="alert">
                      {errors.password?.message}
                    </button>
                  )}
                </div>
                <div className="form-group">

                  <input
                    type="text"
                    className="form-control sombreado"
                    id="cif"
                    {...register("cif")}
                    placeholder="Escriba el CIF.."
                  />
                </div>



                <button type="submit" className="btn w-100 mt-4 stylebutton p-3">
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      </div >


    </div >
  );
};
