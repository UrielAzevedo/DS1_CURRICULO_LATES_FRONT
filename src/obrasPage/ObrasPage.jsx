import {useState} from "react"

import Main from "./Main"
import List from "./List"

const ObrasPage = () => {

const [result, setResult] = useState([])

    return (
        <>
            <Main setResult={setResult}/>
            <List result={result}/>
        </>
    )
}

export default ObrasPage