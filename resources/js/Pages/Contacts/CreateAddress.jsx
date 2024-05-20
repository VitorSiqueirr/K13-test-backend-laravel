import React from "react";
import axios from "axios";
import { Head, Link } from "@inertiajs/react";
import AddressForm from "@/Components/AddressForm";

export default function CreateAddress({ states, contacts }) {
    const handleSubmit = async (formData) => {
        try {
            const response = await axios.post(
                "/api/contacts/addresses",
                formData
            );
            return response;
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                return error.response;
            } else {
                throw error;
            }
        }
    };

    return (
        <div className="agenda-container">
            <Head title="Vincular Endereço" />
            <h1 className="title">Vincular Endereço</h1>

            <nav className="navbar">
                <Link href="/contacts" className="nav-button">
                    Voltar Para Agenda
                </Link>
                <Link href="/contacts/create" className="nav-button">
                    Criar Novo Contato
                </Link>
                <Link href="/contacts/addresses/phones" className="nav-button">
                    Editar/Vincular Telefone
                </Link>
            </nav>

            <AddressForm
                states={states}
                contacts={contacts}
                onSubmit={handleSubmit}
            />
        </div>
    );
}
