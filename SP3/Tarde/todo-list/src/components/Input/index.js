import React from "react";
import "./style.css";

import { IoIosSearch } from "react-icons/io";

export const Input = ({ placeholder, value, onChange }) => {
  return (
    <div className="filtro-container">
      <IoIosSearch size={25} style={{ fill: "var(--primary-white)" }} />

      <input
        className="campo-formulario campo-busca"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export const TextArea = ({ placeholder, value, onChange }) => {
  return (
    <textarea
      className="campo-formulario campo-descricao"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
