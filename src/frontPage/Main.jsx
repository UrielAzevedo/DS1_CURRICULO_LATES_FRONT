import { useState, useEffect } from "react"

import styles from "./Main.module.css"
import pesquisadoresJson from "./pesquisadores.json"
import pesquisadoresObrasJson from "./pesquisador_obras.json"

const Main = ({setResult}) => {
  const [institutos, setInstitutos] = useState([])
  const [pesquisadores, setPesquisadores] = useState([])
  const [selectedPesquisadorId, setSelectedPesquisadorId] = useState(0)
  const [nomePesquisador, setNomePesquisador] = useState('a')
  const [startYear, setStartYear] = useState('')
  const [tipoProducao, setTipoProducao] = useState('')
  const [endYear, setEndYear] = useState('')

  function countOccurrences(arr, attributeName) {
    const counts = {};
  
    arr.forEach(obj => {
      const attributeValue = obj[attributeName];
      counts[attributeValue] = (counts[attributeValue] || 0) + 1;
    });
  
    const resultArray = Object.entries(counts).map(([attributeValue, occurrences]) => {
      return {ano: attributeValue, ocorrencias: occurrences}
    });
  
    return resultArray;
  }

  const search = async () => {

    // const nomePesquisador = document.getElementById('pesquisador').textContent
    const pesquisador = pesquisadoresJson.filter(pesquisadoresJson => pesquisadoresJson.nome === nomePesquisador)
    const idXmlPesquisador = pesquisador[0]['idXml']
    console.log(pesquisador)
    console.log(tipoProducao)
    console.log(idXmlPesquisador)
    console.log(startYear)
    console.log(endYear)
    // const url = `http://localhost:8080/api/v1/coAutores/detalhamento?pesquisador=${idXmlPesquisador}&tipo=${tipoProducao}&anoInicio=${startYear}&anoFim=${endYear}`

    const pesquisadorObras = pesquisadoresObrasJson.filter((pesquisador) => pesquisador['idXml'] == idXmlPesquisador)
    const pesquisadorObrasTipo =  tipoProducao != 'todos' ? pesquisadorObras[0]['artigos'].filter((obra) => obra['tipo'] == tipoProducao) : pesquisadorObras[0]['artigos']
    const obrasAno = pesquisadorObrasTipo.filter((obra) => obra['ano'] >= startYear && obra['ano'] >= startYear <= endYear)
    console.log(pesquisadorObras)
    console.log(obrasAno)

    const obrasAnoFilter = countOccurrences(obrasAno, 'ano')

    console.log(obrasAnoFilter)
    
    setResult([])
    
  }

  const startYearChange = (event) => {
    const startYear = new Date(event.target.value)
    setStartYear(startYear.getFullYear())
  }

  const endYearChange = (event) => {
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

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchBarContainer}>
        <span>
          <label htmlFor="startDate">Data inicio:</label>
          <input
            type="date"
            name="startDate"
            id="startDate"
            onChange={startYearChange}
          />
        </span>
        <span>
          <label htmlFor="endDate">Data Fim:</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            onChange={endYearChange}
          />
        </span>
        <span>
          <label htmlFor="instituto">Instituto: </label>
          <select
            name="instituto"
            id="instituto"
            onChange={e => setSelectedPesquisadorId(e.target.value)}
          >
            {institutos &&
              institutos.map(inst => {
                return <option value={inst.id}>{inst.nome}</option>
              })}
          </select>
        </span>
        <span>
          <label htmlFor="pesquisador">Pesquisador: </label>
          <select
            name="pesquisador"
            id="pesquisador"
            value={nomePesquisador}
            onChange={e => setNomePesquisador(e.target.value)}
          >
            {pesquisadores &&
              pesquisadores.map(pesquisador => {
                return (
                  <option value={pesquisador.nome}>{pesquisador.nome}</option>
                )
              })}
          </select>
        </span>
        <span>
          <label htmlFor="typeprod">Tipo Prod: </label>
          <select
            name="typeprod"
            id="typeprod"
            onChange={(e) => setTipoProducao(e.target.value)}
          >
            <option value="livro">Livro</option>
            <option value="artigo">Artigo</option>
            <option value="todos">Todos</option>
          </select>
        </span>
        <span>
          <button onClick={search}>Aplicar</button>
        </span>
      </div>
    </div>
  )
}

export default Main
