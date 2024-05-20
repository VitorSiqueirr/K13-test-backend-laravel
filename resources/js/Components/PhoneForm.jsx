import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import IMask from "imask";
import "../../css/PhoneForm.css";

export default function PhoneForm({
    contacts,
    onSubmit,
    setPhoneExists,
    setPhoneId,
}) {
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
                    if (data.id) {
                        setPhoneExists(true);
                        setPhoneId(data.id);
                        setCommercialPhone(data.commercial_phone || "");
                        setResidentialPhone(data.residencial_phone || "");
                        setMobilePhone(data.mobile_phone || "");
                    } else {
                        setPhoneExists(false);
                        setPhoneId(null);
                        setCommercialPhone("");
                        setResidentialPhone("");
                        setMobilePhone("");
                    }
                })
                .catch((error) => {
                    setAlert("Error finding the phone: ", error);
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

            setAlert("Success: " + response.data.message);
        } catch (error) {
            if (error.response && error.response.data) {
                setAlert(`${error.response.data.message}`);
            } else {
                setAlert(" general: There's an error saving the contact.");
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
