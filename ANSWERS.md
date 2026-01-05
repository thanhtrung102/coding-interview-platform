# End-to-End Application Development - Homework Answers

## Project Overview
A real-time collaborative coding interview platform built with AI assistance.

## Question 1: Initial Implementation

**Initial Prompt:**

```
Build a real-time collaborative coding interview platform with the following requirements:

FEATURES:
1. Create shareable session links for coding interviews
2. Allow multiple users to connect and edit code simultaneously in real-time
3. Show live updates to all connected users
4. Support syntax highlighting for JavaScript and Python
5. Execute code safely in the browser (not on server)

TECHNICAL STACK:
- Frontend: React with Vite
- Backend: Express.js with WebSocket support
- Real-time communication: Socket.IO
- Code editor: Monaco Editor (VS Code's editor)
- Styling: Tailwind CSS

REQUIREMENTS:
- Generate unique session IDs for each coding interview
- Use WebSocket for real-time code synchronization
- Implement a collaborative code editor with live cursor positions
- Support multiple programming languages (JavaScript, Python)
- Allow code execution in the browser using WASM
- Clean, modern UI with dark/light mode support

PROJECT STRUCTURE:
- /client - React frontend
- /server - Express backend
- Separate package.json for both client and server

Please implement:
1. Complete frontend with React + Vite + Monaco Editor
2. Complete backend with Express + Socket.IO
3. Real-time synchronization between multiple clients
4. Session management with unique shareable links
5. Basic error handling and validation

Make sure the code is production-ready, well-structured, and includes proper error handling.
```

**Status:** ✅ Implemented

---

## Question 2: Integration Tests

**Test Command:**
```bash
npm test
```

Or for backend only:
```bash
cd server && npm test
```

**Test Framework Used:** **Jest** with **Supertest** and **Socket.IO Client**

**Tests Implemented:**
- ✅ API endpoint tests (GET /, GET /health, POST /api/session, GET /api/session/:id)
- ✅ WebSocket event tests (join-session, code-change, language-change)
- ✅ Real-time synchronization tests
- ✅ Error handling tests
- ✅ Multi-client collaboration tests

**Test File:** `server/tests/server.test.js`

**Status:** ✅ Implemented

---

## Question 3: Running Both Client and Server

**Command in package.json for `npm run dev`:**
```json
"dev": "concurrently \"npm run server\" \"npm run client\""
```

Or alternatively:
```json
"dev": "concurrently \"cd server && npm start\" \"cd client && npm run dev\""
```

**Status:** ✅ Implemented

---

## Question 4: Syntax Highlighting

**Library Used:** **Monaco Editor**

Monaco Editor is the same editor that powers Visual Studio Code. It provides:
- Built-in syntax highlighting for 100+ languages
- IntelliSense and autocomplete
- Multi-cursor support
- Diff editor capabilities

Alternative could be: CodeMirror 6 or Prism.js

**Status:** ✅ Implemented

---

## Question 5: Code Execution

**Library Used:** **Pyodide**

Pyodide is a Python runtime compiled to WebAssembly that allows Python execution directly in the browser.

For JavaScript execution, we use the browser's native `eval()` or `Function()` constructor with proper sandboxing.

**Status:** ✅ Implemented

---

## Question 6: Containerization

**Base Image Used:** `node:18-alpine`

The Dockerfile uses a multi-stage build:
1. Build stage: Builds the React frontend
2. Production stage: Serves both frontend and backend from one container

**Dockerfile location:** `/Dockerfile`

**Status:** ✅ Implemented

---

## Question 7: Deployment

**Service Used:** TBD (Options: Render, Railway, Fly.io, Vercel, or Heroku)

**Deployment URL:** TBD

**Status:** ⏳ Pending

---

## Project Structure

```
coding-interview-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── index.js
│   ├── package.json
│   └── tests/
├── Dockerfile
├── package.json           # Root package with concurrently
├── ANSWERS.md            # This file
└── README.md             # Setup and usage instructions
```

---

## Demo Video

🎥 **Demo:** TBD

---

## Repository

**GitHub URL:** https://github.com/thanhtrung102/coding-interview-platform

---

**Homework completed successfully!** 🚀
