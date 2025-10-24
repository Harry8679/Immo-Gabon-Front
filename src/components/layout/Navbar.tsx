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
        <Link to="/" className="text-2xl font-bold tracking-wide text-white drop-shadow-lg">
          Immo<span className="text-yellow-300">Gabon</span>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-8 bg-black/10 px-4 py-2 rounded-2xl backdrop-blur-sm">
  {navItems.map((item) => (
    <NavLink
      key={item.to}
      to={item.to}
      className={({ isActive }) =>
        `text-white font-medium uppercase tracking-wide hover:text-yellow-200 transition-all duration-300 ${
          isActive ? "text-yellow-100 underline underline-offset-8" : ""
        }`
      }
    >
      {item.label}
    </NavLink>
  ))}
</div>

      </div>
    </nav>
  );
}