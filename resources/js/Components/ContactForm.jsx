import React, { useState } from "react";

export default function ContactForm({ initialValues = {}, onSubmit }) {
    const [name, setName] = useState(initialValues.name || "");
    const [cpf, setCpf] = useState(initialValues.cpf || "");
    const [email, setEmail] = useState(initialValues.email || "");
    const [birthdate, setBirthdate] = useState(initialValues.birthday || "");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await onSubmit({
                name,
                cpf,
                email,
                birthday: birthdate,
            });

            alert(response.data.message);
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                setErrors(error.response.data.errors);
            } else {
                console.error("Erro inesperado:", error);
                setErrors({ general: "Ocorreu um erro ao salvar o contato." });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {Object.keys(errors).length > 0 && (
                <div className="alert alert-danger">
                    <ul>
                        {Object.values(errors).map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <div className="form-group">
                <label htmlFor="name">Nome Completo:</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="cpf">CPF:</label>
                <input
                    type="text"
                    className="form-control"
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="birthdate">Data de Nascimento:</label>
                <input
                    type="date"
                    className="form-control"
                    id="birthdate"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                />
            </div>

            <button type="submit" className="btn btn-primary">
                Salvar
            </button>
        </form>
    );
}
