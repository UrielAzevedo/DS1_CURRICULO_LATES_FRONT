import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// import Main from './pesquisador/Main';
// import List from './pesquisador/List';
// import PesquisadorPage from './instituto/InstitutoPage'
import NavBar from './NavBar';
// import { BrowserRouter } from 'react-router-dom';
import './index.css';

const App = () => {
  // const [result, setResult] = useState([]);
  // const [queried, setQueried] = useState(false)

  return (
      <>
    {/* <React.StrictMode> */}
      <NavBar />
      {/* <Main setResult={setResult} queried={queried}/>
      <List result={result} setQueried={setQueried} queried={queried}/> */}
      {/* <PesquisadorPage/> */}
    {/* </React.StrictMode> */}
      </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);