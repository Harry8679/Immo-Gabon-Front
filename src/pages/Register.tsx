import { useState, type FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { RegisterUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import type { RootState } from "../store/store";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await dispatch(RegisterUser(formData));

    if (RegisterUser.fulfilled.match(result)) {
      Swal.fire({
        title: "Inscription réussie 🎉",
        text: `Bienvenue ${result.payload.firstName} !`,
        icon: "success",
        confirmButtonColor: "#16a34a",
      }).then(() => navigate("/"));
    } else {
      Swal.fire({
        title: "Erreur 😕",
        text: result.payload || "Une erreur est survenue.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl px-8 py-10 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
          Créez votre compte
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Nom"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300 disabled:bg-gray-400"
          >
            {loading ? "Création du compte..." : "S'inscrire"}
          </button>

          {error && (
            <p className="text-center text-red-600 mt-2 font-medium">{error}</p>
          )}
        </div>
      </form>
    </div>
  );
}
