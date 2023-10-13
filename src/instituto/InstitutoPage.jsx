import List from './List'
import Main from './Main'
import React, { useState } from 'react';

const PesquisadorPage = () => {

    const [result, setResult] = useState([]);
    const [queried, setQueried] = useState(false)

    return(
        
        <>
            <Main setResult={setResult} queried={queried}/>
            <List result={result} setQueried={setQueried} queried={queried}/>
        </>
        
    )

}

export default PesquisadorPage