import Cookies from "js-cookie";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../api";
import useAuth from "../../hooks/useAuth";
import Field from "../common/Field";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  const submitForm = async (formData) => {
    setLoading(true);
    try {
      const response = await api.post("/user/login/", formData);
      if (response.status === 200) {
        const { tokens, user } = response.data;
        if (tokens && user) {
          const { access, refresh } = tokens;

          setAuth({ authToken: access, refreshToken: refresh, user });

          Cookies.set("authToken", access, {
            secure: true,
            sameSite: "Strict",
          });
          Cookies.set("refreshToken", refresh, {
            secure: true,
            sameSite: "Strict",
          });
          Cookies.set("user", JSON.stringify(user), {
            secure: true,
            sameSite: "Strict",
          });

          if (user.role === "admin") {
            navigate("/dashboard", {
              state: { toastMessage: "Loging successfully." },
            });
          } else {
            navigate("/", {
              state: { toastMessage: "Loging successfully." },
            });
          }
        }
      }
    } catch (error) {
      toast.error(error.response.data.error);
      setError("root.random", {
        type: "random",
        message: ` User with email ${formData.email} is not found`,
      });
    } finally {
      setLoading(false);
    }
  };

  // Prefill credentials for user login
  const handleLoginAsUser = () => {
    setValue("email", "shamim@gmail.com");
    setValue("password", "naim1234@##");
  };

  // Prefill credentials for admin login
  const handleLoginAsAdmin = () => {
    setValue("email", "kamrul@gmail.com");
    setValue("password", "naim1234@##");
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="flex justify-between mb-4">
        <button
          type="button"
          onClick={handleLoginAsUser}
          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-gray-400"
        >
          Login as User
        </button>
        <button
          type="button"
          onClick={handleLoginAsAdmin}
          className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-gray-400"
        >
          Login as Admin
        </button>
      </div>
      <Field label=" Enter your email address" error={errors.email}>
        <input
          {...register("email", {
            required: "Email is Required",
          })}
          type="text"
          id="email"
          className={`w-full px-4 py-3 rounded-lg border border-gray-300 ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          placeholder="Email address"
          autoComplete="email"
        />
      </Field>

      <Field label="Enter your Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is Required",
            minLength: {
              value: 8,
              message: "Your password must be at least 8 characters",
            },
          })}
          className={`w-full px-4 py-3 rounded-lg border border-gray-300 ${
            errors.password ? "border-red-500" : "border-gray-200"
          }`}
          type="password"
          id="password"
          placeholder="Password"
          autoComplete="current-password"
        />
      </Field>

      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-4"
        disabled={loading} // Disable button while loading
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Loading...
          </span>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
}
