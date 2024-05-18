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
                setErrors(error.response.data.errors);
            } else {
                console.error("Erro inesperado:", error);
                setErrors({ general: "Ocorreu um erro ao salvar o endereço." });
            }
        }
    };

    return (
        <div>
            <Head title="Vincular Endereço" />
            <h1>Vincular Endereço</h1>

            <AddressForm
                states={states}
                contacts={contacts}
                onSubmit={handleSubmit}
            />

            <Link href="/contacts" className="btn btn-secondary ml-2">
                Voltar para Agenda
            </Link>
        </div>
    );
}
