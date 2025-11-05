import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X, LogOut, User, Edit } from "lucide-react";
import Swal from "sweetalert2";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [mobileAuthOpen, setMobileAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  const navigate = useNavigate();

  // 🔹 Charger le user depuis le localStorage au démarrage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user || parsed);
      } catch (err) {
        console.error("Erreur de parsing du user :", err);
      }
    }
  }, []);

  // 🔹 Déconnexion
  const handleLogout = () => {
    Swal.fire({
      title: "Se déconnecter ?",
      text: "Voulez-vous vraiment quitter votre session ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Oui, déconnecter",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
      }
    });
  };

  const navItems = [
    { label: "Accueil", to: "/" },
    { label: "Annonces", to: "/annonces" },
    { label: "Publier", to: "/publier" },
  ];

  // 🔹 Récupération du premier prénom
  const firstNameOnly = user?.firstName?.split(" ")[0] || "Espace membre";

  return (
    <nav className="bg-linear-to-r from-green-600 via-yellow-400 to-blue-600 shadow-lg fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* --- Logo --- */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-white drop-shadow-md"
        >
          Immo<span className="text-yellow-300">Gabon</span>
        </Link>

        {/* --- Menu Desktop --- */}
        <div className="hidden md:flex items-center space-x-8 bg-white/95 px-6 py-2 rounded-full shadow-md border border-gray-200 relative">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `font-semibold uppercase tracking-wide transition-all duration-300 ${
                  isActive
                    ? "text-green-600 font-bold border-b-2 border-green-600 pb-1"
                    : "text-blue-700 hover:text-green-600"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* --- Auth Desktop --- */}
          <div className="relative">
            <button
              onClick={() => setAuthOpen(!authOpen)}
              className="flex items-center font-semibold uppercase tracking-wide text-blue-700 hover:text-green-600 transition"
            >
              {firstNameOnly}
              <ChevronDown
                size={18}
                className={`ml-1 transition-transform ${
                  authOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {authOpen && user && (
              <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                <button
                  onClick={() => {
                    navigate("/profil");
                    setAuthOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-blue-700 hover:bg-green-50 hover:text-green-600"
                >
                  <User size={16} className="mr-2" /> Voir mon profil
                </button>

                <button
                  onClick={() => {
                    navigate("/modifier-profil");
                    setAuthOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-blue-700 hover:bg-green-50 hover:text-green-600"
                >
                  <Edit size={16} className="mr-2" /> Modifier mon profil
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} className="mr-2" /> Se déconnecter
                </button>
              </div>
            )}

            {/* Si pas connecté */}
            {authOpen && !user && (
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

        {/* --- Bouton Menu Mobile --- */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden focus:outline-none p-2 rounded-lg transition-all"
          aria-label="Ouvrir le menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- Menu Mobile --- */}
      {open && (
        <div className="md:hidden bg-white/95 border-t border-gray-200 shadow-md rounded-b-xl">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `block px-6 py-3 font-semibold uppercase border-b border-gray-200 transition duration-300 ${
                  isActive
                    ? "text-green-600 bg-green-50 border-l-4 border-green-600"
                    : "text-blue-700 hover:bg-green-50 hover:text-green-600"
                }`
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}

          {/* --- Auth Mobile --- */}
          <div className="px-6 py-3 border-b border-gray-200">
            <button
              onClick={() => setMobileAuthOpen(!mobileAuthOpen)}
              className="flex justify-between items-center w-full text-blue-700 font-semibold uppercase hover:text-green-600"
            >
              {firstNameOnly}
              <ChevronDown
                size={18}
                className={`ml-1 transition-transform ${
                  mobileAuthOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {mobileAuthOpen && (
              <div className="mt-2 ml-4 space-y-2">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/profil");
                        setOpen(false);
                      }}
                      className="block w-full text-left text-blue-700 hover:text-green-600"
                    >
                      Voir mon profil
                    </button>
                    <button
                      onClick={() => {
                        navigate("/modifier-profil");
                        setOpen(false);
                      }}
                      className="block w-full text-left text-blue-700 hover:text-green-600"
                    >
                      Modifier mon profil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left text-red-600 hover:text-red-700"
                    >
                      Se déconnecter
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        navigate("/connexion");
                        setOpen(false);
                      }}
                      className="block w-full text-left text-blue-700 hover:text-green-600"
                    >
                      Connexion
                    </button>
                    <button
                      onClick={() => {
                        navigate("/inscription");
                        setOpen(false);
                      }}
                      className="block w-full text-left text-blue-700 hover:text-green-600"
                    >
                      Inscription
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}