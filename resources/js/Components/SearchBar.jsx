import React from "react";

export default function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <div className="mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Pesquisar por nome"
                value={searchTerm}
                onChange={onSearchChange}
            />
        </div>
    );
}
