# Fluxen : Task Management Application

A task management application where users can add, edit, delete, reorder, and manage tasks with a drag-and-drop interface. Tasks are categorized into **To-Do**, **In Progress**, and **Done** categories. The app uses Firebase Authentication for secure login, MongoDB for data storage, and real-time updates to keep the task list synced across all devices.

## Live Link

You can try the live application here: [Fluxen](https://fluxen.netlify.app/)

## Dependencies

### Frontend

- **React.js** (Vite.js)
- **react-beautiful-dnd** (for drag-and-drop functionality)
- **Firebase Authentication** (for user authentication)

### Backend

- **Node.js** with **Express.js**
- **MongoDB** (for storing tasks)
- **WebSocket** or **MongoDB Change Streams** (for real-time data syncing)

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
