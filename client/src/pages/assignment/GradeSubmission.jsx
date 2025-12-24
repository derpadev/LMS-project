import { Navbar } from "../../components/layout/Navbar";
import { useEffect, useState } from "react";
import { getClassById } from "../../api/class.api";
import { getAssignments } from "../../api/assignment.api";
import { useParams } from "react-router-dom";
import { getSubmission, gradeSubmission } from "../../api/submisssion.api";
import { useAuth } from "../../context/AuthContext";

export const GradeSubmission = () => {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [classAssignments, setClassAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchClass = async () => {
      const data = await getClassById(classId);
      const assignments = await getAssignments(classId);
      setClassData(data);
      setClassAssignments(assignments);
      setLoading(false);
    };

    fetchClass();
  }, [classId]);

  useEffect(() => {
    if (!selectedAssignment) return;

    const fetchSubmissions = async () => {
      const data = await getSubmission(selectedAssignment._id);
      console.log("Fetched submissions:", data);

      if (user.role === "teacher") {
        setSubmissions(data || []);
      } else {
        setSubmissions(data ? [data] : []);
      }
    };

    fetchSubmissions();
  }, [selectedAssignment, user.role]);

  if (loading || !classData) return <p>Loading...</p>;

  const handleGrade = async (submissionId, gradeInput) => {
    try {
      const grade = parseInt(gradeInput.value);
      const updatedSubmission = await gradeSubmission(submissionId, grade);

      // update state directly
      setSubmissions((prev) =>
        prev.map((sub) => (sub._id === submissionId ? updatedSubmission : sub))
      );

      console.log("Graded:", updatedSubmission);
    } catch (err) {
      console.error(err);
      alert("Failed to grade submission: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-200">
      <Navbar />
      <div className="border flex-1 ml-32 p-6">
        <div className="font-bold border-b">
          <h1 className="text-3xl font-bold">{classData.name}</h1>
          <p className="text-gray-600">{classData.description}</p>
          <p className="text-gray-600">
            Join Code:{" "}
            <span className="text-green-500">{classData.joinCode}</span>
          </p>
        </div>
        <main className="ml-4 mt-4 mr-4">
          <h2 className="text-2xl font-bold">
            Instructor: {classData.teacher.name}
          </h2>
          <h2 className="text-xl font-bold mt-6">Assignments</h2>

          <div className="space-y-2 mt-4">
            {classAssignments.map((assignment) => (
              <button
                key={assignment._id}
                onClick={() => setSelectedAssignment(assignment)}
                className="w-full text-left border p-3 rounded hover:bg-gray-100"
              >
                <p className="font-semibold">{assignment.title}</p>
                <p className="text-sm text-gray-500">
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>

          <h2 className="text-xl font-bold mt-6">Submissions</h2>
          {submissions && submissions.length > 0 ? (
            submissions.map((sub) => {
              let gradeInputRef = null;

              return (
                <div key={sub._id} className="border p-4 rounded bg-white mt-4">
                  <p className="font-semibold">
                    {sub.student?.name || "Unknown Student"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Submitted: {new Date(sub.submittedAt).toLocaleString()}
                  </p>

                  <div className="mt-4 flex gap-4">
                    <input
                      type="number"
                      placeholder="Grade"
                      defaultValue={sub.grade || ""}
                      ref={(el) => (gradeInputRef = el)}
                      className="border p-2 rounded w-24"
                    />

                    <button
                      className="bg-blue-500 text-white px-4 rounded"
                      onClick={() => handleGrade(sub._id, gradeInputRef)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No submissions yet</p>
          )}
        </main>
      </div>
    </div>
  );
};
