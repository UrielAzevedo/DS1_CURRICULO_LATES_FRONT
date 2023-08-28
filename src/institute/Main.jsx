import { useState} from "react"
import styles from "./Main.module.css"

const Main = () => {
  const [field, setField] = useState("Todos")
  const [selectable, setSelectable] = useState(["Nome", "Acronimo"])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleFieldChange = (index) => (e) => {
    const holder = field
    setField(e.target.innerText)
    const selectableArray = selectable
    selectableArray[index] = holder
    setSelectable(selectableArray)
    setIsDropdownOpen(false)
  }

  return (
    <>
    <div className={styles.search_bar_container}>
      <span className={styles.txt_field}>Termo</span>
      <input
        type="text"
        name=""
        id=""
        className={styles.input}
        placeholder="Termo a pesquisar..."
        />
      <span className={styles.txt_field}>Campo</span>
      <div className={styles.drop_down_container}>
        <span
          id={styles["todos"]}
          className={styles.txt_field}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
          {field}
        </span>
        {isDropdownOpen && (
            <div className={styles.drop_down}>
            {/* <span>Todos</span> */}
            <span onClick={handleFieldChange(0)}>{selectable[0]}</span>
            <span onClick={handleFieldChange(1)}>{selectable[1]}</span>
          </div>
        )}
      </div>
    </div>
        </>
  )
}

export default Main
