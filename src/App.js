import logo from './logo.svg';
import './App.css';
import SearchBar from './SearchBar';
import { useState } from 'react';
import handleUpdateOther from './helper';

function App() {
  const [data, setData] = useState("");
  const handleUpdate = () => {
    setData("hello");
  };
  return (
    <div className="App">
   
      <SearchBar/>
    </div>
  );
}

// <input type='text' defaultValue="Hello" data-testid="inputHello" disabled/><br/>
//     <button data-testid="btn1" onClick={handleUpdate}>Update Text</button>
//     <button onClick={handleUpdateOther}>Click Me</button>
//     {data}
export default App;
