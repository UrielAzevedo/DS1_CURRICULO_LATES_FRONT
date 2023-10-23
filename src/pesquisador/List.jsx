import { useState, useRef } from "react"
import styles from "./List.module.css"
import pesquisadores from './pesquisadores.json'
import pesquisadoresObras from './pesquisador_obras.json'

const List = ({ result, institutos, setQueried, queried }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [toAddId, setToAddId] = useState("")
    const [toAddInstituto, setToAddInstituto] = useState("")
    const [toUpdateNome, setToUpdateNome] = useState("")
    const [toUpdateEmail, setToUpdateEmail] = useState("")
    const [toUpdateInstituto, setToUpdateInstituto] = useState("")  

    const updateNameRef = useRef([])
    const updateEmailRef = useRef([])
    const updateInstitutoRef = useRef([])
  
    const changeQueried = () => {
      setQueried(!queried)
      setIsModalOpen(false)
      setIsUpdateModalOpen(false)
    }
    
    const handleAddNewClick = async () => {

      //getting researcher name

      const pesquisador = pesquisadoresObras.find(p => p.idXml == toAddId)

      if (pesquisador === undefined) return

      //check if valid institute

      const response = await fetch(`http://localhost:8080/api/v1/institutos/institutoNome?nome=${toAddInstituto}`)

      const instituto = await response.json()

      if(instituto.length == 0) return
      
      pesquisador['artigos'].forEach(artigo => {
        
        fetch(`http://localhost:8080/api/v1/obras/postObra?titulo=${artigo['titulo']}&ano=${artigo['ano']}&status[${artigo['status']}]`,       
        {
          method: "POST",
        })
        
      });
      
      fetch(`http://localhost:8080/api/v1/pesquisadores/post?idXml=${pesquisador['idXml']}&nome=${pesquisador['nome']}&idInstituto=${instituto[0]['id']}`,       
      {
        method: "POST",
      })
      .then(() => changeQueried())
    }
  
    const handleUpdateElementClick = async () => {

      const response = await fetch(`http://localhost:8080/api/v1/institutos/institutoNome?nome=${toUpdateInstituto}`)

      const instituto = await response.json()

      // console.log

      if(instituto.length == 0) return

      console.log(`http://localhost:8080/api/v1/pesquisadores/update?nome=${toUpdateNome}&instituto=${instituto[0]['id']}&email=${toUpdateEmail}`)

      fetch(
        `http://localhost:8080/api/v1/pesquisadores/update?nome=${toUpdateNome}&instituto=${instituto[0]['id']}&email=${toUpdateEmail}`,
        {
          method: "PUT",
        }
      )
      // .then(response => console.log(response))
      .then(() => changeQueried())
    }
  
    const handleDeleteElement = (e) => {

      const pesquisador = pesquisadoresObras.find(p => p.nome == e.innerText)

      if (pesquisador === undefined) return

      pesquisador['artigos'].forEach(artigo => {

        fetch(`http://localhost:8080/api/v1/obras/deleteObra?titulo=${artigo['titulo']}`,
        {
          method: "DELETE",
        })

      })

      fetch(`http://localhost:8080/api/v1/pesquisadores/delete?idXml=${pesquisador['idXml']}`,
      {
        method: "DELETE",
      })
      .then(() => changeQueried())

    }
  
    const handleUpdateModalOpen = (i) => {
      setToUpdateNome(updateNameRef.current[i].innerText)
      updateEmailRef.current[i].innerText == 'NA' ? setToUpdateEmail('') : setToUpdateEmail(updateEmailRef.current[i].innerText)
      setToUpdateInstituto(updateInstitutoRef.current[i].innerText)
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
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className={styles.newName}
                    placeholder="Novo email..."
                    value={toUpdateEmail}
                    onChange={(e) => setToUpdateEmail(e.target.value.trim())}
                  />
                </span>
                <span>
                  <label htmlFor="inst">Instituto</label>
                  <input
                    type="text"
                    className={styles.newAbv}
                    placeholder="Novo Instituto..."
                    value={toUpdateInstituto}
                    onChange={(e) => setToUpdateInstituto(e.target.value.trim())}
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
            <span className={styles.header_actionBtns}>Instituto</span>
            <span className={styles.header_actionBtns}>Acoes</span>
          </div>
          {result.length > 0 &&
            result.map((e, i) => {
              
              const instituto = institutos.find(inst => inst['id'] == e['idinstituto'])
              // console.log(e)
              return (
                <div key={`list${i}`} className={styles.list_line}>
                  <span
                    // className={styles.pesquisador_field}
                    ref={(el) => (updateNameRef.current[i] = el)}
                  >
                    {e.nome || 'NA'}
                  </span>
                  <span
                    // className={styles.pesquisador_field}
                    ref={(el) => (updateEmailRef.current[i] = el)}
                  >
                    {e.email || 'NA'}
                  </span>
                  <span
                    // className={styles.pesquisador_field}
                    ref={(el) => (updateInstitutoRef.current[i] = el)}
                  >
                    {instituto.nome || 'NA'}
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
  