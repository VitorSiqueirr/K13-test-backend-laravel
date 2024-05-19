import React, { useState } from "react";
import "../../css/ContactForm.css";

export default function ContactForm({ initialValues = {}, onSubmit }) {
    const [name, setName] = useState(initialValues.name || "");
    const [cpf, setCpf] = useState(initialValues.cpf || "");
    const [email, setEmail] = useState(initialValues.email || "");
    const [birthdate, setBirthdate] = useState(initialValues.birthday || "");
    const [alert, setAlert] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await onSubmit({
                name,
                cpf,
                email,
                birthday: birthdate,
            });

            setAlert(response.data.message);
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                setAlert(error.response.data.errors);
            } else {
                console.error("Unexpected error:", error);
                setAlert({ general: "There's an error saving the contact." });
            }
        }
    };

    return (
        <div className="form-container">
            {Object.keys(alert).length > 0 && (
                <div className="alert-container">
                    <p className="alert-message">{alert}</p>
                </div>
            )}

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
                    />
                </div>

                <button type="submit" className="save-button">
                    Salvar
                </button>
            </form>
        </div>
    );
}
