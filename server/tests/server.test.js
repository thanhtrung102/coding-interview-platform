import request from 'supertest';
import { app, httpServer, io } from '../index.js';
import { io as Client } from 'socket.io-client';

describe('API Endpoints', () => {
  afterAll((done) => {
    httpServer.close();
    io.close();
    done();
  });

  describe('GET /', () => {
    it('should return API information', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('version');
      expect(response.body).toHaveProperty('endpoints');
    });
  });

  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('POST /api/session', () => {
    it('should create a new session', async () => {
      const response = await request(app)
        .post('/api/session')
        .send();

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('sessionId');
      expect(response.body).toHaveProperty('url');
      expect(response.body.sessionId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
    });
  });

  describe('GET /api/session/:id', () => {
    it('should return session info for valid session', async () => {
      // First create a session
      const createResponse = await request(app)
        .post('/api/session')
        .send();

      const sessionId = createResponse.body.sessionId;

      // Then retrieve it
      const response = await request(app).get(`/api/session/${sessionId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', sessionId);
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('code');
      expect(response.body).toHaveProperty('language', 'javascript');
      expect(response.body).toHaveProperty('participants');
    });

    it('should return 404 for non-existent session', async () => {
      const response = await request(app).get('/api/session/non-existent-id');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Session not found');
    });
  });
});

describe('WebSocket Events', () => {
  let clientSocket1;
  let clientSocket2;
  let sessionId;

  beforeAll((done) => {
    // Create a session first
    request(app)
      .post('/api/session')
      .send()
      .then((response) => {
        sessionId = response.body.sessionId;
        done();
      });
  });

  beforeEach((done) => {
    // Connect two clients
    clientSocket1 = Client(`http://localhost:5000`);
    clientSocket2 = Client(`http://localhost:5000`);

    let connectedClients = 0;
    const onConnect = () => {
      connectedClients++;
      if (connectedClients === 2) {
        done();
      }
    };

    clientSocket1.on('connect', onConnect);
    clientSocket2.on('connect', onConnect);
  });

  afterEach(() => {
    clientSocket1.close();
    clientSocket2.close();
  });

  afterAll((done) => {
    httpServer.close();
    io.close();
    done();
  });

  test('should allow client to join session', (done) => {
    clientSocket1.emit('join-session', sessionId);

    clientSocket1.on('session-state', (data) => {
      expect(data).toHaveProperty('code');
      expect(data).toHaveProperty('language');
      expect(data).toHaveProperty('participants');
      done();
    });
  });

  test('should broadcast code changes to other clients', (done) => {
    const testCode = 'console.log("Hello, World!");';

    // Join both clients to the session
    clientSocket1.emit('join-session', sessionId);
    clientSocket2.emit('join-session', sessionId);

    // Client 2 listens for code updates
    clientSocket2.on('code-update', (data) => {
      expect(data.code).toBe(testCode);
      done();
    });

    // Wait for both to join
    let joined = 0;
    const onJoined = () => {
      joined++;
      if (joined === 2) {
        // Client 1 sends code change
        clientSocket1.emit('code-change', {
          sessionId,
          code: testCode
        });
      }
    };

    clientSocket1.on('session-state', onJoined);
    clientSocket2.on('session-state', onJoined);
  });

  test('should broadcast language changes', (done) => {
    const testLanguage = 'python';

    clientSocket1.emit('join-session', sessionId);
    clientSocket2.emit('join-session', sessionId);

    clientSocket2.on('language-update', (data) => {
      expect(data.language).toBe(testLanguage);
      done();
    });

    let joined = 0;
    const onJoined = () => {
      joined++;
      if (joined === 2) {
        clientSocket1.emit('language-change', {
          sessionId,
          language: testLanguage
        });
      }
    };

    clientSocket1.on('session-state', onJoined);
    clientSocket2.on('session-state', onJoined);
  });

  test('should notify when user joins session', (done) => {
    clientSocket1.emit('join-session', sessionId);

    clientSocket1.on('session-state', () => {
      // Now have client 2 join
      clientSocket2.emit('join-session', sessionId);
    });

    clientSocket1.on('user-joined', (data) => {
      expect(data).toHaveProperty('participantId');
      expect(data).toHaveProperty('totalParticipants');
      expect(data.totalParticipants).toBeGreaterThan(1);
      done();
    });
  });

  test('should handle invalid session', (done) => {
    clientSocket1.emit('join-session', 'invalid-session-id');

    clientSocket1.on('error', (data) => {
      expect(data).toHaveProperty('message', 'Session not found');
      done();
    });
  });
});
