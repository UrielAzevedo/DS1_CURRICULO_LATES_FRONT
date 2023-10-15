import { useState, useRef } from "react"
import styles from "./List.module.css"
import pesquisadores from './pesquisadores.json'
import pesquisadoresObras from './pesquisador_obras.json'
// const pesquisadores = require('pesquisadores.json')

// import { useState, useRef } from "react"

const List = ({ result, setQueried, queried }) => {
    // console.log(pesquisadores)
    // const pesquisadores = require('pesquisadores.json')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [toUpdateNome, setToUpdateNome] = useState("")
    const [toUpdateAcr, setToUpdateAcr] = useState("")
    const [toUpdateNewNome, setToUpdateNewNome] = useState("")
    const [toAddId, setToAddId] = useState("")
    const [toAddInstituto, setToAddInstituto] = useState("")
    const [toAdd, setToAdd] = useState("")
  
    const updateNameRef = useRef([])
    const updateAcrRef = useRef([])
  
    const changeQueried = () => {
      setQueried(!queried)
      setIsModalOpen(false)
      setIsUpdateModalOpen(false)
    }
    
    const handleAddNewClick = async () => {

      //getting researcher name

      const pesquisador = pesquisadores.find(p => p.idXml == toAddId)

      if (pesquisador === undefined) return

      //check if valid institute

      const response = await fetch(`http://localhost:8080/api/v1/institutos/institutoNome?nome=${toAddInstituto}`)

      const data = await response.json()

      if(data.length == 0) return

      console.log(pesquisadoresObras[0]['artigos'])



      // const data = await response.json()
      // console.log(data)
      
      // .then(response => {
        
      //   if(response.status == 200){
      //     console.log(response.json())
      //   }
      
      
      // })

      // fetch(
      //   `http://localhost:8080/api/v1/pesquisador/post?id=${toAddId}&instituto=${toAddInstituto}`,
      //   {
      //     method: "POST",
      //   }
      // ).then(() => changeQueried())
      // isModalOpen = !isModalOpen
    }
  
    const handleUpdateElementClick = () => {
      fetch(
        `http://localhost:8080/api/v1/institutos/update?newNome=${toUpdateNewNome}&nome=${toUpdateNome}&acronimo=${toUpdateAcr}`,
        {
          method: "PUT",
        }
      )
      // .then(response => console.log(response))
      .then(() => changeQueried())
    }
  
    const handleDeleteElement = (e) => {
      fetch(`http://localhost:8080/api/v1/institutos/delete?nome=${e.innerText}`, {
        method: "DELETE",
      })
      // .then(response => console.log(response))
      .then(() => changeQueried())
    }
  
    const handleUpdateModalOpen = (i) => {
      // console.log(updateNameRef)
      setToUpdateNome(updateNameRef.current[i].innerText)
      setToUpdateNewNome(updateNameRef.current[i].innerText)
      setToUpdateAcr(updateAcrRef.current[i].innerText)
      setIsUpdateModalOpen(true)
    }
  
    return (
      <div className={styles.main_container}>
        {isModalOpen && (
          <div className={styles.addModalContainer}>
            <div className={styles.addModal}>
              <button
                className={styles.closeModal}
                onClick={() => setIsModalOpen(false)}
              >
                x
              </button>
              <div className={styles.interiorAddModalContainer}>
                <span>
                  <label htmlFor="id">Informe o ID</label>
                  <input
                    type="text"
                    className={styles.newName}
                    placeholder="ID"
                    value={toAddId}
                    onChange={(e) => setToAddId(e.target.value.trim())}
                  />
                </span>
                <span>
                  <label htmlFor="instituto">Instituto</label>
                  <input
                    type="text"
                    className={styles.newAbv}
                    placeholder="Abreviação a adicionar..."
                    value={toAddInstituto}
                    onChange={(e) => setToAddInstituto(e.target.value.trim())}
                  />
                </span>
                <span>
                  <button className={styles.addBtn} onClick={handleAddNewClick}>
                    Adicionar
                  </button>
                </span>
              </div>
            </div>
          </div>
        )}
        {isUpdateModalOpen && (
          <div className={styles.addModalContainer}>
            <div className={styles.addModal}>
              <button
                className={styles.closeModal}
                onClick={() => setIsUpdateModalOpen(false)}
              >
                x
              </button>
              <div className={styles.interiorAddModalContainer}>
                <span>
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    className={styles.newName}
                    placeholder="Novo nome..."
                    value={toUpdateNewNome}
                    onChange={(e) => setToUpdateNewNome(e.target.value.trim())}
                  />
                </span>
                <span>
                  <label htmlFor="abv">Abreviação</label>
                  <input
                    type="text"
                    className={styles.newAbv}
                    placeholder="Novo acrônimo..."
                    value={toUpdateAcr}
                    onChange={(e) => setToUpdateAcr(e.target.value.trim())}
                  />
                </span>
                <span>
                  <button
                    className={`${styles.addBtn} ${styles.updateBtn}`}
                    onClick={handleUpdateElementClick}
                  >
                    Atualizar
                  </button>
                </span>
              </div>
            </div>
          </div>
        )}
        <span className={styles.head_container}>
          <button className={styles.addBtn} onClick={() => setIsModalOpen(true)}>
            Adicionar
          </button>
          <h2>Pesquisadores</h2>
        </span>
        <div className={styles.list_container}>
          <div className={styles.list_header}>
            <span className={styles.header_name}>Nome</span>
            <span className={styles.header_abv}>E-mail</span>
            <span className={styles.header_actionBtns}>Institutos</span>
          </div>
          {result.length > 0 &&
            result.map((e, i) => {
              return (
                <div key={`list${i}`} className={styles.list_line}>
                  <span
                    className={styles.name}
                    ref={(el) => (updateNameRef.current[i] = el)}
                  >
                    {e.nome}
                  </span>
                  <span
                    className={styles.abv}
                    ref={(el) => (updateAcrRef.current[i] = el)}
                  >
                    {e.acronimo}
                  </span>
                  <span className={styles.actionBtns}>
                    <button
                      className={styles.editBtn}
                      onClick={() => handleUpdateModalOpen(i)}
                    >
                      Editar
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() =>
                        handleDeleteElement(updateNameRef.current[i])
                      }
                    >
                      Deletar
                    </button>
                  </span>
                </div>
              )
            })}
        </div>
        <div className={styles.pagControllers}>
          <button className={styles.prevBtn}>←</button>
          <button className={styles.nextBtn}>→</button>
        </div>
      </div>
    )
  }
  
  export default List
  