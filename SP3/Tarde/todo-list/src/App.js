import { useEffect, useState } from "react";
import "./App.css";

// Importândo o contexto da listagens de tarefas
import TodoContext from "./context/TodoContext"

// Importando os componentes do sistema
import Title from "./components/Title";
import { Input } from "./components/Input";
import ListTodo from "./components/ListTodo";
import Button from "./components/Button";
import Modal from "./components/Modal";

function App() {
  // Gerando a data atual do sistema
  const dataAtual = new Date().toLocaleDateString("pt-BR", { weekday : "long", month : "long", day : "numeric"})

  // States para manipulacao do filtro, tarefas e visualizacao do modal
  const [alterarTarefa, setAlterarTarefa] = useState(null);
  const [visible, setVisible] = useState(false);
  const [filtros, setFiltros] = useState([]);
  const [tarefas, setTarefas] = useState([]);

  // Funcao para adicionar dentro do modal os dados de uma tarefa
  const identificarTarefa = (tarefa) => {
    setAlterarTarefa(tarefa);
    setVisible(!visible);
  };

  // Filtrar as teras pelo campo de filtro
  const filtrarTarefa = filtro => {
    setFiltros(tarefas.filter(tarefa => tarefa.descricao.includes(filtro)))
  }

  // Atualizar a lista de filtros, assim que houver mudanças nas tarefas
  useEffect(() => {
    setFiltros(tarefas);
  }, [tarefas]);

  return (
    <TodoContext.Provider value={{ tarefas, setTarefas, filtros }}>
      <main className="container-principal">
        <section className="container-exibicao">
          {/* Titulo da plataforma */}
          <Title>
          {dataAtual}
          </Title>

          {/* Input de filtro de tarefas */}
          <Input placeholder="Procurar por tarefa" onChange={e => filtrarTarefa(e.target.value)} />

          {/* Lista das tarefas */}
          <ListTodo
            atualizarTarefa={identificarTarefa}
          />

          {/* Botao de chamada do modal */}
          <Button elevation type="button" onClick={(e) => setVisible(!visible)}>
            Nova tarefa
          </Button>
        </section>

        {/* Exibição do modal de adicionar/alterar tarefa */}
        <Modal
          visible={visible}
          setVisible={setVisible}
          onAfterClose={(e) => setAlterarTarefa(null)}
          alterarTarefa={alterarTarefa}
        />
      </main>
    </TodoContext.Provider>
  );
}

export default App;
