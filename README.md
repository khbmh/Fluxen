# Fluxen : Task Management Application

Fluxen is a task management application that allows users to add, edit, delete, reorder, and manage tasks using a drag-and-drop interface. Tasks are categorized into **To-Do**, **In Progress**, and **Done** categories. The app uses **Firebase Authentication** for secure login, **MongoDB** for data storage, and real-time updates to keep the task list synced across all devices.

## Live Link

You can try the live application here: [Fluxen](https://fluxen.netlify.app/)

---

## Dependencies

### Frontend

- **React.js** (Vite.js)
- **react-beautiful-dnd** (for drag-and-drop functionality)
- **Firebase Authentication** (for user authentication)

### Backend

- **Node.js** with **Express.js**
- **MongoDB** (for storing tasks)
- **WebSocket** or **MongoDB Change Streams** (for real-time data syncing)

---

## Installation Steps

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or later)
- **MongoDB** (either local or via MongoDB Atlas)

### Backend Setup

1. Clone the repository to your local machine:

```bash
   git clone https://github.com/khbmh/Fluxen
```

2. Navigate to the backend directory:

```bash
   cd backend
```

3. Install the backend dependencies:

```bash
   npm install
```

4. Set up your environment variables. You'll need:

   - Firebase credentials for authentication
   - MongoDB connection string

5. Start the backend server:

```bash
   npm start
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
   cd frontend
```

2. Install the frontend dependencies:

```bash
   npm install
```

3. Start the frontend development server:

```bash
   npm run dev
```

4. Once both servers are running, you can access the app at `http://localhost:3000` on your browser.

---

## Technologies Used

### Frontend

- **React.js** (Vite.js) for the UI
- **react-beautiful-dnd** for the drag-and-drop feature
- **Firebase Authentication** for user login (Google sign-in)

### Backend

- **Node.js** with **Express.js** for API creation
- **MongoDB** for task data storage
- **WebSocket** or **MongoDB Change Streams** for real-time syncing

### Design

- Minimalistic UI with a clean and modern design
- Responsive for both mobile and desktop devices

---

## API Endpoints

- **POST /tasks** – Add a new task
- **GET /tasks** – Retrieve all tasks for the logged-in user
- **PUT /tasks/:id** – Update task details (title, description, category)
- **DELETE /tasks/:id** – Delete a task

---

## Bonus Features (Optional)

- Dark Mode toggle
- Task Due Dates with color indicators (overdue tasks in red)
- Activity Log to track task movements and updates

---

## License

This project is not licensed under the **MIT License**.

---
