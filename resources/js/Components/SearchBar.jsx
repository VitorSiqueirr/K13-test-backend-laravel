import React from "react";
import "../../css/SearchBar.css";

export default function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <div className="search-bar">
            <input
                type="text"
                className="search-input"
                placeholder="Pesquisar por nome"
                value={searchTerm}
                onChange={onSearchChange}
            />
        </div>
    );
}
