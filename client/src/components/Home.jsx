import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function Home() {
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createSession = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      navigate(`/session/${data.sessionId}`);
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Failed to create session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const joinSession = () => {
    if (sessionId.trim()) {
      navigate(`/session/${sessionId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            🚀 Coding Interview
          </h1>
          <p className="text-gray-300 text-lg">
            Real-time collaborative coding platform
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-2xl p-8 space-y-6">
          {/* Create New Session */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Start a New Session
            </h2>
            <button
              onClick={createSession}
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : 'Create New Session'}
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">OR</span>
            </div>
          </div>

          {/* Join Existing Session */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Join Existing Session
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && joinSession()}
                placeholder="Enter Session ID"
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={joinSession}
                disabled={!sessionId.trim()}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join Session
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Features:</p>
          <div className="flex justify-center gap-6 mt-2">
            <span>✓ Real-time collaboration</span>
            <span>✓ Syntax highlighting</span>
            <span>✓ Code execution</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
