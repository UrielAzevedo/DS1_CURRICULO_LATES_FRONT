import { useState, useEffect } from "react"

import styles from "./Main.module.css"
import pesquisadoresJson from "./pesquisadores.json"
import pesquisadoresObrasJson from "./pesquisador_obras.json"

const Main = ({
  setResult,
  setAtulizarGrafico,
  atualizarGrafico,
  setNumPesquisadores,
  setNumInstituos,
  setPesquisasTipo,
  setTipoProdExport,
}) => {
  const [institutos, setInstitutos] = useState([])
  const [pesquisadores, setPesquisadores] = useState([])
  const [selectedPesquisadorId, setSelectedPesquisadorId] = useState(0)
  const [nomePesquisador, setNomePesquisador] = useState("a")
  const [startYear, setStartYear] = useState("")
  const [tipoProducao, setTipoProducao] = useState("")
  const [endYear, setEndYear] = useState("")

  function countOccurrences(arr, attributeName) {
    const counts = {}

    arr.forEach(obj => {
      const attributeValue = obj[attributeName]
      counts[attributeValue] = (counts[attributeValue] || 0) + 1
    })

    const resultArray = Object.entries(counts).map(
      ([attributeValue, occurrences]) => {
        return { ano: attributeValue, ocorrencias: occurrences }
      }
    )

    return resultArray
  }

  const search = async () => {
    
    var obrasAnoResult = []
    var obrasTipo = {livro: 0, artigo: 0}

    // const nomePesquisador = document.getElementById('pesquisador').textContent
    if (nomePesquisador != "todos") {
      const pesquisador = pesquisadoresJson.filter(
        pesquisadoresJson => pesquisadoresJson.nome === nomePesquisador
      )
      const idXmlPesquisador = pesquisador[0]["idXml"]
      // const url = `http://localhost:8080/api/v1/coAutores/detalhamento?pesquisador=${idXmlPesquisador}&tipo=${tipoProducao}&anoInicio=${startYear}&anoFim=${endYear}`

      const pesquisadorObras = pesquisadoresObrasJson.filter(
        pesquisador => pesquisador["idXml"] == idXmlPesquisador
      )

      const artigosPesquisador = pesquisadorObras[0]['artigos'].filter(obra => {
        return obra['tipo'] == 'artigo'
      })

      const livrosPesquisador = pesquisadorObras[0]['artigos'].filter(obra => {
        return obra['tipo'] == 'livro'
      })

      obrasTipo.artigo = obrasTipo.artigo + artigosPesquisador.length
      obrasTipo.livro  = obrasTipo.livro  + livrosPesquisador.length

      const pesquisadorObrasTipo =
        tipoProducao != "todos"
          ? pesquisadorObras[0]["artigos"].filter(
              obra => obra["tipo"] == tipoProducao
            )
          : pesquisadorObras[0]["artigos"]
      const obrasAno = pesquisadorObrasTipo.filter(
        obra => obra["ano"] >= startYear && obra["ano"] >= startYear <= endYear
      )

      const obrasAnoFilter = countOccurrences(obrasAno, "ano")
      setResult(obrasAnoFilter)
      setPesquisasTipo(obrasTipo)
      setNumPesquisadores(1)
      setNumInstituos(1)
      setTipoProdExport(tipoProducao)
      setAtulizarGrafico(!atualizarGrafico)

    } else {
      pesquisadores.forEach(pesquisadorOption => {
        // const pesquisador = pesquisadoresJson.filter(
        //   pesquisadoresJson =>
        //     pesquisadoresJson.nome === pesquisadorOption["nome"]
        // )
        // if (!pesquisador[0]) {
        //   return
        // }
        const idXmlPesquisador = pesquisadorOption['idxml']

        const pesquisadorObras = pesquisadoresObrasJson.filter(
          pesquisador => pesquisador["idXml"] == idXmlPesquisador
        )

        const artigosPesquisador = pesquisadorObras[0]['artigos'].filter(obra => {
          return obra['tipo'] == 'artigo'
        })

        const livrosPesquisador = pesquisadorObras[0]['artigos'].filter(obra => {
          return obra['tipo'] == 'livro'
        })

        obrasTipo.artigo = obrasTipo.artigo + artigosPesquisador.length
        obrasTipo.livro  = obrasTipo.livro  + livrosPesquisador.length
        
        const pesquisadorObrasTipo =
        tipoProducao != "todos"
        ? pesquisadorObras[0]["artigos"].filter(
          obra => obra["tipo"] == tipoProducao
          )
          : pesquisadorObras[0]["artigos"]
          const obrasAno = pesquisadorObrasTipo.filter(
            obra =>
            obra["ano"] >= startYear && obra["ano"] <= endYear
            )
            
        // console.log(pesquisadorObrasTipo)
            

        const obrasAnoFilter = countOccurrences(obrasAno, "ano")
            
        obrasAnoFilter.forEach(obrasAnoFilter => {
          obrasAnoResult.push(obrasAnoFilter)
        })

        obrasAnoResult.sort((a, b) => a.ano - b.ano);

        setResult(obrasAnoResult)
        setNumPesquisadores(pesquisadores.length)
        setPesquisasTipo(obrasTipo)
        setTipoProdExport(tipoProducao)
        setAtulizarGrafico(!atualizarGrafico)

        if(selectedPesquisadorId == 'todos'){
          setNumInstituos(institutos.length)
        }else{
          setNumInstituos(1)
        }
      })

    }
  }

  const startYearChange = event => {
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
      var url = ""

      if (selectedPesquisadorId != "todos") {
        url = `http://localhost:8080/api/v1/pesquisadores/pesquisadorInstituto?instituto=${selectedPesquisadorId}`
      } else {
        url = `http://localhost:8080/api/v1/pesquisadores/`
      }
      const response = await fetch(url)
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
            <option value="todos">Todos</option>
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
            <option value="todos">todos</option>
          </select>
        </span>
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
          <button onClick={search}>Aplicar</button>
        </span>
      </div>
    </div>
  )
}

export default Main
