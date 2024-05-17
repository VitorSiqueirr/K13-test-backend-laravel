import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Head, Link } from "@inertiajs/react";

export default function ShowAllContacts() {
    const [contacts, setContacts] = useState([]);

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
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>E-mail</th>
                        <th>Data de Nascimento</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.name}</td>
                            <td>{contact.cpf}</td>
                            <td>{contact.email}</td>
                            <td>
                                {moment(contact.birthday).format("DD/MM/YYYY")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
