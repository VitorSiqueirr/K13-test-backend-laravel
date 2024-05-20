import React, { useState } from "react";
import "../../css/ContactForm.css";

export default function ContactForm({ initialValues = {}, onSubmit }) {
    const [name, setName] = useState(initialValues.name || "");
    const [cpf, setCpf] = useState(initialValues.cpf || "");
    const [email, setEmail] = useState(initialValues.email || "");
    const [birthdate, setBirthdate] = useState(initialValues.birthday || "");
    const [alert, setAlert] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await onSubmit({
                name,
                cpf,
                email,
                birthday: birthdate,
            });

            setAlert("Success: " + response.data.message);
        } catch (error) {
            if (error.response && error.response.data) {
                setAlert(`${error.response.data.message}`);
            } else {
                setAlert(" general: There's an error saving the contact.");
            }
        }
    };

    return (
        <div className="form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-fields">
                    <label className="form-label" htmlFor="name">
                        Nome Completo:
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-fields">
                    <label className="form-label" htmlFor="cpf">
                        CPF:
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        id="cpf"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        required
                    />
                </div>
                <div className="form-fields">
                    <label className="form-label" htmlFor="email">
                        E-mail:
                    </label>
                    <input
                        type="email"
                        className="form-input"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-fields">
                    <label className="form-label" htmlFor="birthdate">
                        Data de Nascimento:
                    </label>
                    <input
                        type="date"
                        className="form-input"
                        id="birthdate"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="save-button">
                    Salvar
                </button>
            </form>
            {Object.keys(alert).length > 0 && (
                <div className="alert-container">
                    {alert.toLowerCase().includes("success") ? (
                        <p className="alert-message success">{alert}</p>
                    ) : (
                        <p className="alert-message error">{alert}</p>
                    )}
                </div>
            )}
        </div>
    );
}
