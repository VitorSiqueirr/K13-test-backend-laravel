import React, { useEffect, useState } from "react";

const PhoneInput = ({ value, onChange, type }) => {
    const [formattedValue, setFormattedValue] = useState(value);

    useEffect(() => {
        setFormattedValue(value);
    }, [value]);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        const formatted = formatPhoneNumber(inputValue);
        setFormattedValue(formatted);
        onChange(formatted); // Envia o valor formatado para o componente pai
    };

    const formatPhoneNumber = (value) => {
        if (!value) return "";

        const cleaned = value.replace(/\D/g, ""); // Remove todos os caracteres que não são números

        if (cleaned.length === 0) return "";

        const match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);
        if (match) {
            return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
        }

        return cleaned;
    };

    return (
        <input
            type="text"
            value={formattedValue}
            onChange={handleInputChange}
            className="form-control"
        />
    );
};

export default PhoneInput;
