import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/layout/Navbar";
import Annonces from "./pages/Annonces";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar /> {/* ✅ Doit être à l’intérieur du Router */}

        <div className="pt-20"> {/* Ajout d’un padding pour compenser la navbar fixe */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/annonces" element={<Annonces />} />
            <Route path="/publier" element={<div>Publier bientôt disponible</div>} />
            <Route path="/connexion" element={<Login />} />
            <Route path="/inscription" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;