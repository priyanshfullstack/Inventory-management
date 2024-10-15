import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin"; 
import Footer from './components/Footer'; 
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Selling from "./components/Selling";
import Home from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<Home />} /> 
          </Route>
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route index element={<Dashboard />} /> 
          </Route>
          <Route path="/selling" element={<PrivateRoute />}>
            <Route index element={<Selling />} /> 
          </Route>
          <Route path="/admin" element={<PrivateRoute />}>
            <Route index element={<Admin />} /> 
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
