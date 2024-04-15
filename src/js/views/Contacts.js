import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/ContactCard";
import { Link } from "react-router-dom"

export const Contacts = () => {
    const { store, actions } = useContext(Context);


    return (
        <div className="container">
            <div>
                <p className="text-right my-3">
                    <Link className="btn btn-success" to="/add">
                        Add new contact
                    </Link>
                </p>
                <div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
                    <ul className="list-group pull-down" id="contact-list">
                        {store.contacts.map(contact => (
                            <ContactCard key={contact.id} contact={contact} onDelete={() => actions.deleteContact(contact.id)} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};


export default Contacts;