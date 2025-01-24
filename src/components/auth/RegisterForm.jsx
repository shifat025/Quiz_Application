import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import Field from "../common/Field";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const submitForm = async (data) => {
    if (data.password !== data.confirm_password) {
      setError("confirm_password", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      const cleanedData = { ...data };
      if (data.role) {
        cleanedData.role = true;
      } else {
        delete cleanedData.role; // Remove role if not admin
      }

      setLoading(true);

      try {
        const response = await api.post("/user/register/", cleanedData);

        if (response.status === 201) {
          navigate("/login", {
            state: { toastMessage: "Registration successful! Please log in." },
          });
        }
      } catch (error) {
        setApiError(
          error.response?.data?.error ||
            "An error occurred while registering. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }
  };


  return (
    <form className="" onSubmit={handleSubmit(submitForm)}>
      <div className="">
        <Field label="First Name" error={errors.first_name}>
          <input
            {...register("first_name", {
              required: "First Name is required",
            })}
            type="text"
            id="first_name"
            className={`w-full px-4 py-3 rounded-lg border border-gray-300 ${
              errors.first_name ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="First Name"
          />
        </Field>
        <Field label="Last Name" error={errors.last_name}>
          <input
            {...register("last_name", {
              required: "Last Name is required",
            })}
            type="text"
            id="last_name"
            className={`w-full px-4 py-3 rounded-lg border border-gray-300 ${
              errors.last_name ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Last Name"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <input
            {...register("email", {
              required: " Email is Required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            type="email"
            id="email"
            className={`w-full px-4 py-3 rounded-lg border border-gray-300 ${
              errors.email ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="Email address"
          />
        </Field>
      </div>

      <div className="flex  gap-4">
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
            autoComplete="password"
          />
        </Field>

        <Field label="Confirm Password" error={errors.confirm_password}>
          <input
            {...register("confirm_password", {
              required: "Confirm Password is required",
            })}
            className={`w-full px-4 py-3 rounded-lg border ${
              errors.confirm_password ? "border-red-500" : "border-gray-300"
            }`}
            type="password"
            id="confirm_password"
            placeholder="Confirm Password"
            autoComplete="confirm_assword"
          />
        </Field>
      </div>
      <div className="mb-6 flex gap-2 items-center">
        <label htmlFor="role" className="flex gap-2 items-center">
          <input
            {...register("role")}
            type="checkbox"
            id="role"
            className="px-4 py-3 rounded-lg border border-gray-300"
          />
          Register as Admin
        </label>
        {errors.role && (
          <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
        )}
      </div>

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
          "Create Account"
        )}
      </button>
    </form>
  );
}
