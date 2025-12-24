export const submitAssignment = async (assignmentId, content) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:5000/api/assignments/${assignmentId}/submissions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    }
  );
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to submit");
  }
  return res.json();
};

export const getSubmission = async (assignmentId) => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `http://localhost:5000/api/assignments/${assignmentId}/submissions`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to fetch class");
  }

  return res.json();
};

export const gradeSubmission = async (submissionId, grade) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/submissions/${submissionId}/grade`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ grade }),
      }
    );
    if (!res.ok) throw new Error("Failed to grade submission");
    const data = await res.json();
    console.log("Graded:", data);
  } catch (err) {
    console.error(err);
  }
};
