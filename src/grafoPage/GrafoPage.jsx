import { useState } from "react"

import Main from "./Main"
import List from "./List"
import Grafo from "./Grafo"

const ObrasPage = () => {
  //   const [result, setResult] = useState([])
  //   const [institutos, setInstitutos] = useState([])
  //   const [pesquisadores, setPesquisadores] = useState([])
  //   const [selectedPesquisadorId, setSelectedPesquisadorId] = useState(0)
  //   const [startYear, setStartYear] = useState("")
  //   const [endYear, setEndYear] = useState("")
  //   const [showPesquisadores, setShowPesquisadores] = useState(false)
  //   const [selectedPesquisadores, setSelectedPesquisadores] = useState([])

  const [selectedPesquisadores, setSelectedPesquisadores] = useState([])
  const [tipoProducao, setTipoProducao] = useState("")
  const [tipoVertice, setTipoVertice] = useState("")
  const [instituto, setInstituto] = useState("")
  const [graphTrigger, setGraphTrigger] = useState(true)

  const [grafoInfo, setGrafoInfo] = useState([
    { color: "Vermelho", start: 1, end: 5 },
    { color: "Roxa", start: 6, end: 8 },
    { color: "Azul", start: 8, end: 10 },
    { color: "Verde", start: 10, end: 15 },
    { color: "Amarela", start: 16, end: 20 },
  ])
  return (
    <>
      <Main
        setSelectedPesquisadores={setSelectedPesquisadores}
        setTipoProducao={setTipoProducao}
        setTipoVertice={setTipoVertice}
        setInstituto={setInstituto}
        setGraphTrigger={setGraphTrigger}
        graphTrigger={graphTrigger}
        selectedPesquisadores={selectedPesquisadores}
      />
      <List
        setGrafoInfo={setGrafoInfo}
        grafoInfo={grafoInfo}
      />
      <Grafo
        grafoInfo={grafoInfo}
        graphTrigger={graphTrigger}
        selectedPesquisadores={selectedPesquisadores}
        tipoProducao={tipoProducao}
        tipoVertice={tipoVertice}
        instituto={instituto}
      />
    </>
  )
}

export default ObrasPage
