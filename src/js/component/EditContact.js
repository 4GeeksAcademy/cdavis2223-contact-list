import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

const EditContact = ({ match, history }) => {
    const { store, actions } = useContext(Context);

    const contactId = parseInt(match.params.id);
    const contactToEdit = store.contactList.find(contact => contact.id === contactId);

    const [editedContact, setEditedContact] = useState({
        full_name: contactToEdit.full_name,
        email: contactToEdit.email,
        agenda_slug: contactToEdit.agenda_slug,
        address: contactToEdit.address,
        phone: contactToEdit.phone,
    });

    const [imagePreview, setImagePreview] = useState(contactToEdit.image);

    const inputChange = (e) => {
        if (e.target.name === "image") {
            const file = e.target.files[0];
            setEditedContact({ ...editedContact, image: file });
            setImagePreview(URL.createObjectURL(file));
        } else {
            setEditedContact({ ...editedContact, [e.target.name]: e.target.value });
        }
    }

    const submitForm = (e) => {
        e.preventDefault();
        actions.editContact(contactId, editedContact);
        history.push("/");
    }

    return (
        <div className="edit-contact">
            <form onSubmit={submitForm}>
                <div className="mb-3">
                    <label htmlFor="inputImage" className="form-label">
                        Profile picture
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="inputImage"
                        name="image"
                        accept="image/*"
                        onChange={inputChange}
                    />
                    {imagePreview && (<img src={imagePreview} alt="Profile picture" className="img-preview" />)}
                </div>
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">
                        Full Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        name="full_name"
                        value={editedContact.full_name}
                        onChange={inputChange}
                        placeholder="Enter full name"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        name="email"
                        value={editedContact.email}
                        onChange={inputChange}
                        placeholder="Enter email"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputPhone">
                        Phone
                    </label>
                    <input
                        type="tel"
                        className="form-control"
                        id="inputPhone"
                        name="phone"
                        value={editedContact.phone}
                        onChange={inputChange}
                        placeholder="Enter phone number"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="inputAddress">
                        Address
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        name="address"
                        value={editedContact.address}
                        onChange={inputChange}
                        placeholder="Enter address"
                        required
                    />
                </div>
                <button type="submit">
                    Save changes
                </button>
            </form>
        </div>
    );
}

export default EditContact;