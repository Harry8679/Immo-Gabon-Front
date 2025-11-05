import { useState } from "react";
import { MapPin, Home, DollarSign, Search, ChevronLeft, ChevronRight } from "lucide-react";

// --- Données simulées ---
const annoncesData = [
  {
    id: 1,
    titre: "Appartement moderne à Libreville",
    ville: "Libreville",
    prix: 350000,
    unite: "/mois",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    type: "Appartement",
    chambres: 3,
    surface: 110,
  },
  {
    id: 2,
    titre: "Maison familiale à Owendo",
    ville: "Owendo",
    prix: 12000000,
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800",
    type: "Maison",
    chambres: 5,
    surface: 250,
  },
  {
    id: 3,
    titre: "Terrain à vendre à Franceville",
    ville: "Franceville",
    prix: 8500000,
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800",
    type: "Terrain",
    chambres: 0,
    surface: 500,
  },
  {
    id: 4,
    titre: "Studio meublé à Port-Gentil",
    ville: "Port-Gentil",
    prix: 200000,
    unite: "/mois",
    image: "https://images.unsplash.com/photo-1599423300746-b62533397364?w=800",
    type: "Studio",
    chambres: 1,
    surface: 35,
  },
  {
    id: 5,
    titre: "Villa de luxe à Akanda",
    ville: "Akanda",
    prix: 45000000,
    image: "https://images.unsplash.com/photo-1600585154154-48e3e3f1f3b7?w=800",
    type: "Maison",
    chambres: 6,
    surface: 400,
  },
  {
    id: 6,
    titre: "Appartement cosy à Franceville",
    ville: "Franceville",
    prix: 500000,
    unite: "/mois",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800",
    type: "Appartement",
    chambres: 2,
    surface: 90,
  },
  {
    id: 7,
    titre: "Terrain résidentiel à Owendo",
    ville: "Owendo",
    prix: 6000000,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    type: "Terrain",
    chambres: 0,
    surface: 800,
  },
  {
    id: 8,
    titre: "Maison moderne à Libreville",
    ville: "Libreville",
    prix: 18000000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    type: "Maison",
    chambres: 4,
    surface: 200,
  },
  {
    id: 9,
    titre: "Studio chic à Franceville",
    ville: "Franceville",
    prix: 250000,
    unite: "/mois",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    type: "Studio",
    chambres: 1,
    surface: 30,
  },
];

// --- Composant principal ---
const Annonces = () => {
  // États de recherche
  const [ville, setVille] = useState("");
  const [type, setType] = useState("");
  const [prixMin, setPrixMin] = useState<number | "">("");
  const [prixMax, setPrixMax] = useState<number | "">("");
  const [chambres, setChambres] = useState<number | "">("");

  // Pagination simulée
  const [page, setPage] = useState(1);
  const annoncesParPage = 6;

  // --- Filtrage dynamique ---
  const annoncesFiltrees = annoncesData.filter((a) => {
    return (
      (ville === "" || a.ville.toLowerCase().includes(ville.toLowerCase())) &&
      (type === "" || a.type === type) &&
      (prixMin === "" || a.prix >= prixMin) &&
      (prixMax === "" || a.prix <= prixMax) &&
      (chambres === "" || a.chambres >= chambres)
    );
  });

  // Pagination
  const indexOfLast = page * annoncesParPage;
  const indexOfFirst = indexOfLast - annoncesParPage;
  const annoncesAffichees = annoncesFiltrees.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(annoncesFiltrees.length / annoncesParPage);

  const changerPage = (direction: "prev" | "next") => {
    if (direction === "prev" && page > 1) setPage(page - 1);
    if (direction === "next" && page < totalPages) setPage(page + 1);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-green-50 px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-10">
        Nos annonces immobilières
      </h1>

      {/* Barre de recherche */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-12 max-w-6xl mx-auto border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <input
            type="text"
            placeholder="Ville"
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Type</option>
            <option value="Appartement">Appartement</option>
            <option value="Maison">Maison</option>
            <option value="Studio">Studio</option>
            <option value="Terrain">Terrain</option>
          </select>

          <input
            type="number"
            placeholder="Prix min"
            value={prixMin}
            onChange={(e) => setPrixMin(e.target.value === "" ? "" : +e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            placeholder="Prix max"
            value={prixMax}
            onChange={(e) => setPrixMax(e.target.value === "" ? "" : +e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="number"
            placeholder="Min. chambres"
            value={chambres}
            onChange={(e) => setChambres(e.target.value === "" ? "" : +e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
          />

          <button className="flex items-center justify-center bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
            <Search size={18} className="mr-2" />
            Rechercher
          </button>
        </div>
      </div>

      {/* Liste d'annonces */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {annoncesAffichees.length > 0 ? (
          annoncesAffichees.map((annonce) => (
            <div
              key={annonce.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            >
              <img
                src={annonce.image}
                alt={annonce.titre}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {annonce.titre}
                </h2>

                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin size={16} className="mr-2 text-green-600" />
                  {annonce.ville}
                </div>

                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <Home size={16} className="mr-2 text-blue-600" />
                  {annonce.type}
                </div>

                <div className="flex items-center text-green-700 font-bold mb-4">
                  <DollarSign size={18} className="mr-1" />{" "}
                  {annonce.prix.toLocaleString()} FCFA {annonce.unite || ""}
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  <strong>{annonce.chambres}</strong> chambre(s) —{" "}
                  <strong>{annonce.surface} m²</strong>
                </p>

                <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
                  Voir plus
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            Aucune annonce ne correspond à vos critères.
          </p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-10">
          <button
            onClick={() => changerPage("prev")}
            disabled={page === 1}
            className="px-4 py-2 bg-white border rounded-lg shadow hover:bg-gray-50 disabled:opacity-40 flex items-center"
          >
            <ChevronLeft size={18} />
            Précédent
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => changerPage("next")}
            disabled={page === totalPages}
            className="px-4 py-2 bg-white border rounded-lg shadow hover:bg-gray-50 disabled:opacity-40 flex items-center"
          >
            Suivant
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Annonces;