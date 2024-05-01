import React from "react";
import Admin from "./components/admin";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Users from "./components/user";
function App() {
  return (
     <Router>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
    </Router>
  );
}

export default App;
