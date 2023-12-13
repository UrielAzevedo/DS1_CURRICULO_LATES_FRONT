import styles from "./List.module.css"

const List = (result) => {
  return (
    <div className={styles.mainContainer}>
      <h2>Itens de produção</h2>
      <div className={styles.contentContainer}>
        <span className={styles.headerRow}>
          <h4>Tipo</h4>
          <h4>Detalhamento</h4>
        </span>
        <span className={styles.itemRow}>
            <p>La ele mil vezes</p>
            <p>Caneta azul</p>
        </span>
        <span className={styles.itemRow}>
            <p>é os guri</p>
            <p>xdxdxd</p>
        </span>
        <span className={styles.itemRow}>
            <p>tchurusbangu</p>
            <p>tchurusbagu</p>
        </span>
      </div>
      <div className={styles.navigateButtons}>
        <button className={styles.backButton}>←</button>
        <button className={styles.nextButton}>→</button>
      </div>
    </div>
  )
}

export default List
