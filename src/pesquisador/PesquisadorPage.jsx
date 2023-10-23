import List from './List'
import Main from './Main'
import React, { useState } from 'react';

const PesquisadorPage = () => {

    const [result, setResult] = useState([]);
    const [institutos, setInstitutos] = useState([])
    const [queried, setQueried] = useState(false)

    return(
        
        <>
            <Main setResult={setResult} setInstitutos={setInstitutos} queried={queried}/>
            <List result={result} institutos={institutos} setQueried={setQueried} queried={queried}/>
        </>
        
    )

}

export default PesquisadorPage