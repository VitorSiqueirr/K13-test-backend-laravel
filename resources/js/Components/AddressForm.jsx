import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/AddressForm.css";

export default function AddressForm({ states, contacts, onSubmit }) {
    const [contactId, setContactId] = useState("");
    const [cep, setCep] = useState("");
    const [street, setStreet] = useState("");
    const [number, setNumber] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [alert, setAlert] = useState("");

    useEffect(() => {
        setAlert("");
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
                    setAlert("Erro ao buscar endereço: ", error);
                });
        }
    }, [contactId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setAlert("");
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
            setAlert("Success: " + response.data.message);
        } catch (error) {
            if (
                error.response &&
                error.response.data &&
                error.response.data.errors
            ) {
                setAlert(`general: ${error.response.data.errors}`);
            } else {
                setAlert(
                    "general: There's an error linking/saving the address."
                );
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
                    setAlert("Erro ao consultar CEP:", error);
                });
        }
    };

    return (
        <div className="form-container">
            <form className="address-form" onSubmit={handleSubmit}>
                <div className="form-fields">
                    <label className="form-label" htmlFor="contact_id">
                        Contato:
                    </label>
                    <select
                        className="form-select"
                        id="contact_id"
                        value={contactId}
                        onChange={(e) => setContactId(e.target.value)}
                        required
                    >
                        <option value="">Selecione um contato</option>
                        {contacts.map((contact) => (
                            <option key={contact.id} value={contact.id}>
                                {contact.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="fields-container">
                    <div className="fields-sub-container">
                        <div className="form-fields">
                            <label className="form-label" htmlFor="cep">
                                CEP:
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                id="cep"
                                value={cep}
                                onChange={handleCepChange}
                                required
                            />
                        </div>

                        <div className="form-fields">
                            <label className="form-label" htmlFor="street">
                                Rua:
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                id="street"
                                value={street}
                                onChange={(e) => setStreet(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-fields">
                            <label className="form-label" htmlFor="number">
                                Número da Casa:
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                id="number"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="fields-sub-container">
                        <div className="form-fields">
                            <label
                                className="form-label"
                                htmlFor="neighborhood"
                            >
                                Bairro:
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                id="neighborhood"
                                value={neighborhood}
                                onChange={(e) =>
                                    setNeighborhood(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-fields">
                            <label className="form-label" htmlFor="city">
                                Cidade:
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-fields">
                            <label className="form-label" htmlFor="state">
                                Estado:
                            </label>
                            <select
                                className="form-select"
                                id="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                            >
                                <option value="">Selecione um estado</option>
                                {states.map((stateOption) => (
                                    <option
                                        key={stateOption}
                                        value={stateOption}
                                    >
                                        {stateOption}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <button type="submit" className="save-button">
                    Salvar
                </button>
            </form>
            {Object.keys(alert).length > 0 && (
                <div className="alert-container">
                    {alert.toLowerCase().includes("success") ? (
                        <p className="alert-message success">{alert}</p>
                    ) : (
                        <p className="alert-message error">{alert}</p>
                    )}
                </div>
            )}
        </div>
    );
}
