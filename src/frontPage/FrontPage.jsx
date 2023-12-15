import {useState} from "react"

import Main from "./Main"
import Canvas from "./Canvas"

const ObrasPage = () => {

const [result, setResult] = useState([])

    return (
        <>
            <Main setResult={setResult}/>
            <Canvas result={result}/>
        </>
    )
}

export default ObrasPage