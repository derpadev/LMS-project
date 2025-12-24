import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        console.log("Login sucessful! Token: " + result.token);
        localStorage.setItem("token", result.token);
        setUser(result.user);
      } else {
        console.log("Login failed: " + result.message);
      }
      const role = result.user?.role;
      if (role === "teacher") {
        navigate("/dashboard/teacher");
      } else {
        navigate("/dashboard/student");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex border justify-center min-h-screen items-center">
      <div className="w-full max-w-md border bg-white rounded-lg p-6">
        <h1 className="text-center font-bold text-5xl mb-6">Log In</h1>
        <form onSubmit={handleLogin} className="space-y-6 text-left">
          <label className="text-sm font-medium text-left">Email</label>
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              placeholder="JohnDoe123@email.com"
              className="border border-black/30 rounded w-full p-2"
            />
          </div>

          <label className="text-sm font-medium">Password</label>
          <div className="">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              type="password"
              className="border border-black/30 rounded w-full p-2"
            />
          </div>

          <button className="border w-full py-4 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-400 active:scale-105">
            Log In
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-300">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};
