import { useState } from 'react';
import styles from './List.module.css';

const List = ({ setGrafoInfo, grafoInfo }) => {
  {console.log(grafoInfo)}
  const handleSelectChange = (index, event) => {
    const updatedGrafoInfo = [...grafoInfo];
    updatedGrafoInfo[index].color = event.target.value;
    setGrafoInfo(updatedGrafoInfo);
  };

  const handleInputChange = (index, field, event) => {
    const updatedGrafoInfo = [...grafoInfo];
    updatedGrafoInfo[index][field] = parseInt(event.target.value, 10);
    setGrafoInfo(updatedGrafoInfo);
  };

  return (
    <div className={styles.listContainer}>
      <h4>Regras de plotagem(Número de Produção - NP)</h4>
      <table className={styles.graphTable}>
        <thead>
          <tr>
            <th>Vertice(cor)</th>
            <th>Valor NP(Início)</th>
            <th>Valor NP(Fim)</th>
          </tr>
        </thead>
        <tbody>
          {grafoInfo.map((e, i) => (
            <tr key={`tr${i}`}>
              <td>
                <select
                  name={`color${i}`}
                  id={`color${i}`}
                  value={e.color}
                  onChange={(event) => handleSelectChange(i, event)}
                >
                  <option value="Vermelha">Vermelha</option>
                  <option value="Roxa">Roxa</option>
                  <option value="Azul">Azul</option>
                  <option value="Verde">Verde</option>
                  <option value="Amarela">Amarela</option>
                </select>
              </td>
              <td>
                <input
                  type="number"
                  name={`start${i}`}
                  id={`start${i}`}
                  value={e.start}
                  onChange={(event) => handleInputChange(i, 'start', event)}
                />
              </td>
              <td>
                <input
                  type="number"
                  name={`end${i}`}
                  id={`end${i}`}
                  value={e.end}
                  onChange={(event) => handleInputChange(i, 'end', event)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
