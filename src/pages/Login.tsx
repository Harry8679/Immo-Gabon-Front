import { useState, type FormEvent } from "react";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { useAppDispatch } from "../store/hooks";
import { LoginUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// 🔹 Types de champs
interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface PasswordFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show: boolean;
  toggle: () => void;
}

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      Swal.fire({
        title: "Champs manquants",
        text: "Veuillez remplir tous les champs avant de continuer.",
        icon: "warning",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    const result = await dispatch(LoginUser(formData));

    if (LoginUser.fulfilled.match(result)) {
      Swal.fire({
        title: "Connexion réussie 🎉",
        text: `Bienvenue ${result.payload.user.firstName} !`,
        icon: "success",
        confirmButtonColor: "#16a34a",
      }).then(() => navigate("/"));
    } else {
      Swal.fire({
        title: "Erreur de connexion 😕",
        text:
          (result.payload as string) ||
          "Identifiants incorrects. Veuillez réessayer.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-100 via-yellow-50 to-blue-100 px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md border border-gray-100 flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
          Connexion à votre compte
        </h2>

        <div className="space-y-5 w-full">
          <InputField
            type="email"
            name="email"
            placeholder="Adresse email"
            value={formData.email}
            onChange={handleChange}
          />

          <PasswordField
            label="Mot de passe"
            name="password"
            value={formData.password}
            onChange={handleChange}
            show={showPassword}
            toggle={() => setShowPassword(!showPassword)}
          />

          <div className="flex justify-between text-sm mt-2">
            <div className="flex items-center space-x-2">
              {formData.password.length >= 8 ? (
                <CheckCircle className="text-green-600" size={16} />
              ) : (
                <XCircle className="text-red-500" size={16} />
              )}
              <span
                className={
                  formData.password.length >= 8
                    ? "text-green-600"
                    : "text-red-500"
                }
              >
                Au moins 8 caractères
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 mt-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300 text-lg shadow-lg"
          >
            Se connecter
          </button>

          <p className="text-sm text-gray-600 text-center mt-4">
            Pas encore de compte ?{" "}
            <span
              onClick={() => navigate("/inscription")}
              className="text-green-600 font-semibold hover:underline cursor-pointer"
            >
              Créez-en un
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

// 🔹 Composant InputField
function InputField({
  type,
  name,
  placeholder,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
      required
    />
  );
}

// 🔹 Composant PasswordField
function PasswordField({
  label,
  name,
  value,
  onChange,
  show,
  toggle,
}: PasswordFieldProps) {
  return (
    <div className="relative w-full">
      <input
        type={show ? "text" : "password"}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-green-500 outline-none"
        required
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-2.5 text-gray-500 hover:text-green-600"
      >
        {show ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
}