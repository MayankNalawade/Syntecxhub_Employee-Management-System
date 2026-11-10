# Employee Management System

MERN stack app for Syntecxhub Project 3: add, list, update, and delete employees with form validation and a responsive React UI.

## Stack

- **MongoDB** via Mongoose (in-memory MongoDB by default so the app runs without a local install)
- **Express** REST API
- **React** + Vite frontend
- **Node.js**

Employee fields: name, email, role, department, salary, phone, and status.

## Run locally

```bash
npm install
npm install --prefix server
npm install --prefix client
npm run dev
```

- Frontend: http://localhost:5173
- API: http://localhost:5001/api/employees

The client proxies `/api` to the Express server.

## Use a real MongoDB

In `server/.env`:

```
USE_MEMORY_DB=false
MONGODB_URI=mongodb://127.0.0.1:27017/employee_management
```

Then seed sample data:

```bash
npm run seed
```

## API

| Method | Path | Description |
| --- | --- | --- |
| GET | `/api/employees` | List employees (`search`, `department`, `status`) |
| POST | `/api/employees` | Create employee |
| GET | `/api/employees/:id` | Get one employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |
