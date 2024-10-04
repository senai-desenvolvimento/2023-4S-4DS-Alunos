import React, { useContext, useEffect, useState } from "react";
import "./style.css";

// Importando o contexto da lista de tarefas
import TodoContext from "../../context/TodoContext";

// Importe do modal e do icone de fechar
import ReactModal from "react-modal";
import { FaXmark } from "react-icons/fa6";

// Importe dos componentes do sistema
import Button from "../Button";
import Title from "../Title";
import { TextArea } from "../Input";

const Modal = ({
  visible,
  setVisible,
  alterarTarefa,
  onAfterClose,
}) => {
  // Importando as referencias globais
  const { tarefas, setTarefas } = useContext(TodoContext)

  // States de controle de alteracao e valor da tarefa
  const [isEditing, setIsEditing] = useState(false);
  const [descricao, setDescricao] = useState("");

  // Funcao para adicionar uma nova tarefa
  const adicionarTarefa = (e) => {
    e.preventDefault();

    setTarefas([
      ...tarefas,
      { id: tarefas.length + 1, descricao: descricao, completa: false },
    ]);

    setVisible(false);
  };

  // Funcao para alterar os dados de uma terefa
  const atualizarTarefa = (e) => {
    e.preventDefault();

    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === alterarTarefa.id
          ? { ...tarefa, descricao: descricao }
          : tarefa
      )
    );

    setVisible(false);
  };

  // Verificação de abertura/fechamento do modal para limpar os campos
  useEffect(() => {
    setDescricao("");
    setIsEditing(false);
  }, [visible]);

  // Verificacao de edição da tarefa
  useEffect(() => {
    if (alterarTarefa != null) {
      setIsEditing(true);
      setDescricao(alterarTarefa.descricao);
    }
  }, [alterarTarefa]);

  return (
    <ReactModal
      onAfterClose={onAfterClose}
      isOpen={visible}
      style={{
        overlay: {
          backgroundColor: "rgba(108, 69, 206, 0.7)",
          backdropFilter: "blur(5px)",
        },
        content: {
          top: "20%",
          width: "50%",
          height: "60%",
          margin: "0 auto",
          border: "none",
          borderRadius: "10px",
          backgroundColor: "#1E123B",
        },
      }}
    >
      <form
        className="formulario-tarefa"
        onSubmit={(e) => (isEditing ? atualizarTarefa(e) : adicionarTarefa(e))}
      >
        <FaXmark size={25} onClick={(e) => setVisible(!visible)} />

        <Title>Descreva sua nova tarefa</Title>

        <TextArea
          placeholder="Descrever a tarefa"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />

        <Button type="submit">Confirmar tarefa</Button>
      </form>
    </ReactModal>
  );
};

export default Modal;
