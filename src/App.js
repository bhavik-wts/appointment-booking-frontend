import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Appointments from "./pages/Appointments";
import AdminLogin from "./pages/AdminLogin";
import "../src/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<Appointments />} />
      </Routes>
    </Router>
  );
}

export default App;
