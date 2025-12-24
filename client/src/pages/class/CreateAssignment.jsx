import { useState } from "react";
import { createAssignment } from "../../api/assignment.api";
import { useAuth } from "../../context/AuthContext";

export const CreateAssignment = ({ classId, closeModal, onCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [points, setPoints] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Title: ", title);
    if (!title.trim()) {
      setError("Assignment title is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createAssignment(
        { classId, title, description, dueDate, points },
        token
      );

      alert("Assignment created successfully!");
      if (onCreated) onCreated();
      closeModal(false);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create assignment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 py-6 space-y-6 w-[90vw] max-w-2xl">
      <button
        onClick={() => closeModal(false)}
        className="px-2 border rounded bg-red-300 hover:bg-red-500 active:scale-105"
      >
        X
      </button>
      <div className="text-center">
        <h1 className="font-bold text-lg">Create a New Assignment</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="text-gray-700 text-sm font-bold">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Assignment Title"
          className="border rounded shadow p-2"
        />

        <label className="text-gray-700 text-sm font-bold">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional"
          className="border rounded shadow p-2"
        />

        <label className="text-gray-700 text-sm font-bold">Due Date</label>
        <input
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          type="date"
          className="border rounded shadow p-2"
        />

        <label className="text-gray-700 text-sm font-bold">Points</label>
        <input
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          type="number"
          className="border rounded shadow p-2"
          placeholder="100"
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          disabled={loading}
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create Assignment"}
        </button>
      </form>
    </div>
  );
};
