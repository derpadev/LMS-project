import { Navbar } from "../../components/layout/Navbar";
import { useState, useEffect } from "react";
import { getMyClasses } from "../../api/class.api";
import { ClassCard } from "../../components/class/ClassCard";

export const TeacherDashboard = () => {
  const [classes, setClasses] = useState([]);

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const data = await getMyClasses();
        setClasses(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className="min-h-screen flex">
      <Navbar />
      <main className="flex-1 ml-32 p-6 bg-gray-200">
        <h1 className="border-b border-gray-500 p-5 text-4xl font-bold mb-2">
          HELLO <span className="text-blue-500 uppercase">{user.name}</span>
        </h1>
        <div className="ml-8 mt-8">
          <h2 className="text-xl font-bold mb-2">Teacher Dashboard</h2>
          <h3>Your Classes </h3>
        </div>
        <div className="grid grid-cols-5 gap-8 p-8">
          {classes.length === 0 ? (
            <p>No Classes Yet</p>
          ) : (
            classes.map((cls) => <ClassCard key={cls._id} classData={cls} />)
          )}
        </div>
      </main>
    </div>
  );
};
