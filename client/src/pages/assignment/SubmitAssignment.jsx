import { Navbar } from "../../components/layout/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAssignmentById } from "../../api/assignment.api";
import { submitAssignment } from "../../api/submisssion.api";

export const SubmitAssignment = () => {
  const { classId, assignmentId } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [submisssion, setSubmission] = useState(null);

  useEffect(() => {
    const fetchAssignment = async () => {
      const data = await getAssignmentById(assignmentId);
      setAssignment(data);
    };

    fetchAssignment();
  }, [assignmentId]);

  if (!assignment) return <p>Loading...</p>;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await submitAssignment(assignmentId, content);
      setSubmission(res);
      alert("Submission successful!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Navbar />
      <main className="flex-1 ml-32 p-6 bg-gray-200">
        <h1 className="text-3xl font-bold">{assignment.title}</h1>
        <p className="text-gray-600">{assignment.description}</p>

        <p className="mt-2 text-sm">
          Due: {new Date(assignment.dueDate).toLocaleString()}
        </p>
        {/* Submission section */}
        <div>
          <h2>Your Submission</h2>
          {submisssion && (
            <p className="text-green-500 text-sm">
              Submitted at {new Date(submisssion.submittedAt).toLocaleString()}
            </p>
          )}
          <textarea
            id="content"
            className="w-full border rounded p-3 mt-4"
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={assignment.description}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600"
          >
            {submisssion ? "Resubmit" : "Submit"}
          </button>
        </div>
      </main>
    </div>
  );
};
