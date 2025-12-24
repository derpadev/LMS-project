import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { VscAdd } from "react-icons/vsc";
import { MdHome } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { CreateClass } from "../../pages/class/CreateClass.jsx";
import { useState } from "react";
import { JoinClass } from "../../pages/class/JoinClass.jsx";

export const Navbar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="w-32 h-screen bg-gray-800 border-r border-black fixed flex flex-col p-6 text-white">
      <h1 className="text-md mx-auto font-extrabold">Learnlytics</h1>
      <nav className="flex flex-col space-y-8 mt-20 items-center">
        <Link
          to={`${
            user.role === "teacher"
              ? "/dashboard/teacher"
              : "/dashboard/student"
          }`}
          className="hover:text-gray-300 text-5xl hover:scale-115"
        >
          <MdHome />
        </Link>

        <div>
          <button
            onClick={() => setIsOpen(true)}
            className="text-5xl hover:text-gray-300 hover:scale-115"
          >
            <VscAdd />
          </button>
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                onClick={() => setIsOpen(false)}
                className="absolute inset-0 bg-black/50"
              />
              <div className="relative z-10">
                {user.role === "teacher" ? (
                  <>
                    <CreateClass closeModal={setIsOpen} />{" "}
                  </>
                ) : (
                  <>
                    <JoinClass closeModal={setIsOpen} />{" "}
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleSignOut}
          className="text-4xl hover:scale-115 hover:text-gray-300 rounded font-semibold"
        >
          <FaSignOutAlt />
        </button>
      </nav>
    </div>
  );
};
