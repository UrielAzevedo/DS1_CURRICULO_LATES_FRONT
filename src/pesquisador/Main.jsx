import { useState, useEffect } from "react"
import styles from "./Main.module.css"

const Main = (props) => {

    const [field, setField] = useState("Todos")
    const [selectable, setSelectable] = useState(["Nome", "E-mail", "Instituto"])
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
      var institutosNome
      var pesquisadoresReturn = []
      
      switch (field) {

        case "Nome":
          url = `http://localhost:8080/api/v1/pesquisadores/pesquisadorNome?nome=${searchItem}`
        break
          
        case "E-mail":
            url = `http://localhost:8080/api/v1/pesquisadores/pesquisadorEmail?email=${searchItem}`
        break
    
        case "Instituto":
            // url = `http://localhost:8080/api/v1/pesquisadores/pesquisadorInstituto?instituto=${searchItem}`


            const institutoResponse = await fetch(`http://localhost:8080/api/v1/institutos/institutoNome?nome=${searchItem}`)
            institutosNome = await institutoResponse.json()

            // url = `http://localhost:8080/api/v1/pesquisadores/pesquisadorInstituto?instituto=`
            // url = `http://localhost:8080/api/v1/pesquisadores/pesquisadorInstituto?instituto=${instituto[0]['id']}`

        break
            
        default:
        url = `http://localhost:8080/api/v1/pesquisadores/pesquisadorTodos?word=${searchItem}`

        }

        if(institutosNome !== undefined) {

          institutosNome.forEach( async (instituto, index) => {

            const response = await fetch(`http://localhost:8080/api/v1/pesquisadores/pesquisadorInstituto?instituto=${instituto.id}`)
            const pesquisador = await response.json()

            pesquisadoresReturn.push(pesquisador[0])

          })

          const responseInstitutos = await fetch('http://localhost:8080/api/v1/institutos')
          const institutos = await responseInstitutos.json()

          props.setResult(pesquisadoresReturn)
          props.setInstitutos(institutos)

        } else {
          // const institutos = await fetch('http://localhost:8080/api/v1/institutos/')
  
          const responseInstitutos = await fetch('http://localhost:8080/api/v1/institutos')
          const institutos = await responseInstitutos.json()
              
          const response = await fetch(url)
          const pesquisadores = await response.json()

          props.setResult(pesquisadores)
          props.setInstitutos(institutos)

        }
            

        
    }
      useEffect(() => {
        search()
      }, [props.queried])  


    return(

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
                <span onClick={handleFieldChange(2)}>{selectable[2]}</span>
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