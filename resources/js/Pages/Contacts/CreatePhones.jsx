import PhoneForm from "@/Components/PhoneForm";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

export default function CreatePhone({ contacts }) {
    const [errors, setErrors] = useState({});

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
                setErrors(error.response.data.errors);
            } else {
                console.error("Erro inesperado:", error);
                setErrors({ general: "Ocorreu um erro ao salvar o telefone." });
            }
        }
    };

    return (
        <div>
            <Head title="Vincular Telefone" />
            <h1>Vincular Telefone</h1>
            {Object.keys(errors).length > 0 && (
                <div className="alert alert-danger">
                    <ul>
                        {Object.values(errors).map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <PhoneForm contacts={contacts} onSubmit={handleSubmit} />

            <Link href="/contacts" className="btn btn-secondary ml-2">
                Criar novo Contato
            </Link>
        </div>
    );
}
