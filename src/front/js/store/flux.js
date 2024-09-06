const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			jobOffers: [],
			selectedJobOffer: null,
			token: null,
			user: null,
			proyectos: [],
			postulados: [],
			ratings: [],
			favorites: [],
			companyName: null,
			companyEmail: null,
			phoneNumber: 'null',
			description: 'null',
			skills: [],
			userPrice: 50,
			userCurrency: 'EUR',
		},
		actions: {
			loadAllJobOffers: async () => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/ofertas`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						}
					});


					if (resp.ok) {
						const data = await resp.json();
						console.log('esto es la data', data);
						setStore({ jobOffers: data.ofertas });

						const { jobOffers, user } = getStore();

						const { jobOffers, user } = getStore();
						const premiumOffers = jobOffers.filter(offer => offer.empleador_id === user?.id);

						console.log(premiumOffers);
						setStore({ premiumOffers });
					} else {
						console.error("Error al cargar ofertas");
					}
				} catch (error) {
					console.error("Error en la solicitud de ofertas:", error);
				}
			},


			loadJobOfferById: async (id) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/oferta/${id}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						}
					});

					if (resp.ok) {
						const data = await resp.json();
						setStore({ selectedJobOffer: data.oferta });
					} else {
						console.error("Error al cargar la oferta");
					}
				} catch (error) {
					console.error("Error en la solicitud de oferta:", error);
				}
			},

			createJobOffer: async (offerData) => {
				console.log(offerData);
				try {
					const token = localStorage.getItem('token');
					const resp = await fetch(`${process.env.BACKEND_URL}/api/crearOferta`, {
						method: 'POST',
						headers: {
							"Content-Type": 'application/json',
							Authorization: `Bearer ${token}`
						},
						body: JSON.stringify(offerData)
					});

					if (resp.ok) {
						const data = await resp.json();
						const store = getStore();
						setStore({ jobOffers: [...store.jobOffers, data.oferta] });
						return data;
					} else {
						const errorData = await resp.json();
						console.error("Error al crear la oferta:", errorData.msg);
						return errorData;
					}
				} catch (error) {
					console.error("Error al conectarse con el backend:", error);
				}
			},

			applyToJobOffer: async (oferta_id) => {
				const store = getStore();
				const token = store.token;

				if (!token) {
					return { msg: "Usuario no autenticado: registrate o inicia sesión", type: 'error' }
				}

				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/postulados`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`
						},
						body: JSON.stringify({ oferta_id })
					});

					if (resp.ok) {
						const data = await resp.json();
						console.log('inscripcion exitosa', data);
						return { msg: "Inscripcion realizada con exito.", type: "success" };
					} else {
						const errorData = await resp.json();
						console.log("Error al inscribirse: ", errorData.msg);
						return { msg: errorData.msg, type: 'warning' };

					}
				} catch (error) {
					console.log("Error en la solitud de inscripcion.");
					return { msg: "Error en la solicitud de inscripcion.", type: "error" }

				}
			},

			unapplyFromJobOffer: async (oferta_id) => {
				const store = getStore();
				const token = store.token;

				if (!token) {
					return { msg: "Usuario no autenticado: regístrate o inicia sesión", type: 'error' };
				}

				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/postulados/${oferta_id}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
					});

					if (resp.ok) {
						const data = await resp.json();
						console.log('Desinscripción exitosa', data);
						return { msg: "Desinscripción realizada con éxito.", type: "success" };
					} else {
						const errorData = await resp.json();
						console.log("Error al desinscribirse: ", errorData.msg);
						return { msg: errorData.msg, type: 'warning' };
					}
				} catch (error) {
					console.log("Error en la solicitud de desinscripción.");
					return { msg: "Error en la solicitud de desinscripción.", type: "error" };
				}
			},
			loadUserPostulaciones: async (oferta_id) => {
				const store = getStore();
				const token = store.token;

				if (!token) {
					return { msg: "Usuario no autenticado: regístrate o inicia sesión", type: 'error' };
				}


				try {
					// Hacer la solicitud al endpoint
					const response = await fetch(`${process.env.BACKEND_URL}/api/ofertas/${oferta_id}/postulados/detalles`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`, // Enviar el token de autenticación
						},
					});

					if (response.ok) {
						// Procesar la respuesta si la solicitud fue exitosa
						const postulados = await response.json();
						console.log('Postulados:', postulados);
						setStore({ postulados });
						return { postulados, type: "success" };
					} else {
						const errorData = await response.json();
						console.error('Error al obtener postulados:', errorData.msg);
						return { msg: errorData.msg, type: 'warning' };
					}
				} catch (error) {
					console.error('Error en la solicitud:', error);
					return { msg: "Error en la solicitud de postulados.", type: "error" };
				}
			},

			getNumeroPostulados: async (oferta_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/ofertas/${oferta_id}/postulados`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${localStorage.getItem('token')}`
						},
					});
					if (response.ok) {
						const data = await response.json();
						return data.numero_postulados;
					} else {
						const errorData = await response.json();
						console.error('Error al obtener número de postulaciones:', errorData.msg);
						return null;
					}
				} catch (error) {
					console.error('Error en la solicitud:', error);
					return null;
				}
			},
			changePostuladoStatus: async (oferta_id, user_id, estado) => {
				const store = getStore();
				const token = store.token;

				if (!token) {
					return { msg: "Usuario no autenticado: regístrate o inicia sesión", type: 'error' };
				}

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/postulados/${user_id}/${oferta_id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({ estado }),
					});

					if (response.ok) {
						const postulado = await response.json();
						return { postulado, type: "success" };
					} else {
						const errorData = await response.json();
						console.error('Error al cambiar el estado del postulado:', errorData.msg);
						return { msg: errorData.msg, type: 'warning' };
					}
				} catch (error) {
					console.error('Error en la solicitud de cambio de estado:', error);
					return { msg: "Error en la solicitud de cambio de estado.", type: "error" };
				}
			},

			createRating: async (ratingData) => {
				try {
					const token = localStorage.getItem('token');
					const response = await fetch(`${process.env.BACKEND_URL}/api/ratings`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`,
						},
						body: JSON.stringify(ratingData),
					});
					console.log(ratingData)
					if (!response.ok) {
						throw new Error("Error en la respuesta de la API");
					}

					const data = await response.json();
					console.log("esta es la data", data)
					return data;  // Asegúrate de que esta línea devuelva la respuesta correcta

				} catch (error) {
					console.error("Error en la solicitud de creación de calificación:", error);
					return;
				}
			},

			updateRating: async (id, value) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/ratings/${id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`,
						},
						body: JSON.stringify({ value })
					});

					if (!response.ok) {
						throw new Error("Error en la respuesta de la API");
					}

					const data = await response.json();

					if (data.success) {
						console.log("Calificación actualizada:", data.rating);
						const store = getStore();
						setStore({
							ratings: store.ratings.map(rating =>
								rating.id === id ? data.rating : rating
							)
						});
					} else {
						console.error("Error al actualizar calificación:", data.msg);
					}
				} catch (error) {
					console.error("Error en la solicitud de actualización de calificación:", error);
				}
			},

			deleteRating: async (id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/ratings/${id}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`,
						}
					});

					if (!response.ok) {
						throw new Error("Error en la respuesta de la API");
					}

					const data = await response.json();

					if (data.success) {
						console.log("Calificación eliminada exitosamente");
						const store = getStore();
						setStore({
							ratings: store.ratings.filter(rating => rating.id !== id)
						});
					} else {
						console.error("Error al eliminar calificación:", data.msg);
					}
				} catch (error) {
					console.error("Error en la solicitud de eliminación de calificación:", error);
				}
			},


			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });

					return data;
				} catch (error) {
					console.log("Error cargando mensaje desde el backend", error);
				}
			},

			register: async (formData) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "api/register", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formData),
					});
					const data = await resp.json();
					setStore(data);
					console.log(data);
					localStorage.setItem('token', data.token);
					return data;

				} catch (error) {
					console.log('Error:', error);
				}
			},

			resetStore: () => {
				setStore({ msg: "", success: "" });
			},

			logOut: () => {
				localStorage.removeItem("token");
				setStore({ msg: "", token: "", success: "", user: "", empleador: "", programador: "" });
				return true;
			},

			editUser: async (formData, texto, token) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + `/api/user/edit${texto}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify(formData),
					});
					const data = await resp.json();
					setStore(data);
					localStorage.setItem('token', data.token);
					return data;

				} catch (error) {
					console.log('Error:', error);
				}
			},

			login: async (credentials) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(credentials)
					});

					if (resp.ok) {
						const data = await resp.json();
						console.log(data)
						localStorage.setItem('token', data.token);
						setStore({ token: data.token, user: data.user });
						getActions().getFavorites(data.user.id)
						return data;
					} else {
						return false;
					}
				} catch (error) {
					console.error("Error al conectarse con el backend:", error);
				}
			},

			loadUserFromToken: () => {
				const token = localStorage.getItem('token');
				if (token) {
					setStore({ token: token });
				}
			},

			addProjects: async (formData, token) => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/user/programador/addProjects", {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify(formData),
					})
					const data = await resp.json()
					setStore(
						{ proyectos: [...getStore().proyectos, data.proyectos] })
					return data

				} catch (error) {
					console.log('Error:', error);
				}
			},
			paymentCompany: (paymentMethod) => {
				const token = localStorage.getItem('token');
				let promise = fetch(process.env.BACKEND_URL + '/api/create-payment', {
					method: 'POST',
					body: JSON.stringify({ payment_method: paymentMethod.id }),
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				}).then((response) =>
					response.json()
				).then((data) => {
					setStore({ user: data.user, suscripcion: data })
				}).catch((error) => {
					console.log('[error]', error)
				});
			},

			resetPassword: async (token, password1, password2) => {
				if (!password1 || !password2) {
					console.log("Faltan campos");
					return false;
				}

				if (password1.trim() !== password2.trim()) {
					console.log("Las contraseñas no coinciden");
					return false;
				}

				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/reset-password`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							password: password1,
						}),
					});

					if (resp.ok) {
						const data = await resp.json();
						console.log("Contraseña cambiada exitosamente", data);
						return true;
					} else {
						const errorData = await resp.json();
						console.log("Error al cambiar contraseña:", errorData.message);
						return false;
					}
				} catch (error) {
					console.error("Error al cambiar contraseña:", error);
					return false;
				}
			},

			addFavorite: async (programador_id, empleador_id, oferta_id) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/favoritos`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							programador_id: programador_id,
							empleador_id: empleador_id,
							oferta_id: oferta_id,
						}),
					});

					if (!response.ok) {
						throw new Error('Error al agregar favorito');
					}

					const data = await response.json();
					setStore({ favorites: [...getStore().favorites, data] });
					return data;

				} catch (error) {
					console.error('Error:', error);
					throw error;
				}
			},

			getFavorites: async (id = getStore().user.id) => {


				if (!id) {
					console.error('No se pudo obtener el ID del usuario');
					return;
				}

				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${user_id}/favoritos`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});

					if (response.ok) {
						const data = await response.json();
						setStore({ favorites: data }); // Asegúrate de que el 'data' ya es la lista de favoritos
					} else {
						console.error('Error al obtener los favoritos');
					}
				} catch (error) {
					console.error('Error en la solicitud de favoritos:', error);
				}
			},
			getCompanyName: async () => {
				const store = getStore();
				const token = localStorage.getItem('token');
				console.log("Token:", token);
				if (!token) {
					console.error("No se pudo obtener el token de autenticación");
					return;
				}
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/empleador/nombre_empresa`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`
						}
					});
					const contentType = response.headers.get("content-type");
					if (contentType && contentType.indexOf("application/json") === -1) {
						console.error("Respuesta no es JSON. Tipo de contenido:", contentType);
						const text = await response.text();
						console.error("Contenido de la respuesta no JSON:", text);
						return null;
					}
					if (!response.ok) {
						throw new Error("Error al obtener el nombre de la empresa, status: " + response.status);
					}
					const data = await response.json();
					setStore({ companyName: data.nombre });
					return data.nombre;
				} catch (error) {
					console.error("Error en la solicitud del nombre de la empresa:", error);
					return null;
				}
			},
			updateCompanyName: async (newName) => {
				const token = localStorage.getItem('token');
				console.log("Token:", token);
				if (!token) {
					console.error("No se pudo obtener el token de autenticación");
					return;
				}
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/empleador/nombre_empresa`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify({ nombre_empresa: newName })
					});
					const contentType = response.headers.get("content-type");
					if (contentType && contentType.indexOf("application/json") === -1) {
						console.error("Respuesta no es JSON. Tipo de contenido:", contentType);
						const text = await response.text();
						console.error("Contenido de la respuesta no JSON:", text);
						return null;
					}
					if (!response.ok) {
						throw new Error("Error al actualizar el nombre de la empresa, status: " + response.status);
					}
					const data = await response.json();
					setStore({ user: data.user });
					return data.user;
				} catch (error) {
					console.error("Error en la solicitud de actualización del nombre de la empresa:", error);
					return null;
				}
			},

			getCompanyPhone: async () => {
				const store = getStore();
				const token = localStorage.getItem('token');
				console.log("Token:", token);
				if (!token) {
					console.error("No se pudo obtener el token de autenticación");
					return;
				}
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/empleador/telefono_empresa`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`
						}
					});
					const contentType = response.headers.get("content-type");
					if (contentType && contentType.indexOf("application/json") === -1) {
						console.error("Respuesta no es JSON. Tipo de contenido:", contentType);
						const text = await response.text();
						console.error("Contenido de la respuesta no JSON:", text);
						return null;
					}
					if (!response.ok) {
						throw new Error("Error al obtener el telefono de la empresa, status: " + response.status);
					}
					const data = await response.json();
					setStore({ companyPhone: data.telefono });
					return data.telefono;
				} catch (error) {
					console.error("Error en la solicitud del telefono de la empresa:", error);
					return null;
				}
			},

			// Actualizar el teléfono de la empresa
			updateCompanyPhone: async (newPhone) => {
				const token = localStorage.getItem('token');
				console.log("Token:", token);
				if (!token) {
					console.error("No se pudo obtener el token de autenticación");
					return;
				}
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/empleador/telefono_empresa`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${token}`
						},
						body: JSON.stringify({ telefono_empresa: newPhone })
					});
					const contentType = response.headers.get("content-type");
					if (contentType && contentType.indexOf("application/json") === -1) {
						console.error("Respuesta no es JSON. Tipo de contenido:", contentType);
						const text = await response.text();
						console.error("Contenido de la respuesta no JSON:", text);
						return null;
					}
					if (!response.ok) {
						throw new Error("Error al actualizar el telefono de la empresa, status: " + response.status);
					}
					const data = await response.json();
					setStore({ user: data.user });
					return data.user;
				} catch (error) {
					console.error("Error en la solicitud de actualización del telefono de la empresa:", error);
					return null;
				}
			}, getProfileImage: async () => {
				try {
					const token = localStorage.getItem("token");
					const response = await fetch(`${process.env.BACKEND_URL}api/get-profile-image`, {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`,
						}
					});

					if (response.ok) {
						const data = await response.json();
						return data.profile_image_url;
					} else {
						console.error("Error al obtener la imagen de perfil");
						return null;
					}
				} catch (error) {
					console.error("Error en la solicitud de obtener imagen de perfil:", error);
					return null;
				}
			},

			// Acción para subir la imagen de perfil
			uploadProfileImage: async (imageFile) => {
				try {
					const token = localStorage.getItem("token");
					const formData = new FormData();
					formData.append('image', imageFile);

					const response = await fetch(`${process.env.BACKEND_URL}api/upload-profile-image`, {
						method: 'POST',
						headers: {
							'Authorization': `Bearer ${token}`,
						},
						body: formData
					});

					if (response.ok) {
						const data = await response.json();
						return data.profile_image_url;
					} else {
						console.error("Error al subir la imagen de perfil");
						return null;
					}
				} catch (error) {
					console.error("Error al subir la imagen de perfil:", error);
					return null;
				}
			},

			// Acción para obtener la descripción
			getDescription: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/get-description`, {
						headers: {
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						}
					});
					if (response.ok) {
						const data = await response.json();
						if (data.success) {
							setStore({ description: data.description });
						}
					} else {
						console.error('Error al obtener la descripción:', response.statusText);
					}
				} catch (error) {
					console.error('Error en la solicitud de descripción:', error);
				}
			},
			// Acción para actualizar la descripción
			updateDescription: async (newDescription) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}api/update-description`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						},
						body: JSON.stringify({ description: newDescription })
					});
					if (response.ok) {
						const data = await response.json();
						if (data.success) {
							setStore({ description: data.description });
						}
					} else {
						console.error('Error al actualizar la descripción:', response.statusText);
					}
				} catch (error) {
					console.error('Error en la solicitud de actualización:', error);
				}
			},
			loadUserSkills: async () => {
				const store = getStore();
				const userId = store.user?.id;

				if (!userId) {
					console.error("No user found");
					return;
				}

				try {
					

					const resp = await fetch(`${process.env.BACKEND_URL}api/skills/${userId}`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${store.token}`
						}
					});

					if (resp.ok) {
						const data = await resp.json();
						
						if (data.skills) {
							setStore({ skills: data.skills });
							console.log("Skills loaded", data.skills);
						} else {
							console.error("No skills found in response");
						}
					} else {
						const errorData = await resp.json();
						console.error("Error al cargar habilidades:", errorData.message);
						alert(`Error al cargar habilidades: ${errorData.message}`);
					}
				} catch (error) {
					console.error("Error en la solicitud de habilidades:", error.message);
					alert(`Error en la solicitud de habilidades: ${error.message}`);
				}
			},

			addUserSkills: async (newSkills) => {
				const store = getStore();
				const userId = store.user?.id;

				if (!userId) {
					console.error("No user found");
					return;
				}

				try {
					console.log("Sending request to:", `${process.env.BACKEND_URL}/api/skills/${userId}`);
					console.log("Request body:", newSkills);

					const resp = await fetch(`${process.env.BACKEND_URL}api/skills/${userId}`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${store.token}`
						},
						body: JSON.stringify(newSkills)
					});

					if (resp.ok) {
						const data = await resp.json();
						const updatedSkills = [...store.skills, data.newSkills];
						setStore({ skills: updatedSkills });
						console.log("Skills added", data.newSkills);
					} else {
						const errorData = await resp.json();
						console.error("Error al agregar habilidad:", errorData.msg);
						alert(`Error al agregar habilidad: ${errorData.msg}`);
					}
				} catch (error) {
					console.error("Error en la solicitud de agregar habilidad:", error.message);
					alert(`Error en la solicitud de agregar habilidad: ${error.message}`);
				}
			},
			loadUserPrice: async (userId) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/users/${userId}/price`, {
						method: 'GET',
						headers: {
							'Content-Type': 'application/json',
						},
					});

					if (resp.ok) {
						const data = await resp.json();
						setStore({
							userPrice: data.price,
							userCurrency: data.currency,
						});
					} else {
						console.error("Error al cargar el precio del usuario");
					}
				} catch (error) {
					console.error("Error en la solicitud del precio del usuario:", error);
				}
			},

			updateUserPrice: async (userId, price, currency) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}/api/users/${userId}/price`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ price, currency }),
					});

					if (resp.ok) {
						const data = await resp.json();
						setStore({
							userPrice: data.price,
							userCurrency: data.currency,
						});
						return data;
					} else {
						console.error("Error al actualizar el precio del usuario");
					}
				} catch (error) {
					console.error("Error en la solicitud de actualización del precio del usuario:", error);
				}
			},

		}
	};
};

export default getState;
