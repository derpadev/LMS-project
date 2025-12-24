// POST new Assignment (teacher only)
export const createAssignment = async ({
  classId,
  title,
  description,
  dueDate,
  points,
}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found, please log in.");

  const res = await fetch(
    `http://localhost:5000/api/classes/${classId}/assignments`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ classId, title, description, dueDate, points }),
    }
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to create class");
  }
  return res.json();
};

// GET all assignments for class
export const getAssignments = async (classId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found, please log in.");

  const res = await fetch(
    `http://localhost:5000/api/classes/${classId}/assignments`,
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

// GET single assignment by ID
export const getAssignmentById = async (assignmentId) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found, please log in.");

  const res = await fetch(
    `http://localhost:5000/api/classes/assignments/${assignmentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to fetch assignment");
  }

  return res.json();
};
