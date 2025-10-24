import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react'; 
import { Manu, X } from 'lucide-react';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const navItems = [
        { label: "Accueil", to: "/" },
        { label: "Annonces", to: "/annonces" },
        { label: "Publier", to: "/publier" },
        { label: "Connexion", to: "/connexion" },
    ];

    return (
        <nav className="bg-gradient-to-r from-green-600 via-yellow-400 to-blue-600 text-white shadow-lg fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                Test
            </div>
        </nav>
    );
}