import { MapPin, Home, DollarSign } from "lucide-react";

const annonces = [
  {
    id: 1,
    titre: "Appartement moderne à Libreville",
    ville: "Libreville",
    prix: "350 000 FCFA / mois",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    type: "Appartement",
  },
  {
    id: 2,
    titre: "Maison familiale à Owendo",
    ville: "Owendo",
    prix: "12 000 000 FCFA",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800",
    type: "Maison",
  },
  {
    id: 3,
    titre: "Terrain à vendre à Franceville",
    ville: "Franceville",
    prix: "8 500 000 FCFA",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800",
    type: "Terrain",
  },
  {
    id: 4,
    titre: "Studio meublé à Port-Gentil",
    ville: "Port-Gentil",
    prix: "200 000 FCFA / mois",
    image: "https://images.unsplash.com/photo-1600585154203-6e4a3c1f87d5?w=800",
    type: "Studio",
  },
];

const Annonces = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-6 py-16">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-10">
        Nos annonces immobilières
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {annonces.map((annonce) => (
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
                <DollarSign size={18} className="mr-1" /> {annonce.prix}
              </div>

              <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
                Voir plus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Annonces;