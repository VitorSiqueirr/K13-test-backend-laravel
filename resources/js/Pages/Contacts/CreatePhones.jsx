import PhoneInput from "@/Components/PhoneInput";
import { Head, Link } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CreatePhone({ contacts }) {
    const [contactId, setContactId] = useState("");
    const [commercialPhone, setCommercialPhone] = useState("");
    const [residentialPhone, setResidentialPhone] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (contactId) {
            axios
                .get(`/api/contacts/${contactId}/phones`)
                .then((response) => {
                    response.data.forEach((phone) => {
                        setCommercialPhone(phone.commercial_phone || "");
                        setResidentialPhone(phone.residential_phone || "");
                        setMobilePhone(phone.mobile_phone || "");
                    });
                })
                .catch((error) => {
                    console.log(error.message);
                    console.error("Erro ao buscar telefone: ", error);
                });
        }
    }, [contactId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/api/contacts/phones", {
                contact_id: contactId,
                commercial_phone: commercialPhone,
                residential_phone: residentialPhone,
                mobile_phone: mobilePhone,
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
                setErrors({ general: "Ocorreu um erro ao salvar o telefone." });
            }
        }
    };

    const handlePhoneChange = (event, type) => {
        switch (type) {
            case "commercial":
                setCommercialPhone(event.target.value);
                break;
            case "residential":
                setResidentialPhone(event.target.value);
                break;
            case "mobile":
                setMobilePhone(event.target.value);
                break;
            default:
                break;
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

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="contact_id">Contato:</label>
                    <select
                        className="form-control"
                        id="contact_id"
                        value={contactId}
                        onChange={(e) => setContactId(e.target.value)}
                    >
                        <option value="">Selecione um contato</option>
                        {contacts.map((contact) => (
                            <option key={contact.id} value={contact.id}>
                                {contact.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="commercial_phone">
                        Telefone Comercial:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="commercial_phone"
                        value={commercialPhone}
                        onChange={(e) => handlePhoneChange(e, "commercial")}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="residential_phone">
                        Telefone Residencial:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="residential_phone"
                        value={residentialPhone}
                        onChange={(e) => handlePhoneChange(e, "residential")}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="mobile_phone">Telefone Celular:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="mobile_phone"
                        value={mobilePhone}
                        onChange={(e) => handlePhoneChange(e, "mobile")}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Salvar
                </button>
                <Link href="/contacts" className="btn btn-secondary ml-2">
                    Criar novo Contato
                </Link>
            </form>
        </div>
    );
}
