import { useState } from "react"

import styles from "./List.module.css"

const List = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  const handleAddNewClick = () => {}

  const handleUpdateClick = () => {
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
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  className={styles.newName}
                  placeholder="Nome a adicionar..."
                />
              </span>
              <span>
                <label htmlFor="abv">Abreviação</label>
                <input
                  type="text"
                  className={styles.newAbv}
                  placeholder="Abreviação a adicionar..."
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
                  placeholder="Nome a editar..."
                />
              </span>
              <span>
                <label htmlFor="abv">Abreviação</label>
                <input
                  type="text"
                  className={styles.newAbv}
                  placeholder="Abreviação a editar..."
                />
              </span>
              <span>
                <button
                  className={`${styles.addBtn} ${styles.updateBtn}`}
                  onClick={handleAddNewClick}
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
        <h2>Institutos</h2>
      </span>
      <div className={styles.list_container}>
        <div className={styles.list_header}>
          <span className={styles.header_name}>Nome</span>
          <span className={styles.header_abv}>Abreviações</span>
          <span className={styles.header_actionBtns}>Ações</span>
        </div>
        <div className={styles.list_line}>
          <span className={styles.name}>Example 1</span>
          <span className={styles.abv}>Exp 1</span>
          <span className={styles.actionBtns}>
            <button className={styles.editBtn} onClick={handleUpdateClick}>
              Editar
            </button>
            <button className={styles.deleteBtn}>Deletar</button>
          </span>
        </div>
        <div className={styles.list_line}>
          <span className={styles.name}>Example 2</span>
          <span className={styles.abv}>Exp 2</span>
          <span className={styles.actionBtns}>
            <button className={styles.editBtn} onClick={handleUpdateClick}>
              Editar
            </button>
            <button className={styles.deleteBtn}>Deletar</button>
          </span>
        </div>
        <div className={styles.list_line}>
          <span className={styles.name}>Example 3</span>
          <span className={styles.abv}>Exp 3</span>
          <span className={styles.actionBtns}>
            <button className={styles.editBtn} onClick={handleUpdateClick}>
              Editar
            </button>
            <button className={styles.deleteBtn}>Deletar</button>
          </span>
        </div>
        <div className={styles.list_line}>
          <span className={styles.name}>Example 4</span>
          <span className={styles.abv}>Exp 4</span>
          <span className={styles.actionBtns}>
            <button className={styles.editBtn} onClick={handleUpdateClick}>
              Editar
            </button>
            <button className={styles.deleteBtn}>Deletar</button>
          </span>
        </div>
        <div className={styles.list_line}>
          <span className={styles.name}>Example 5</span>
          <span className={styles.abv}>Exp 5</span>
          <span className={styles.actionBtns}>
            <button className={styles.editBtn} onClick={handleUpdateClick}>
              Editar
            </button>
            <button className={styles.deleteBtn}>Deletar</button>
          </span>
        </div>
      </div>
      <div className={styles.pagControllers}>
        <button className={styles.prevBtn}>←</button>
        <button className={styles.nextBtn}>→</button>
      </div>
    </div>
  )
}

export default List
