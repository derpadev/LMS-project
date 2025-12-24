import { useState } from "react";
import { joinClass } from "../../api/class.api";

export const JoinClass = ({ closeModal }) => {
  const [classCode, setClassCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleJoinClass = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await joinClass(classCode);

      alert(`Joined class: ${result.name}`);
      setClassCode("");
      const data = await getMyClasses();
      setClasses(data);
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
            <h1 className="font-bold">Join a new class</h1>{" "}
            <p className="text-gray-600">Please type in the <span className="font-semibold">Join Code</span>.</p>
          </div>
          <div>
            <form onSubmit={handleJoinClass} className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Enter class code"
                value={classCode}
                onChange={(e) => setClassCode(e.target.value)}
                className="border border-gray-400 rounded leading-tight text-green-500 font-semibold py-2 px-3"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-1 rounded"
              >
                {loading ? "Joining..." : "Join Class"}
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
  );
};
