import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
import { FormAtivement } from '../../Components/Forms'
import Tabs from '../../Components/Tabs'
import Table from '../../Components/Table'

const Painel = () => {
  const [update, setUpdate] = useState({})
  const [places, setPlaces] = useState([])
  const [selectedPlace, setSelectedPlace] = useState("")
  const [listAtivements, setListAtivements] = useState([]);

  const getPlaces = () => {
    fetch("http://localhost:3000/locais")
    .then(response => response.json())
    .then(response => {
      setPlaces(response);

      // Se tiver ao menos um local cadastrado, usar o primeiro resultado como filtro dos ativos
      if(response[0]){
        setSelectedPlace(response[0].id)
      }
    })
    .catch(() => {
      alert("Erro inesperado, não foi possível obter os locais dos ativos")
    })
  }

  useEffect(() => {
    if(selectedPlace === ""){
      getPlaces()
    }
  }, []);

  const filterAtivements = (local) => {
    fetch("http://localhost:3000/ativos?local=" + local)
    .then(response => response.json())
    .then(response => {
      setListAtivements(response)
    })
    .catch(() => {
      alert("Não foi possível obter os ativos")
    })
  }

  useEffect(() => {
    filterAtivements(selectedPlace)
  }, [selectedPlace])

  return (
    <div className='w-10/12 mx-auto my-0'>
      <Header />
      
      {/* Formulário de ativo */}
      <FormAtivement places={places} setPlaces={setPlaces} setList={setListAtivements} list={listAtivements} update={update}/>

      {/* tabs - locais dos ativos */}
      <Tabs places={places} selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}  />

      <Table list={listAtivements.filter( x => x.local === selectedPlace )} setList={setListAtivements} setUpdate={setUpdate}/>
    </div>
  )
}

export default Painel
