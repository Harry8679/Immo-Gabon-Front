import { useState, useEffect, type FormEvent } from "react";
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react";
import { useAppDispatch } from "../store/hooks";
import { RegisterUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // États du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // États de visibilité des mots de passe
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Validation dynamique
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
  });

  // Vérifie les critères du mot de passe
  useEffect(() => {
    const { password } = formData;
    setPasswordCriteria({
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
    });
  }, [formData.password]);

  const passwordsMatch =
    formData.password.length > 0 &&
    formData.password === formData.confirmPassword;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!passwordsMatch) {
      Swal.fire({
        title: "Erreur",
        text: "Les mots de passe ne correspondent pas.",
        icon: "error",
      });
      return;
    }

    if (!Object.values(passwordCriteria).every(Boolean)) {
      Swal.fire({
        title: "Mot de passe invalide",
        text: "Votre mot de passe ne respecte pas les critères de sécurité.",
        icon: "warning",
      });
      return;
    }

    const result = await dispatch(
      RegisterUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      })
    );

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
        text: (result.payload as string) || "Une erreur est survenue.",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gradient-to-br from-green-100 via-yellow-50 to-blue-100 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md border border-gray-100 flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold text-center text-green-600 mb-8">
          Créez votre compte
        </h2>

        <div className="space-y-4 w-full">
          <InputField
            type="text"
            name="firstName"
            placeholder="Prénom"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputField
            type="text"
            name="lastName"
            placeholder="Nom"
            value={formData.lastName}
            onChange={handleChange}
          />
          <InputField
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Mot de passe */}
          <PasswordField
            label="Mot de passe"
            name="password"
            value={formData.password}
            onChange={handleChange}
            show={showPassword}
            toggle={() => setShowPassword(!showPassword)}
          />

          {/* Confirmation */}
          <PasswordField
            label="Confirmer le mot de passe"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            show={showConfirm}
            toggle={() => setShowConfirm(!showConfirm)}
            borderColor={
              passwordsMatch && formData.confirmPassword
                ? "border-green-500"
                : formData.confirmPassword
                ? "border-red-400"
                : "border-gray-300"
            }
          />

          {/* Validation dynamique */}
          <div className="mt-4 text-sm">
            <p className="font-semibold mb-2 text-gray-700">
              Le mot de passe doit contenir :
            </p>
            <ul className="space-y-1">
              <PasswordRule
                isValid={passwordCriteria.length}
                text="Au moins 8 caractères"
              />
              <PasswordRule
                isValid={passwordCriteria.lowercase}
                text="Une lettre minuscule"
              />
              <PasswordRule
                isValid={passwordCriteria.uppercase}
                text="Une lettre majuscule"
              />
              <PasswordRule
                isValid={passwordCriteria.number}
                text="Un chiffre"
              />
            </ul>

            {formData.confirmPassword.length > 0 && (
              <div className="mt-2 flex items-center space-x-2">
                {passwordsMatch ? (
                  <>
                    <CheckCircle size={18} className="text-green-600" />
                    <span className="text-green-600 text-sm">
                      Les mots de passe correspondent ✅
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle size={18} className="text-red-600" />
                    <span className="text-red-600 text-sm">
                      Les mots de passe ne correspondent pas
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Bouton visible et centré */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2.5 mt-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300 text-lg shadow-lg"
          >
            S’inscrire
          </button>
        </div>
      </form>
    </div>
  );
}

// 🔹 Champs simples
function InputField(props: any) {
  return (
    <input
      {...props}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
      required
    />
  );
}

// 🔹 Champs de mot de passe
function PasswordField({
  label,
  name,
  value,
  onChange,
  show,
  toggle,
  borderColor = "border-gray-300",
}: any) {
  return (
    <div className="relative w-full">
      <input
        type={show ? "text" : "password"}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        className={`w-full border ${borderColor} rounded-lg px-4 py-2 pr-10 focus:ring-2 focus:ring-green-500 outline-none`}
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

// 🔹 Règle du mot de passe
function PasswordRule({ isValid, text }: { isValid: boolean; text: string }) {
  return (
    <li className="flex items-center space-x-2">
      {isValid ? (
        <CheckCircle size={16} className="text-green-600" />
      ) : (
        <XCircle size={16} className="text-red-500" />
      )}
      <span className={isValid ? "text-green-600" : "text-red-500"}>{text}</span>
    </li>
  );
}
