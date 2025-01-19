import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import useAuth from "../../hooks/useAuth";
import Field from "../common/Field";

export default function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    try {
      const response = await api.post("/auth/login", formData);

      if (response.status === 200) {
        const { tokens, user } = response.data.data;
        if (tokens && user) {
          const { accessToken, refreshToken } = tokens;
          
          setAuth({ authToken: accessToken,refreshToken , user});
          
          Cookies.set("authToken", accessToken, {
            secure: true,
            sameSite: "Strict",
          });
          Cookies.set("refreshToken", refreshToken, {
            secure: true,
            sameSite: "Strict",
          });
          Cookies.set("user", JSON.stringify(user), {
            secure: true,
            sameSite: "Strict",
          });

          if(user.role === "admin"){
            navigate("/dashboard")
          }else{
            navigate("/");
          }
          
        }
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: ` User with email ${formData.email} is not found`,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Field label=" Enter your username or email address" error={errors.email}>
        <input
          {...register("email", {
            required: "Username or Email is Required",
          })}
          type="text"
          id="email"
          className={`w-full px-4 py-3 rounded-lg border border-gray-300 ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          placeholder="Username or email address"
          value="saad@learnwithsumit.com"
          // value="admin@learnwithsumit.com"
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
          value="password123"
          // value="admin123"
        />
      </Field>


      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-4"
      >
        Sign in
      </button>
    </form>
  );
}
