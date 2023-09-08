import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Main from './institute/Main';
import List from './institute/List';
import './index.css';

const App = () => {
  const [result, setResult] = useState([]);
  const [queried, setQueried] = useState(false)

  return (
    <React.StrictMode>
      <Main setResult={setResult} queried={queried}/>
      <List result={result} setQueried={setQueried} queried={queried}/>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);