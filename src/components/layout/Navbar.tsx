import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false); // 👈 pour le menu Connexion/Inscription

  const navigate = useNavigate();

  const navItems = [
    { label: "Accueil", to: "/" },
    { label: "Annonces", to: "/annonces" },
    { label: "Publier", to: "/publier" },
  ];

  return (
    <nav className="bg-gradient-to-r from-green-600 via-yellow-400 to-blue-600 shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-white drop-shadow-md"
        >
          Immo<span className="text-yellow-300">Gabon</span>
        </Link>

        {/* Menu Desktop avec fond blanc */}
        <div className="hidden md:flex items-center space-x-8 bg-white/95 px-6 py-2 rounded-full shadow-md border border-gray-200 relative">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `font-semibold uppercase tracking-wide transition duration-300 ${
                  isActive
                    ? "text-green-600 underline underline-offset-8"
                    : "text-blue-700 hover:text-green-600"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Dropdown Auth */}
          <div className="relative">
            <button
              onClick={() => setAuthOpen(!authOpen)}
              className="flex items-center font-semibold uppercase tracking-wide text-blue-700 hover:text-green-600 transition"
            >
              Espace membre
              <ChevronDown
                size={18}
                className={`ml-1 transition-transform ${
                  authOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {authOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                <button
                  onClick={() => {
                    navigate("/connexion");
                    setAuthOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-blue-700 hover:bg-green-50 hover:text-green-600"
                >
                  Connexion
                </button>
                <button
                  onClick={() => {
                    navigate("/inscription");
                    setAuthOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-blue-700 hover:bg-green-50 hover:text-green-600"
                >
                  Inscription
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}