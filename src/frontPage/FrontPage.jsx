import {useState} from "react"

import Main from "./Main"
import Canvas from "./Canvas"


const ObrasPage = () => {

    const [result, setResult] = useState([])
    const [atulizarGrafico, setAtulizarGrafico] = useState(false)
    const [numPesquisadores, setNumPesquisadores] = useState(0)
    const [numInstituos, setNumInstituos] = useState(0)
    const [pesquisasTipo, setPesquisasTipo] = useState({})
    const [tipoProdExport, setTipoProdExport] = useState('')

    return (
        <>
            <Main setResult={setResult} setAtulizarGrafico={setAtulizarGrafico} atulizarGrafico={atulizarGrafico} setNumInstituos={setNumInstituos} setNumPesquisadores={setNumPesquisadores} setPesquisasTipo={setPesquisasTipo} setTipoProdExport={setTipoProdExport}/>
            <Canvas result={result} atulizarGrafico={atulizarGrafico} numPesquisadores={numPesquisadores} numInstituos={numInstituos} pesquisasTipo={pesquisasTipo} tipoProdExport={tipoProdExport}/>
        </>
    )
}

export default ObrasPage