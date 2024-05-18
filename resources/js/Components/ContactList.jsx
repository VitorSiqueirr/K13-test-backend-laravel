import React from "react";
import moment from "moment";

export default function ContactList({ contacts }) {
    return (
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
                        <td>{moment(contact.birthday).format("DD/MM/YYYY")}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
