import { useNavigate } from "react-router-dom";
import { ArrowRight, Home, MapPin, Search } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-green-100 via-yellow-50 to-blue-100">
      {/* Section Hero */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-5xl md:text-6xl font-bold text-green-700 mb-4">
          Bienvenue sur <span className="text-blue-700">ImmoGabon</span>
        </h1>
        <p className="text-gray-700 text-lg md:text-xl max-w-2xl mb-8">
          La plateforme moderne pour trouver ou publier des annonces immobilières partout au Gabon 🇬🇦
        </p>

        <div className="flex items-center bg-white shadow-lg rounded-full overflow-hidden max-w-md w-full border border-gray-200">
          <input
            type="text"
            placeholder="Recherchez une ville, un type de bien..."
            className="flex-1 px-4 py-3 outline-none text-gray-600"
          />
          <button className="bg-green-600 text-white px-6 py-3 hover:bg-green-700 transition">
            <Search size={20} />
          </button>
        </div>

        <button
          onClick={() => navigate("/annonces")}
          className="mt-10 bg-green-600 text-white px-8 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-green-700 transition shadow-lg"
        >
          <span>Voir les annonces</span>
          <ArrowRight size={20} />
        </button>
      </section>

      {/* Section Avantages */}
      <section className="py-20 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Pourquoi choisir <span className="text-green-600">ImmoGabon</span> ?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          <div className="bg-green-50 border border-green-100 p-6 rounded-xl shadow-sm text-center">
            <Home className="text-green-600 mx-auto mb-3" size={40} />
            <h3 className="text-lg font-semibold mb-2">Des annonces vérifiées</h3>
            <p className="text-gray-600 text-sm">
              Toutes les annonces sont examinées pour garantir des offres réelles et fiables.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl shadow-sm text-center">
            <MapPin className="text-blue-600 mx-auto mb-3" size={40} />
            <h3 className="text-lg font-semibold mb-2">Partout au Gabon</h3>
            <p className="text-gray-600 text-sm">
              Libreville, Port-Gentil, Franceville… Trouvez des biens dans toutes les grandes villes.
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-100 p-6 rounded-xl shadow-sm text-center">
            <ArrowRight className="text-yellow-600 mx-auto mb-3" size={40} />
            <h3 className="text-lg font-semibold mb-2">Facile à utiliser</h3>
            <p className="text-gray-600 text-sm">
              Publiez ou cherchez un bien immobilier en quelques clics depuis votre ordinateur ou téléphone.
            </p>
          </div>
        </div>
      </section>

      {/* Section Appel à l’action */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Prêt à trouver votre nouveau logement ?</h2>
        <p className="mb-6 text-lg">
          Explorez des centaines d’annonces de maisons, appartements et terrains dès maintenant.
        </p>
        <button
          onClick={() => navigate("/annonces")}
          className="bg-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Voir les annonces
        </button>
      </section>
    </div>
  );
};

export default Home;