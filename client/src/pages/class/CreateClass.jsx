import { useState } from "react";
import { createClass } from "../../api/class.api";

export const CreateClass = ({ closeModal }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Class name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createClass({ name, description });

      alert("Class created successfully!");
      closeModal(false);
    } catch (err) {
      console.log("ERROR: ", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="bg-white shadow-md border border-black rounded px-8 py-6 space-y-6">
        <button
          onClick={() => closeModal(false)}
          className="px-2 border rounded bg-red-400 hover:bg-red-500 active:scale-105"
        >
          X
        </button>
        <div className="text-center text-black">
          <h1 className="font-bold">Create a New Class</h1>{" "}
          <p className="text-gray-600">
            Helps student join your class using a unique code.
          </p>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col border p-6 rounded shadow-md border-gray-200"
          >
            <label className="text-gray-700 text-sm font-bold mb-2">
              Class Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-400 text-gray-500 rounded leading-tight py-2 px-3"
              type="text"
              placeholder="Math 101"
            ></input>
            <label className="mt-4 text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-400 text-gray-500 rounded leading-tight py-2 px-3"
              type="text"
              placeholder="Optional"
            ></input>
            <div className="flex justify-center mt-4">
              <button
                disabled={loading}
                className="border w-32 px-4 py-2 rouned bg-green-400 text-white font-semibold rounded-xl hover:bg-green-500 active:scale-105 disabled:opacity-50
    disabled:cursor-not-allowed"
              >
                {" "}
                {loading ? "Creating..." : "Create Class"}
              </button>
            </div>
          </form>
        </div>
        <div>{error && <p className="text-red-500">{error}</p>}</div>
      </div>
    </div>
  );
}

