const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			urlBase: "https://playground.4geeks.com/contact",
			contacts: []
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getAllContacts: async () => {
				const store = getStore();
				try {
					let response = await fetch(`${store.urlBase}/agendas/cintia/contacts`)
					if (response.status == 404) {
						getActions().createAgenda()
					} else {
						let data = await response.json()
						console.log(data)
						setStore({
							contacts: data.contacts
						})
					}
				} catch (error) {
					console.log(error)
				}
			},
			createAgenda: async () => {
				const store = getStore()
				try {
					let responde = await fetch(`${store.urlBase}/agendas/cintia`)
					if (responde.status == 400) {
						console.log("agenda existe")
					} else {
						console.log("Agenda creada")
					}
				} catch (error) {
					console.log(error)
				}
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			createContact: async (contactData) => {
				const store = getStore();
				try {
					const response = await fetch(`${store.urlBase}/agendas/cintia/contacts`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(contactData),
					});
			
					if (response.ok) {
						await getActions().getAllContacts(); // Esperamos la actualización de los contactos antes de retornar true
						return true;
					} else {
						// Aquí manejamos casos donde la respuesta no es OK (puede ser 400, 404, etc.)
						console.error("Error creating contact:", response.status);
						return false; // Retornamos false para indicar que hubo un error al guardar el usuario
					}
				} catch (error) {
					console.error("Error creating contact:", error);
					return false; // También manejamos errores de red o cualquier otro error
				}
			},
			
			deleteContact: async (contactId) => {
				try {
					const response = await fetch(
						`https://playground.4geeks.com/contact/${contactId}`,
						{
							method: "DELETE",
						}
					);
					actions.fetchContacts();
				} catch (error) {
					console.error("Error deleting contact:", error);
				}
			},

			//es un objeto con los campos del contacto
			updateContact: async (contactId, contactData) => {
				try {
					const response = await fetch(
						`https://playground.4geeks.com/contact/${contactId}`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify(contactData),
						}
					);
					if (response.ok) {
						getActions().fetchContacts();
					} else {
						console.error("Error updating contact:", response.status);
					}
				} catch (error) {
					console.error("Error updating contact:", error);
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
