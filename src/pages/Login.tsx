import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import masajidLogo from "../assets/masajid_logo_circle.png";
import Input from "../components/Input/Input";
import PasswordInput from "../components/Input/PasswordInput";
import Button from "../components/Input/Button";
import { handleLogin } from "../services/AuthService";

export function PageLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ username: "", password: "" });

  const showError = (errorType: string, message: string) => {
    if (errorType === "username") {
      setFieldErrors((prev) => ({ ...prev, username: message }));
    } else if (errorType === "password") {
      setFieldErrors((prev) => ({ ...prev, password: message }));
    } else {
      setGeneralError(message);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setGeneralError("");
    setFieldErrors({ username: "", password: "" });

    if (!formData.username || !formData.password) {
      showError("general", "Username dan password wajib diisi");
      return;
    }

    setLoading(true);
    const [status, response] = await handleLogin(formData.username, formData.password);
    setLoading(false);

    if (!status) {
      const errorMsg = String(response?.message ?? "Login gagal");
      const message = response?.message as string;
      let errorType = "general";
      if (message?.toLowerCase().includes("username") || message?.toLowerCase().includes("email")) {
        errorType = "username";
      } else if (message?.toLowerCase().includes("password")) {
        errorType = "password";
      }
      showError(errorType, errorMsg);
      return;
    }

    navigate("/home", { replace: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error pada field yang sedang diubah
    if (name === "username" || name === "password") {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (generalError) setGeneralError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b3d2e] via-[#1a6b4a] to-[#1f8a5e] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-8 shadow-2xl"
        >
          {/* Logo & Greeting */}
          <div className="text-center mb-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img src={masajidLogo} alt="Masajid" className="h-20 mx-auto mb-4 cursor-pointer transition hover:opacity-90" />
            </button>
            <p className="text-sm text-teal-700">
              Assalamualaikum warahmatullahi wabarakatuh
            </p>
            <h1 className="text-xl font-bold mt-2 text-teal-800">
              Ahlan Wa Sahlan,
            </h1>
            <p className="text-teal-700">Silahkan Login...</p>
          </div>

          {/* General Error Banner */}
          {generalError && (
            <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {generalError}
            </div>
          )}

          {/* Username / Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username atau Email
            </label>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username atau Email"
            />
            {fieldErrors.username && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {fieldErrors.username}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password"
            />
            {fieldErrors.password && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {fieldErrors.password}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button disabled={loading}>
            {loading ? "Memproses..." : "Masuk"}
          </Button>

          {/* Forgot Password */}
          <div className="mt-6 text-center">
            <button
              type="button"
              className="text-sm text-gray-500 hover:text-[#0b3d2e] transition-colors"
            >
              Lupa password?
            </button>
          </div>

          {/* Register */}
          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <span className="text-sm text-gray-500">Belum punya akun? </span>
            <Link
              to="/register"
              className="text-sm font-semibold text-[#0b3d2e] hover:underline"
            >
              Daftar
            </Link>
          </div>
        </form>

        <p className="text-center text-white/50 text-xs mt-8">
          © 2026 Masajid. All rights reserved.
        </p>
      </div>
    </div>
  );
}