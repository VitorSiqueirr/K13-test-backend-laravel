import React from "react";
import { Head, Link } from "@inertiajs/react";
import useContactSearch from "@/hooks/useContactSearch";
import SearchBar from "@/Components/SearchBar";
import ContactList from "@/Components/ContactList";

export default function ShowAllContacts() {
    const { filteredContacts, searchTerm, setSearchTerm } = useContactSearch();

    return (
        <div>
            <Head title="Agenda" />
            <h1>Agenda</h1>
            <Link href="/contacts/create" className="btn btn-secondary ml-2">
                Criar novo Contato
            </Link>
            <Link
                href="/contacts/addresses/create"
                className="btn btn-secondary ml-2"
            >
                Editar/Vincular Endereço
            </Link>
            <Link
                href="/contacts/addresses/phones"
                className="btn btn-secondary ml-2 "
            >
                Editar/Vincular Telefone
            </Link>

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
            />

            <ContactList contacts={filteredContacts} />
        </div>
    );
}
