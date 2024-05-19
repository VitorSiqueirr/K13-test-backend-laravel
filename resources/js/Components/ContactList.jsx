import React from "react";
import moment from "moment";
import "../../css/ContactList.css";

export default function ContactList({ contacts }) {
    return (
        <div className="list-container">
            <table className="contacts-table">
                <thead className="table-header">
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>E-mail</th>
                        <th>Data de Nascimento</th>
                    </tr>
                </thead>
                <tbody className="table-body">
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
