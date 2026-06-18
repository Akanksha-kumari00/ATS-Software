import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Interview from "./Pages/Interviews/InterviewPage";
import Candidates from "./Pages/Candidates/Candidates";
import Application from "./Pages/Application";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview" element={<Interview />}/>
        <Route path="/candidates" element={<Candidates/>} />
        <Route path="/application" element={<Application />} />
 
      </Routes>
    </BrowserRouter>
  );
}

export default App;