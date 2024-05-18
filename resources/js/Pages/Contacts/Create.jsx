import React, { useState } from "react";
import axios from "axios";
import { Head, Link } from "@inertiajs/react";

export default function CreateContact() {
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        axios
            .post("/api/contacts", {
                name,
                cpf,
                email,
                birthday: birthdate,
            })
            .then((response) => {
                alert("Contato adicionado com sucesso! \n");
            })
            .catch((error) => {
                if (
                    error.response &&
                    error.response.data &&
                    error.response.data.errors
                ) {
                    setErrors(error.response.data.errors);
                } else {
                    console.error("Erro inesperado:", error);
                }
            });
    };

    return (
        <div>
            <Head title="Criar Contato" />
            <h1>Criar Contato</h1>

            {Object.keys(errors).length > 0 && (
                <div className="alert alert-danger">
                    <ul>
                        {Object.values(errors).map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            <form onSubmit={handleSubmit}>
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

                <Link
                    href="/contacts/addresses/create"
                    className="btn btn-secondary ml-2"
                >
                    Vincular Endereços
                </Link>
                <Link href="/contacts" className="btn btn-secondary ml-2">
                    Voltar para Agenda
                </Link>
            </form>
        </div>
    );
}
