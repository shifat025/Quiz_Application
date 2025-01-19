import avater from "../../assets/avater.webp";
import useAuth from "../../hooks/useAuth";

export default function Welcome() {
  const {auth} = useAuth();
  const user = auth?.user

  return (
    <div className="text-center mb-12">
      <img
        src={avater}
        alt="Profile Picture"
        className="w-32 h-32 rounded-full border-4 border-primary mx-auto mb-4 object-cover"
      />
      <p className="text-xl text-gray-600">Welcome</p>
      <h2
        className="text-4xl font-bold text-gray-700"
        style={{ fontFamily: "Jaro" }}
      >
        {user?.full_name}
      </h2>
    </div>
  );
}
