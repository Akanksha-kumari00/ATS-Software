import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Interview from "./Pages/Interviews/InterviewPage";
import Candidates from "./Pages/Candidates/Candidates";
import Applications from "./Pages/Applications/ApplicationsPage";
import Employees from "./Pages/Employees/Employees";
import Application from "./Pages/Application";
import Jobs from "./Pages/JobPositions/JobPositionsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/application" element={<Application />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview" element={<Interview />}/>
        <Route path="/candidates" element={<Candidates/>} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/jobs" element={<Jobs/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;