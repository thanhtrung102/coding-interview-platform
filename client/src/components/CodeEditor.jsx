import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { io } from 'socket.io-client';
import { executeCode, initPyodide } from '../utils/codeExecution';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function CodeEditor() {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState('// Write your code here\n');
  const [language, setLanguage] = useState('javascript');
  const [participants, setParticipants] = useState(1);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [connected, setConnected] = useState(false);

  const socketRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    // Initialize Socket.IO connection
    const socket = io(API_URL);
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
      // Join the session
      socket.emit('join-session', sessionId);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    // Receive initial session state
    socket.on('session-state', ({ code: initialCode, language: initialLanguage, participants: participantCount }) => {
      setCode(initialCode);
      setLanguage(initialLanguage);
      setParticipants(participantCount);
    });

    // Receive code updates from other users
    socket.on('code-update', ({ code: updatedCode }) => {
      setCode(updatedCode);
    });

    // Receive language updates
    socket.on('language-update', ({ language: updatedLanguage }) => {
      setLanguage(updatedLanguage);
    });

    // Handle user joined
    socket.on('user-joined', ({ totalParticipants }) => {
      setParticipants(totalParticipants);
    });

    // Handle user left
    socket.on('user-left', ({ totalParticipants }) => {
      setParticipants(totalParticipants);
    });

    // Handle errors
    socket.on('error', ({ message }) => {
      console.error('Socket error:', message);
      alert(message);
      navigate('/');
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionId, navigate]);

  const handleEditorChange = (value) => {
    setCode(value);
    // Broadcast code changes to other users
    if (socketRef.current) {
      socketRef.current.emit('code-change', {
        sessionId,
        code: value
      });
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    // Broadcast language change to other users
    if (socketRef.current) {
      socketRef.current.emit('language-change', {
        sessionId,
        language: newLanguage
      });
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Running...\n');

    try {
      // Use the codeExecution utility for both JavaScript and Python
      const result = await executeCode(code, language);

      if (result.success) {
        setOutput(result.output);
      } else {
        setOutput(result.error || 'Execution failed');
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  // Preload Pyodide when Python is selected
  useEffect(() => {
    if (language === 'python') {
      setOutput('Loading Python runtime...');
      initPyodide()
        .then(() => {
          setOutput('Python ready! Write your code and click Run.');
        })
        .catch(error => {
          console.error('Failed to initialize Python:', error);
          setOutput('Failed to load Python runtime. Please refresh the page.');
        });
    } else {
      setOutput('');
    }
  }, [language]);

  const copySessionLink = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    alert('Session link copied to clipboard!');
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ← Back
            </button>
            <h1 className="text-xl font-bold text-white">
              Coding Interview Platform
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
            </select>

            {/* Participants */}
            <div className="flex items-center space-x-2 text-gray-300">
              <span className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span>{participants} {participants === 1 ? 'participant' : 'participants'}</span>
            </div>

            {/* Share Button */}
            <button
              onClick={copySessionLink}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              📋 Share Link
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-800 px-6 py-2 border-b border-gray-700">
            <span className="text-gray-400 text-sm">Session ID: {sessionId}</span>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
                automaticLayout: true,
                scrollBeyondLastLine: false,
                roundedSelection: true,
                padding: { top: 16 }
              }}
            />
          </div>

          {/* Run Button */}
          <div className="bg-gray-800 px-6 py-4 border-t border-gray-700">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRunning ? '▶ Running...' : '▶ Run Code'}
            </button>
          </div>
        </div>

        {/* Output Panel */}
        <div className="w-96 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="bg-gray-900 px-6 py-3 border-b border-gray-700">
            <h2 className="text-white font-semibold">Output</h2>
          </div>

          <div className="flex-1 overflow-auto">
            <pre className="text-gray-300 p-6 font-mono text-sm whitespace-pre-wrap">
              {output || 'Run your code to see the output here...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
