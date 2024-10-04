import React, { useContext } from "react";
import "./style.css";

// Importando o contexto
import TodoContext from "../../context/TodoContext";

// Importe dos icones de uso
import { FaXmark } from "react-icons/fa6";
import { BiSolidPencil } from "react-icons/bi";

const ListTodo = ({ atualizarTarefa }) => {
  // Utilizando as referencias globais
  const { tarefas, setTarefas, filtros } = useContext(TodoContext)

  // Função para remover uma tarefa
  const deletarTarefa = id => {
    setTarefas( tarefas.filter(tarefa => tarefa.id !== id) )
  }

  // Função para concluir/não concluir uma tarefa
  const marcarDesmarcarTarefa = id => {
    setTarefas(tarefas.map( tarefa => tarefa.id === id ? { ...tarefa, completa : !tarefa.completa } : tarefa ))
  }

  return (
    <ul className="container-lista">
      {filtros.map((tarefa) => (
        <li key={tarefa.id} className={`item-lista ${tarefa.completa && "item-confirmado"}`}>
          <label className="custom-checkbox">
            <input type="checkbox" checked={tarefa.completa} onChange={e => marcarDesmarcarTarefa(tarefa.id)}/>
            <span className="checkmark"></span>
          </label>

          <p className="descricao-tarefa">{tarefa.descricao}</p>

          <div className="acoes-tarefa">
            <button className="botao-tarefa" onClick={e => deletarTarefa(tarefa.id)}>
              <FaXmark size={25} />
            </button>

            <button className="botao-tarefa" onClick={e => atualizarTarefa(tarefa)}>
              <BiSolidPencil size={25} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListTodo;
