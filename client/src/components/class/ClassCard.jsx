import { Link } from "react-router-dom";

export const ClassCard = ({ classData }) => {
  return (
    <Link to={`/classes/${classData._id}`}>
      <div className="border text-center rounded-md h-[128px] hover:scale-105 active:scale-95">
        <h2 className="font-bold border-b bg-blue-200">{classData.name}</h2>
        <p>{classData.description || "No description"}</p>
        <p className="font-bold">
          Join Code:{" "}
          <span className="text-green-500">{classData.joinCode}</span>
        </p>
      </div>
    </Link>
  );
};
