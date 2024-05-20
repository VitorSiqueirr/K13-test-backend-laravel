import React from "react";
import { Head, Link } from "@inertiajs/react";
import useContactSearch from "@/hooks/useContactSearch";
import SearchBar from "@/Components/SearchBar";
import ContactList from "@/Components/ContactList";

export default function ShowAllContacts() {
    const { filteredContacts, searchTerm, setSearchTerm } = useContactSearch();

    return (
        <div className="agenda-container">
            <Head title="Agenda" />
            <h1 className="title">Agenda</h1>

            <nav className="navbar">
                <Link href="/contacts/create" className="nav-button">
                    Criar Novo Contato
                </Link>
                <Link href="/contacts/addresses/create" className="nav-button">
                    Editar/Vincular Endereço
                </Link>
                <Link href="/contacts/addresses/phones" className="nav-button">
                    Editar/Vincular Telefone
                </Link>
            </nav>

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={(e) => setSearchTerm(e.target.value)}
            />

            <ContactList contacts={filteredContacts} />
        </div>
    );
}
