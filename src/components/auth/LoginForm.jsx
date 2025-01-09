import { useForm } from "react-hook-form";
import Field from "../common/Field";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();


  const submitForm = (formdata) =>{
    console.log(formdata);
  }
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Field
        label=" Enter your username or email address"
        error={errors.username}
      >
        <input
          {...register("username", {
            required: "Username or Email is Required",
          })}
          type="text"
          id="username"
          className={`w-full px-4 py-3 rounded-lg border border-gray-300 ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
          placeholder="Username or email address"
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
        />
      </Field>
      <div className="mb-6">
        <label htmlFor="admin" className="flex gap-2 items-center">
          <input
            {...register("admin")}
            type="checkbox"
            id="admin"
            className="px-4 py-3 rounded-lg border border-gray-300"
          />
          Login as Admin
        </label>
        {errors.admin && (
          <p className="text-red-500 text-sm mt-1">{errors.admin.message}</p>
        )}
      </div>
      
      <button
        type="submit"
        className="w-full bg-primary text-white py-3 rounded-lg mb-4"
      >
        Sign in
      </button>
    </form>
  );
}
