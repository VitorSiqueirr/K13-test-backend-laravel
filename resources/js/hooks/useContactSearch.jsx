import { useState, useEffect } from "react";
import axios from "axios";

export default function useContactSearch() {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios
            .get("/api/contacts/all")
            .then((response) => {
                setContacts(response.data);
            })
            .catch((error) => {
                console.error("Erro ao buscar contatos:", error);
            });
    }, []);

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return { filteredContacts, searchTerm, setSearchTerm };
}
