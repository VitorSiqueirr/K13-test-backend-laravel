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
        <div>
            <Head title="Criar Contato" />
            <h1>Criar Contato</h1>

            <ContactForm onSubmit={handleSubmit} />

            <Link
                href="/contacts/addresses/create"
                className="btn btn-secondary ml-2"
            >
                Vincular Endereços
            </Link>
            <Link href="/contacts" className="btn btn-secondary ml-2">
                Voltar para Agenda
            </Link>
        </div>
    );
}
