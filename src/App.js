import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage/HomePage';
import ScanDetails from './ScanDetails/ScanDetails';
import { useState } from 'react';

function App() {
  const [email,setEmail]=useState('');
  const handleEmail=(email)=>{
    setEmail(email);
  }
  // useEffect(()=>{
  //   console.log(email);
  // },[email]);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage handleEmail={handleEmail}/>} />
        <Route path='/scan-details' element={<ScanDetails email={email}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
