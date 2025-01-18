import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { api } from "../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    }
    if (data.password !== data.confirm_password) {
      setError("confirm_password", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      const cleanedData = { ...data };
      delete cleanedData.confirm_password; // Remove confirm_password
      // Handle role assignment
      if (data.role) {
        cleanedData.role = "admin";
      } else {
        delete cleanedData.role; // Remove role if not admin
      }

      setLoading(true);
      
      try{
        
        const response = await api.post("auth/register", cleanedData)
        
        if(response.status === 201){
          alert("Account created successfully!");
          navigate("/login")
        }
      }
      catch(error){
        setApiError(
          error.response?.data?.message ||
            "An error occurred while registering. Please try again."
        );
      } finally {
        setLoading(false);
      }

    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form className="" onSubmit={handleSubmit(submitForm)}>
      <div className="">
        <Field label="Full Name" error={errors.full_name}>
          <input
            {...register("full_name", {
              required: "Full Name is required",
            })}
            type="text"
            id="full_name"
            className={`w-full px-4 py-3 rounded-lg border border-gray-300 ${
              errors.full_name ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="John Doe"
          />
        </Field>
        <Field label="Email" error={errors.username}>
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
        className="w-full bg-primary text-white py-3 rounded-lg mb-2"
      >
        Create Account
      </button>
    </form>
  );
}
