import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Accueil", to: "/" },
    { label: "Annonces", to: "/annonces" },
    { label: "Publier", to: "/publier" },
    { label: "Connexion", to: "/connexion" },
  ];

  return (
    <nav className="bg-gradient-to-r from-green-600 via-yellow-400 to-blue-600 shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide text-white">
          Immo<span className="text-yellow-300">Gabon</span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `font-semibold transition duration-300 ${
                  isActive
                    ? "text-yellow-200"
                    : "text-white hover:text-yellow-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Burger menu mobile (optionnel, à ajouter plus tard) */}
      </div>
    </nav>
  );
}