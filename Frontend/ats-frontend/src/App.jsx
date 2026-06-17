import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Interview from "./Pages/Interview";
import Candidates from "./Pages/Candidates/Candidates";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview" element={<Interview />}/>
        <Route path="/candidates" element={<Candidates/>} />
 
      </Routes>
    </BrowserRouter>
  );
}

export default App;