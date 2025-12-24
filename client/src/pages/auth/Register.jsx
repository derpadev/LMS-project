import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const data = { name, email, password, role };

    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
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
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex border justify-center min-h-screen items-center">
      <div className="w-full max-w-md border bg-white rounded-lg p-6">
        <h1 className="text-center font-bold text-5xl mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <label className="text-sm font-medium text-left">Name</label>
          <div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
              placeholder="First + Last"
              className="border border-black/30 rounded w-full p-2"
            />
          </div>
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
          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              type="password"
              className="border border-black/30 rounded w-full p-2"
            />
          </div>

          <label className="text-sm font-medium">Role</label>
          <div className="w-fit mx-auto flex space-x-4">
            <button
              type="button"
              onClick={() => setRole("student")}
              className={`border px-8 py-4 rounded-xl ${
                role === "student" ? "bg-blue-500" : "bg-blue-200"
              }  transition`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setRole("teacher")}
              className={`border px-8 py-4 rounded-xl ${
                role === "teacher" ? "bg-blue-500" : "bg-blue-200"
              } transition`}
            >
              Teacher
            </button>
          </div>

          <button
            type="submit"
            className="border w-full py-4 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-400 active:scale-105"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
