import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const data = { username, password };

    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("User registered sucessfully!");
      } else {
        alert("Error: " + result.message);
      }

      navigate("/login")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex border justify-center min-h-screen items-center">
      <div className="w-full max-w-md border bg-white rounded-lg p-6">
        <h1 className="text-center font-bold text-5xl mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <label className="text-sm font-medium text-left">Username</label>
          <div className="">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              type="text"
              placeholder="JohnDoe123"
              className="border border-black/30 rounded w-full p-2"
            ></input>
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
            ></input>
          </div>

          <button className="border w-full py-4 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-400 active:scale-105">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
