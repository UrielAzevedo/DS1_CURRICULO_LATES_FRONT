import styles from "./List.module.css"

const List = ({result}) => {
  console.log(result)
  return (
    <div className={styles.mainContainer}>
      <h2>Itens de produção</h2>
      <div className={styles.contentContainer}>
        {result &&
          result.map(e => {
            return (
              <span className={styles.itemRow}>
                <p>{e.tipo}</p>
                <p>{e.detalhamento}</p>
              </span>
            )
          })}
      </div>
      <div className={styles.navigateButtons}>
        <button className={styles.backButton}>←</button>
        <button className={styles.nextButton}>→</button>
      </div>
    </div>
  )
}

export default List
