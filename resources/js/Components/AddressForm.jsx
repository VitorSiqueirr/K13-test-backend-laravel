import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";

export default function AddressForm({
    states,
    contacts,
    initialValues = {},
    onSubmit,
}) {
    const [contactId, setContactId] = useState(initialValues.contact_id || "");
    const [cep, setCep] = useState(initialValues.cep || "");
    const [street, setStreet] = useState(initialValues.street || "");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (contactId) {
            axios
                .get(`/api/contacts/${contactId}/addresses`)
                .then((response) => {
                    setCep(response.data.cep || "");
                    setStreet(response.data.street || "");
                    setNumber(response.data.number || "");
                    setNeighborhood(response.data.neighborhood || "");
                    setCity(response.data.city || "");
                    setState(response.data.state || "");
                })
                .catch((error) => {
                    console.error("Erro ao buscar endereço:", error);
                });
        }
    }, [contactId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await onSubmit({
                contact_id: contactId,
                cep,
                street,
                number,
                neighborhood,
                city,
                state,
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
                setErrors({ general: "Ocorreu um erro ao salvar o endereço." });
            }
        }
    };

    const handleCepChange = (event) => {
        setCep(event.target.value);

        if (event.target.value.length === 8) {
            axios
                .get(`https://viacep.com.br/ws/${event.target.value}/json/`)
                .then((response) => {
                    if (!response.data.erro) {
                        setStreet(response.data.logradouro);
                        setNeighborhood(response.data.bairro);
                        setCity(response.data.localidade);
                        setState(response.data.uf);
                    }
                })
                .catch((error) => {
                    console.error("Erro ao consultar CEP:", error);
                });
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
                            {contact.name} {contact.id}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="cep">CEP:</label>
                <input
                    type="text"
                    className="form-control"
                    id="cep"
                    value={cep}
                    onChange={handleCepChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="street">Rua:</label>
                <input
                    type="text"
                    className="form-control"
                    id="street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="number">Número da Casa:</label>
                <input
                    type="text"
                    className="form-control"
                    id="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="neighborhood">Bairro:</label>
                <input
                    type="text"
                    className="form-control"
                    id="neighborhood"
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="city">Cidade:</label>
                <input
                    type="text"
                    className="form-control"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="state">Estado:</label>
                <select
                    className="form-control"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                >
                    <option value="">Selecione um estado</option>
                    {states.map((stateOption) => (
                        <option key={stateOption} value={stateOption}>
                            {stateOption}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">
                Salvar
            </button>
        </form>
    );
}
