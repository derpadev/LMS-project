// GET all classes for logged in user
export const getMyClasses = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found, please log in.");

  const res = await fetch("http://localhost:5000/api/classes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to fetch class");
  }

  return res.json();
};

// POST new class (teacher only)
export const createClass = async ({ name, description }) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found, please log in.");

  const res = await fetch("http://localhost:5000/api/classes", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, description }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to create class");
  }
  return res.json();
};

// POST join class
export const joinClass = async (classCode) => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:5000/api/classes/join", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ code: classCode }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to join class");
  }
  return res.json();
};

export const getClassById = async (classId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:5000/api/classes/${classId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch class");
  }

  const data = await response.json();
  return data;
};
