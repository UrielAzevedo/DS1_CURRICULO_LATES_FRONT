import {useState, useEffect} from 'react'
import Graph from 'react-graph-vis'
import {v4} from 'uuid'
import pesquisadoresJson from './pesquisadores.json'

const Grafo = ({grafoInfo, tipoProducao, tipoVertice, instituto, selectedPesquisadores, graphTrigger}) => {
    let [graphKey, setGraphKey] = useState(v4())
    
    console.log(tipoProducao, tipoVertice, instituto, selectedPesquisadores)

    var relacaoPesquisadores = []
    var relacaoInstitutos = []
    var nodos = []
    var edges = []

    function countOccurrences(arr) {
        const hashmap = {};
        
        // Loop through the array
        for (const value of arr) {
            // If the value is not in the hashmap, initialize it with a count of 1
            // Otherwise, increment the count
            hashmap[value] = (hashmap[value] || 0) + 1;
        }
        
        // Convert the hashmap to an array of objects
        const result = Object.keys(hashmap).map((idInstituto) => ({
            idInstituto,
            ocorrencias: hashmap[idInstituto],
        }));
        
        return result;
    }

    async function getNodos() {

        
        if(tipoVertice === 'pesquisador'){
            selectedPesquisadores.forEach( async pesquisador => {
                const nomePesquisadorResponse = await fetch(`http://localhost:8080/api/v1/pesquisadores/pesquisadorIdTable?id=${pesquisador}`)
                const nomePesquisador = await nomePesquisadorResponse.json()

                const response = await fetch(`http://localhost:8080/api/v1/grafo/pesquisadoresRelacionados?nomePesquisador=${nomePesquisador[0]['nome']}&idXmlPesquisador=${nomePesquisador[0]['idxml']}`)
                const relacoesNodos = await response.json()
                const relacoesNodosMap = countOccurrences(relacoesNodos)
                relacoesNodosMap.forEach((nodo) => {
                    
                    grafoInfo.forEach((row) => {
                        if(nodo.ocorrencias >= row.start & nodo.ocorrencias <= row.end){
                            nodos.push({id: nodo.idInstituto, label: nodo.idInstituto})
                            edges.push({from: nodo.idInstituto, to: instituto})
                        }
                    })
                })
            });
        }else if (tipoVertice === 'instituto'){

            nodos.push({id: instituto, label: instituto})

            const response = await fetch(`http://localhost:8080/api/v1/grafo/institutosRelacionados?idInstituto=${instituto}`)
            const relacoes = await response.json()

            var relacoesOcorrencias = countOccurrences(relacoes)

            const map = {}
            for(let i in relacoes) {
                map[relacoes[i]] ? map[relacoes[i]]++ : map[relacoes[i]] = 1
            }

            relacoesOcorrencias.forEach((ocorrencia) => {
                
                grafoInfo.forEach((row) => {

                    if(ocorrencia.ocorrencias >= row.start & ocorrencia.ocorrencias <= row.end){
                        nodos.push({id: ocorrencia.idInstituto, label: ocorrencia.idInstituto})
                        edges.push({from: ocorrencia.idInstituto, to: instituto})
                    }
                })
            })
        }
        
    }

    getNodos()

    console.log(nodos)
    console.log(edges)

    const graph = {
        nodes: nodos,
        edges: edges
    }

    const options = {
        height: "500px"
    }

    useEffect(() => {
    }, [graphTrigger])

    return(

        <div>
            <Graph
            key={graphKey}
                graph={graph}
                options={options}
            />
        </div>
    )
}

export default Grafo