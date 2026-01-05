import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, 'public')));
}

// Store active sessions in memory (in production, use Redis or database)
const sessions = new Map();

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Coding Interview Platform API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      createSession: 'POST /api/session',
      getSession: 'GET /api/session/:id'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Create a new session
app.post('/api/session', (req, res) => {
  const sessionId = uuidv4();
  const session = {
    id: sessionId,
    createdAt: new Date().toISOString(),
    code: '// Write your code here\n',
    language: 'javascript',
    participants: []
  };

  sessions.set(sessionId, session);

  res.json({
    sessionId,
    url: `${req.protocol}://${req.get('host')}/session/${sessionId}`
  });
});

// Get session info
app.get('/api/session/:id', (req, res) => {
  const session = sessions.get(req.params.id);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  res.json(session);
});

// Serve React app for all other routes in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
  });
}

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Join a session
  socket.on('join-session', (sessionId) => {
    const session = sessions.get(sessionId);

    if (!session) {
      socket.emit('error', { message: 'Session not found' });
      return;
    }

    socket.join(sessionId);

    // Add participant
    const participant = {
      id: socket.id,
      joinedAt: new Date().toISOString()
    };
    session.participants.push(participant);

    // Send current session state to the joining user
    socket.emit('session-state', {
      code: session.code,
      language: session.language,
      participants: session.participants.length
    });

    // Notify others in the session
    socket.to(sessionId).emit('user-joined', {
      participantId: socket.id,
      totalParticipants: session.participants.length
    });

    console.log(`User ${socket.id} joined session ${sessionId}`);
  });

  // Handle code changes
  socket.on('code-change', ({ sessionId, code }) => {
    const session = sessions.get(sessionId);

    if (session) {
      session.code = code;
      // Broadcast to all other users in the session
      socket.to(sessionId).emit('code-update', { code });
    }
  });

  // Handle language changes
  socket.on('language-change', ({ sessionId, language }) => {
    const session = sessions.get(sessionId);

    if (session) {
      session.language = language;
      // Broadcast to all users in the session
      io.to(sessionId).emit('language-update', { language });
    }
  });

  // Handle cursor position updates
  socket.on('cursor-position', ({ sessionId, position }) => {
    socket.to(sessionId).emit('cursor-update', {
      userId: socket.id,
      position
    });
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);

    // Remove participant from all sessions
    sessions.forEach((session, sessionId) => {
      const index = session.participants.findIndex(p => p.id === socket.id);
      if (index !== -1) {
        session.participants.splice(index, 1);

        // Notify others in the session
        socket.to(sessionId).emit('user-left', {
          participantId: socket.id,
          totalParticipants: session.participants.length
        });
      }
    });
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 WebSocket server ready`);
});

// Export for testing
export { app, httpServer, io };
