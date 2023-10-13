import { useState, useEffect } from "react"
import styles from "./Main.module.css"

const Main = (props) => {
  const [field, setField] = useState("Todos")
  const [selectable, setSelectable] = useState(["Nome", "Acronimo"])
  const [searchItem, setSearchItem] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleFieldChange = (index) => (e) => {
    const holder = field
    setField(e.target.innerText)
    const selectableArray = selectable
    selectableArray[index] = holder
    setSelectable(selectableArray)
    setIsDropdownOpen(false)
  }

  const search = async () => {
    let url = ""
    
    switch (field) {
      case "Nome":
        url = `http://localhost:8080/api/v1/institutos/institutoNome?nome=${searchItem}`
        break
        
        case "Acronimo":
          url = `http://localhost:8080/api/v1/institutos/institutoAcronimo?acronimo=${searchItem}`
          break
          
          default:
            url = `http://localhost:8080/api/v1/institutos/institutoTodos?word=${searchItem}`
          }
          
          console.log(url)
          
          const response = await fetch(url)
      const institutos = await response.json()
      console.log(institutos)
      props.setResult(institutos)
  
  }
    useEffect(() => {
      search()
    }, [props.queried])

  return (
    <>
      <div className={styles.search_bar_container}>
        <span className={styles.txt_field}>Termo</span>
        <input
          type="text"
          name=""
          id=""
          className={styles.input}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Termo a pesquisar..."
        />
        <span className={styles.txt_field}>Campo</span>

        {/* DROP DOWN */}
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
        {/* DROP DO{styles.buscar_btn} onClick={search}>
          🔍︎
        </button>
      </div>WN */}

        <button className={styles.buscar_btn} onClick={search}>
          🔍︎
        </button>
      </div>
    </>
  )
}

export default Main
