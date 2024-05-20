import PhoneForm from "@/Components/PhoneForm";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";

export default function CreatePhone({ contacts }) {
    const handleSubmit = async (formData) => {
        setErrors({});
        try {
            const response = await axios.post("/api/contacts/phones", formData);
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
            <Head title="Vincular Telefone" />
            <h1 className="title">Vincular Telefone</h1>

            <nav className="navbar">
                <Link href="/contacts" className="nav-button">
                    Voltar Para Agenda
                </Link>
                <Link href="/contacts" className="nav-button">
                    Criar Novo Contato
                </Link>
                <Link href="/contacts/addresses/create" className="nav-button">
                    Editar/Vincular Endereço
                </Link>
            </nav>

            <PhoneForm contacts={contacts} onSubmit={handleSubmit} />
        </div>
    );
}
