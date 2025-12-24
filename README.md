# LMS App (Learning Management System)

A full-stack Learning Management System (LMS) designed to simplify online education for teachers and students. This platform enables teachers to create classes, assignments, and track student progress, while students can access courses, submit assignments, and view grades.

---
## Features

### Teacher
- Create, edit, and delete classes.
- Create assignments with due dates and instructions.
- View all student submissions and grade them.
- Track student progress in real-time.

### Student
- Enroll in classes.
- View assignments and submit work.
- Track grades and feedback from teachers.
- Access class resources and announcements.

---

## Technologies
- **Frontend:** React, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (local)
- **Authentication:** JWT

---

## Project Structure
```
lms-app/
├─ backend/
│  ├─ models/         # Mongoose schemas
│  ├─ routes/         # API routes
│  ├─ controllers/    # Route controllers
│  ├─ middleware/     # Auth & error handling
│  └─ server.js       # Entry point
├─ frontend/
│  ├─ src/
│  │  ├─ components/  # React components
│  │  ├─ pages/       # App pages
│  │  ├─ services/    # API calls
│  │  └─ App.js
└─ README.md

```

