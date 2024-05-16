import React, { useState, useEffect } from "react";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";

export default function CreateAddress({ contacts, states, selectedContact }) {
    const [contactId, setContactId] = useState(
        selectedContact ? selectedContact.id : ""
    );
    const [cep, setCep] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (selectedContact && selectedContact.address) {
            setCep(selectedContact.address.cep);
            setStreet(selectedContact.address.street);
            setNumber(selectedContact.address.number);
            setNeighborhood(selectedContact.address.neighborhood);
            setCity(selectedContact.address.city);
            setState(selectedContact.address.state);
        }
    }, [selectedContact]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const requestMethod =
            selectedContact && selectedContact.address ? "put" : "post";
        const requestUrl =
            selectedContact && selectedContact.address
                ? `/api/contacts/${contactId}/addresses/${selectedContact.address.id}`
                : `/api/contacts/${contactId}/addresses`;

        axios({
            method: requestMethod,
            url: requestUrl,
            data: {
                contact_id: contactId,
                cep,
                street,
                number,
                neighborhood,
                city,
                state,
            },
        })
            .then((response) => {
                Inertia.visit(`/contacts/${contactId}`);
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
                    setErrors({
                        general: "Ocorreu um erro ao salvar o endereço.",
                    });
                }
            });
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
        <div>
            <h1>Criar Endereço</h1>

            {/* ... (exibição de erros) */}

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

                {/* ... (outros campos do formulário, incluindo o CEP com handleCepChange) */}

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
        </div>
    );
}
