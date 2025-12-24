import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getClassById } from "../../api/class.api";
import { useAuth } from "../../context/AuthContext";
import { Navbar } from "../../components/layout/Navbar";
import { CreateAssignment } from "./CreateAssignment";
import { getAssignments } from "../../api/assignment.api";
import { formatDate } from "../../utils/formatDate";
import { getSubmission } from "../../api/submisssion.api";

export const ClassPage = () => {
  const { classId } = useParams();
  const [classData, setClassData] = useState(null);
  const [classAssignments, setClassAssignments] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [submissions, setSubmissions] = useState({});

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
    const fetchSubmissions = async () => {
      const submissionMap = {};
      for (const assignment of classAssignments) {
        const submission = await getSubmission(assignment._id);
        submissionMap[assignment._id] = submission;
      }
      setSubmissions(submissionMap);
    };

    if (user.role === "student") {
      fetchSubmissions();
    }
  }, [classAssignments, user.role]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex bg-gray-200">
      <Navbar />
      <div className="border flex-1 ml-32 p-6">
        <div className="font-bold border-b">
          <h1 className="text-3xl font-bold">{classData.name}</h1>
          <p className="text-gray-600">{classData.description}</p>
          <p className="text-gray-600">
            Join Code:{" "}
            <span className="text-green-500">{classData.joinCode} </span>
          </p>
        </div>
        <main className="ml-4 mt-4 mr-4">
          <h2 className="text-2xl font-bold">
            Instructor: {classData.teacher.name}
          </h2>

          {/* Teacher tool */}
          {user.role === "teacher" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Teacher Tools</h2>
              <div className="flex space-x-4">
                <div>
                  <button
                    onClick={() => setIsOpen(true)}
                    className="border font-semibold w-64 h-32 rounded-xl bg-blue-300 hover:bg-blue-400 active:scale-105 "
                  >
                    Create Assignment
                  </button>
                  {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                      <div
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/50"
                      />
                      <div className="relative z-10">
                        <CreateAssignment
                          classId={classId}
                          closeModal={setIsOpen}
                          onCreated={() => console.log("Assignment Created")}
                        />{" "}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <Link
                    to={`/classes/${classData._id}/submissions`}
                    className="border font-semibold w-64 h-32 rounded-xl bg-blue-300 flex items-center justify-center hover:bg-blue-400 active:scale-105"
                  >
                    Grade Submissions
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Assignments List */}
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Assignments</h2>
            {classAssignments.length === 0 ? (
              <p>No assignments yet</p>
            ) : (
              <div>
                {classAssignments.map((assignment) => {
                  const sub = submissions[assignment._id];
                  const dueDate = new Date(assignment.dueDate);

                  // Determine status color
                  let statusColor = "bg-yellow-400"; // pending
                  if (sub) statusColor = "bg-green-400"; // submitted
                  if (!sub && new Date() > dueDate) statusColor = "bg-red-500"; // late

                  return (
                    <Link
                      key={assignment._id}
                      to={`/classes/${classId}/assignments/${assignment._id}`}
                    >
                      <div className="border p-2 rounded flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{assignment.title}</p>
                          <p className="font-semibold text-sm">
                            Due: {formatDate(assignment.dueDate)}
                          </p>
                          <p className="text-sm font-semibold">
                            {assignment.points}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {assignment.description}
                          </p>
                        </div>

                        {user.role === "student" && (
                          <div
                            className={`w-5 h-5 rounded-full ${statusColor}`}
                            title={
                              sub
                                ? "Submitted"
                                : new Date() > dueDate
                                ? "Late"
                                : "Pending"
                            }
                          />
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Students</h2>
            {classData.students.length === 0 ? (
              <p>No students enrolled yet</p>
            ) : (
              <ul className="space-y-2">
                {classData.students.map((student) => (
                  <li key={student._id} className="border p-2 rounded">
                    <p className="font-semibold">{student.name}</p>
                    <p className="text-gray-600 text-sm">{student.email}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
