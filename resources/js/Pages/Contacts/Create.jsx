import React from "react";
import axios from "axios";
import { Head, Link } from "@inertiajs/react";
import ContactForm from "@/Components/ContactForm";

export default function CreateContact() {
    const handleSubmit = async (formData) => {
        try {
            const response = await axios.post("/api/contacts", formData);
            return response;
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                return error.response;
            } else {
                console.error("Erro inesperado:", error);
                throw error;
            }
        }
    };

    return (
        <div className="agenda-container">
            <Head title="Criar Contato" />
            <h1 className="title">Criar Contato</h1>
            <nav className="navbar">
                <Link href="/contacts" className="nav-button">
                    Voltar para Agenda
                </Link>
                <Link href="/contacts/addresses/create" className="nav-button">
                    Editar/Vincular Endereço
                </Link>
                <Link href="/contacts/addresses/phones" className="nav-button">
                    Editar/Vincular Telefone
                </Link>
            </nav>

            <ContactForm onSubmit={handleSubmit} />
        </div>
    );
}
