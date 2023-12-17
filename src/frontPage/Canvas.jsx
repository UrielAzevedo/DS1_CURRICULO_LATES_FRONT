import styles from "./List.module.css"
import React from "react"
import { 
  Bar,
  Pie
} from "react-chartjs-2"
import { Chart as ChartJS } from "chart.js/auto"
import { useEffect } from "react"

const List = ({
  result,
  atualizarGrafico,
  numPesquisadores,
  numInstituos,
  pesquisasTipo,
  tipoProdExport,
}) => {
  var labels = []
  var numProducoes = []

  useEffect(() => {}, [atualizarGrafico])

  result.forEach(result => {
    labels.push(result["ano"])
    numProducoes.push(result["ocorrencias"])
  })

  const data = {
    labels: labels,
    datasets: [
      {
        label: "numero producoes",
        data: numProducoes,
      },
    ],
  }

  const pieOption = {
    maintainAspectRatio: false,
    height: 800,
    width: 800,
  };

  console.log(tipoProdExport)

  if(tipoProdExport == 'livro') pesquisasTipo.artigo = 0
  if(tipoProdExport == 'artigo') pesquisasTipo.livro = 0

  const dataPie = {
    labels: ['artigo', 'livro'],
    datasets: [
      {
        label: 'Tipos Produçao',
        data: [pesquisasTipo.artigo, pesquisasTipo.livro]
      }
    ]
  }

  return (
    <>
      <div className={styles.canvasContainer}>
        <Bar data={data}></Bar>
      </div>
      <div className={styles.footerInfo}>
        <div className={styles.total}>
          <div className={styles.pieChartContainer}>
            <Pie data={dataPie} options={pieOption}></Pie>
          </div>
        </div>
        <div className={styles.institutos}>
          <p>Institutos</p>
          <div>
            <p>{numInstituos}</p>
          </div>
        </div>
        <div className={styles.pesquisadores}>
          <p>Pesquisadores</p>
          <div>
            <p>{numPesquisadores}</p>
          </div>
        </div>
        <div className={styles.grafos}>
          <p>Grafos</p>
          <div>
            <p>Grafo Info...</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default List
