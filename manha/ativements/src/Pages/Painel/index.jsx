import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { FormAtivement } from '../../Components/Form'
import Tabs from '../../Components/Tabs'
import List from '../../Components/List'

const Painel = () => {
  const [labelActive, setLabelActive] = useState("")
  const [ativiment, setAtiviment] = useState({});
  const [labels, setLabels] = useState([]);
  const [ativos, setAtivos] = useState([]);

  const procurarPorLocais = () => {
    fetch("http://localhost:3000/locais")
    .then(response => response.json())
    .then((response) => {
      setLabels(response);

      if(response[0]){
        setLabelActive(response[0].id);
      }
    })
    .catch(() => {
      alert("Erro inesperado: Não foi possível procurar por locais de ativos");
    });
  };

  useEffect(procurarPorLocais, []);
  
  const listarAtivos = (local) => {
    if(local){
      fetch("http://localhost:3000/ativos?local_id=" + local)
      .then((response) => response.json())
      .then((response) => {
        setAtivos(response);
      })
      .catch((error) => {
        alert("Erro inesperado 2", "Não foi possível procurar por ativos");
      });
    }
  }

  useEffect(() => {
    listarAtivos(labelActive)
  }, [labelActive]);  

  return (
    <div className="flex flex-col items-center p-2">
      <Header/>

      {/* Formulario de ativos */}
      <FormAtivement labels={labels} setLabels={setLabels} ativos={ativos} setAtivos={setAtivos} ativiment={ativiment} />

      {/* Aba de locais */}
      <Tabs labels={labels} labelActive={labelActive} setLabelActive={setLabelActive} />

      {/* Lista de ativos */}
      <List listaAtivos={ativos.filter(x => x.local_id === labelActive)} setAtivos={setAtivos} setAtiviment={setAtiviment} />
    </div>
  )
}

export default Painel
