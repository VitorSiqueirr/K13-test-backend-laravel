import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import IMask from "imask";
import "../../css/PhoneForm.css";

export default function PhoneForm({ contacts, onSubmit }) {
    const [contactId, setContactId] = useState("");
    const [commercialPhone, setCommercialPhone] = useState("");
    const [residentialPhone, setResidentialPhone] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [alert, setAlert] = useState("");

    const commercialPhoneRef = useRef(null);
    const residentialPhoneRef = useRef(null);
    const mobilePhoneRef = useRef(null);

    useEffect(() => {
        const commercialMask = IMask(commercialPhoneRef.current, {
            mask: "(00) 0000-0000",
        });

        const residentialMask = IMask(residentialPhoneRef.current, {
            mask: "(00) 0000-0000",
        });

        const mobileMask = IMask(mobilePhoneRef.current, {
            mask: "(00) 0 0000-0000",
        });

        return () => {
            commercialMask.destroy();
            residentialMask.destroy();
            mobileMask.destroy();
        };
    }, []);

    useEffect(() => {
        if (contactId) {
            axios
                .get(`/api/contacts/${contactId}/phones`)
                .then((response) => {
                    const data = response.data[0] || {};
                    setCommercialPhone(data.commercial_phone || "");
                    setResidentialPhone(data.residencial_phone || "");
                    setMobilePhone(data.mobile_phone || "");
                })
                .catch((error) => {
                    console.error("Erro ao buscar telefone: ", error);
                });
        } else {
            setCommercialPhone("");
            setResidentialPhone("");
            setMobilePhone("");
        }
    }, [contactId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await onSubmit({
                contact_id: contactId,
                commercial_phone: commercialPhone,
                residencial_phone: residentialPhone,
                mobile_phone: mobilePhone,
            });

            alert(response.data.message);
        } catch (error) {
            if (error.response?.data?.errors) {
                setAlert({ general: error.response.data.errors });
            } else {
                console.error("Erro inesperado:", error);
                setAlert({ general: "Ocorreu um erro ao salvar o telefone." });
            }
        }
    };

    const handlePhoneChange = (event, type) => {
        const { value } = event.target;
        if (type === "commercial") {
            setCommercialPhone(value);
        } else if (type === "residential") {
            setResidentialPhone(value);
        }
    };

    const handleMobilePhoneChange = (event) => {
        setMobilePhone(event.target.value);
    };

    return (
        <div className="form-container">
            <form className="phone-form" onSubmit={handleSubmit}>
                <div className="form-fields">
                    <label className="form-label" htmlFor="contact_id">
                        Contato:
                    </label>
                    <select
                        className="form-select"
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

                <div className="form-fields">
                    <label className="form-label" htmlFor="commercial_phone">
                        Telefone Comercial:
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        id="commercial_phone"
                        value={commercialPhone}
                        onChange={(e) => handlePhoneChange(e, "commercial")}
                        ref={commercialPhoneRef}
                    />
                </div>

                <div className="form-fields">
                    <label className="form-label" htmlFor="residential_phone">
                        Telefone Residencial:
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        id="residential_phone"
                        value={residentialPhone}
                        onChange={(e) => handlePhoneChange(e, "residential")}
                        ref={residentialPhoneRef}
                    />
                </div>

                <div className="form-fields">
                    <label className="form-label" htmlFor="mobile_phone">
                        Telefone Celular:
                    </label>
                    <input
                        type="text"
                        className="form-input"
                        id="mobile_phone"
                        value={mobilePhone}
                        onChange={handleMobilePhoneChange}
                        ref={mobilePhoneRef}
                        required
                    />
                </div>

                <button type="submit" className="save-button">
                    Salvar
                </button>
            </form>
            {Object.keys(alert).length > 0 && (
                <div className="alert-container">
                    <p className="alert-message">{alert}</p>
                </div>
            )}
        </div>
    );
}
