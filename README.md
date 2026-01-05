# 🚀 Coding Interview Platform

A real-time collaborative coding interview platform built with React, Express.js, and Socket.IO.

## Features

✅ Create shareable session links for coding interviews
✅ Real-time collaborative code editing
✅ Live updates across all connected users
✅ Syntax highlighting for JavaScript and Python
✅ Safe code execution in the browser using WASM
✅ Modern UI with Monaco Editor (VS Code's editor)

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Monaco Editor** - Code editor
- **Socket.IO Client** - Real-time communication
- **Tailwind CSS** - Styling

### Backend
- **Express.js** - Web server
- **Socket.IO** - WebSocket server
- **Node.js** - Runtime

### Code Execution
- **Pyodide** - Python runtime in WebAssembly
- Native browser JavaScript execution

## Project Structure

```
coding-interview-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── index.js           # Server entry point
│   ├── tests/             # Integration tests
│   └── package.json
├── Dockerfile             # Container configuration
├── package.json           # Root package with scripts
├── ANSWERS.md            # Homework answers
├── AGENTS.md             # AI agent instructions
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/thanhtrung102/coding-interview-platform.git
cd coding-interview-platform
```

2. **Install all dependencies**
```bash
npm run install-all
```

Or install manually:
```bash
# Root dependencies
npm install

# Client dependencies
cd client && npm install

# Server dependencies
cd ../server && npm install
```

### Development

**Run both client and server concurrently:**
```bash
npm run dev
```

**Run separately:**
```bash
# Server only (port 5000)
npm run server

# Client only (port 3000)
npm run client
```

### Testing

**Run integration tests:**
```bash
npm test
```

### Building for Production

```bash
npm run build
```

## Usage

1. **Start the application**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   - Navigate to `http://localhost:3000`

3. **Create a session**
   - Click "Create New Session"
   - Share the generated link with candidates

4. **Collaborate in real-time**
   - Multiple users can join the same session
   - Code changes sync instantly
   - Run code directly in the browser

## Docker

### Build Docker Image

```bash
docker build -t coding-interview-platform .
```

### Run Container

```bash
docker run -p 3000:3000 -p 5000:5000 coding-interview-platform
```

### Docker Compose

```bash
docker-compose up
```

## Deployment

This application can be deployed to:
- **Render** - Recommended for full-stack apps
- **Railway** - Easy deployment with Docker
- **Fly.io** - Global deployment
- **Vercel** - For static frontend (needs separate backend)
- **Heroku** - Traditional PaaS

See [ANSWERS.md](./ANSWERS.md) for deployment details.

## API Endpoints

### REST API
- `GET /` - Health check
- `GET /api/session/:id` - Get session info

### WebSocket Events
- `join-session` - Join a coding session
- `code-change` - Broadcast code changes
- `cursor-position` - Share cursor position
- `execute-code` - Run code (client-side only)

## Environment Variables

Create `.env` files in client and server directories:

**Server (.env):**
```env
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**Client (.env):**
```env
VITE_API_URL=http://localhost:5000
```

## Development Workflow

See [AGENTS.md](./AGENTS.md) for:
- Git workflow and commit guidelines
- Common development commands
- Troubleshooting tips
- AI assistant instructions

## Contributing

This is a homework project for AI Dev Tools Zoomcamp. Feel free to fork and experiment!

## License

MIT

## Acknowledgments

- Built as part of [DataTalks.Club AI Dev Tools Zoomcamp](https://github.com/DataTalksClub/ai-dev-tools-zoomcamp)
- Powered by AI assistants (Claude, ChatGPT, GitHub Copilot)

---

**🤖 Generated with AI assistance**
