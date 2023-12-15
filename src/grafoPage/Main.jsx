import { useState, useEffect } from "react"

import styles from "./Main.module.css"
import pesquisadoresJson from "./pesquisadores.json"

const Main = ({
  setTipoProducao,
  setTipoVertice,
  setInstituto,
  setSelectedPesquisadores,
  setGraphTrigger,
  selectedPesquisadores,
  graphTrigger
}) => {
  const [institutos, setInstitutos] = useState([])
  // const [instituto, setInstituto] = useState("")
  const [pesquisadores, setPesquisadores] = useState([])
  const [selectedPesquisadorId, setSelectedPesquisadorId] = useState(0)
  const [startYear, setStartYear] = useState("")
  const [endYear, setEndYear] = useState("")
  const [showPesquisadores, setShowPesquisadores] = useState(false)
  // const [selectedPesquisadores, setSelectedPesquisadores] = useState([])
  // const [tipoProducao, setTipoProducao] = useState('')
  // const [tipoVertice, setTipoVertice] = useState('')

  const search = async () => {
    // const nomePesquisador = document.getElementById("pesquisador").textContent
    // const pesquisador = pesquisadoresJson.filter(
    //   pesquisadoresJson => pesquisadoresJson.nome == nomePesquisador
    // )
    // const idXmlPesquisador = pesquisador[0]["idXml"]
    // const tipoProducao = document.getElementById("typeprod").value
    // const url = `http://localhost:8080/api/v1/coAutores/detalhamento?pesquisador=${idXmlPesquisador}&tipo=${tipoProducao}&anoInicio=${startYear}&anoFim=${endYear}`
    // console.log(url)
    // const response = await fetch(url)
    // const detalhamentoObras = await response.json()
    // console.log(tipoProducao)
    // console.log(detalhamentoObras)
    // console.log(tipoProducao)
    // console.log(tipoVertice)
    // console.log(instituto)
    // console.log(selectedPesquisadores)
  }

  const handlePesquisadorCheckboxChange = event => {
    const pesquisadorId = event.target.value
    if (selectedPesquisadores.includes(pesquisadorId)) {
      // If already selected, remove it
      setSelectedPesquisadores(prevSelected =>
        prevSelected.filter(id => id !== pesquisadorId)
      )
    } else {
      // If not selected, add it
      setSelectedPesquisadores(prevSelected => [...prevSelected, pesquisadorId])
    }
  }

  const startYearChane = event => {
    const startYear = new Date(event.target.value)
    setStartYear(startYear.getFullYear())
  }

  const endYearChange = event => {
    const endYear = new Date(event.target.value)
    setEndYear(endYear.getFullYear())
  }

  useEffect(() => {
    const handlePageLoad = async () => {
      const response = await fetch("http://localhost:8080/api/v1/institutos")
      const data = await response.json()
      setInstitutos(_ => data)
      if (data.length === 1) setSelectedPesquisadorId(data[0].id)
    }

    handlePageLoad()
  }, [])

  useEffect(() => {
    const handlePesquisadorLoad = async () => {
      const response = await fetch(
        `http://localhost:8080/api/v1/pesquisadores/pesquisadorInstituto?instituto=${selectedPesquisadorId}`
      )
      const data = await response.json()
      setPesquisadores(data)
    }
    if (selectedPesquisadorId !== 0) handlePesquisadorLoad()
  }, [selectedPesquisadorId])

  const onChangeInstituto = e => {
    setSelectedPesquisadorId(e.target.value)
    setInstituto(e.target.value)
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchBarContainer}>
        <span>
          <label htmlFor="instituto">Instituto: </label>
          <select
            name="instituto"
            id="instituto"
            // onChange={e => setSelectedPesquisadorId(e.target.value)}
            onChange={onChangeInstituto}
          >
            {institutos &&
              institutos.map(inst => {
                return <option value={inst.id}>{inst.nome}</option>
              })}
          </select>
        </span>
        <div className={styles.pesquisadorContainer}>
          <label>Pesquisador: </label>
          <button
            className={styles.pesquisadorDpButton}
            onClick={() => setShowPesquisadores(!showPesquisadores)}
          >
            V
          </button>
          <div className={styles.dpdownPesquisador}>
            {showPesquisadores &&
              pesquisadores &&
              pesquisadores.map(pesquisador => (
                <label
                  key={pesquisador.id}
                  className={styles.checkboxLabel}
                >
                  {console.log(selectedPesquisadores, pesquisador.id)}
                  <input
                    type="checkbox"
                    name={`pesquisador_${pesquisador.id}`}
                    value={pesquisador.id}
                    checked={selectedPesquisadores.includes(
                      String(pesquisador.id)
                    )}
                    onChange={handlePesquisadorCheckboxChange}
                  />
                  {pesquisador.nome}
                </label>
              ))}
          </div>
        </div>
        <span>
          <label htmlFor="typeprod">Tipo Prod: </label>
          <select
            name="typeprod"
            id="typeprod"
            onChange={e => setTipoProducao(e.target.value)}
          >
            <option value="livro">Livro</option>
            <option value="artigo">Artigo</option>
            <option value="todos">Todos</option>
          </select>
        </span>
        <span>
          <label htmlFor="typevert">Tipo Vertice: </label>
          <select
            name="typevert"
            id="typevert"
            onChange={e => setTipoVertice(e.target.value)}
          >
            <option value="instituto">Instituto</option>
            <option value="pesquisador">Pesquisador</option>
          </select>
        </span>
        <span>
          <button onClick={() => setGraphTrigger(!graphTrigger)}>Aplicar</button>
        </span>
      </div>
    </div>
  )
}

export default Main
