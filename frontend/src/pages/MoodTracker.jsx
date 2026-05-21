/**
 * Mood Tracker Page
 * Detailed mood logging with history and statistics
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

const moodEmojis = {
  terrible: '😢',
  bad: '😞',
  okay: '😐',
  good: '🙂',
  excellent: '😄'
};

export default function MoodTracker() {
  const { user } = useAuth();
  const [moodLogs, setMoodLogs] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Form state
  const [mood, setMood] = useState('good');
  const [intensity, setIntensity] = useState(5);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      const [historyRes, statsRes] = await Promise.all([
        api.get('/mood/history?days=30&limit=20'),
        api.get('/mood/stats?days=30')
      ]);
      setMoodLogs(historyRes.data.moodLogs || []);
      setStats(statsRes.data.stats || []);
    } catch (error) {
      console.error('Error fetching mood data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      await api.post('/mood', { mood, intensity, note });
      setMessage('Mood logged successfully! 🎉');
      setMood('good');
      setIntensity(5);
      setNote('');
      await fetchData();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to log mood');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Please log in to track your mood.</p>
      </div>
    );
  }

  return (
    <div className="fade-in py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Mood Tracker 😊</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Log new mood */}
          <div className="card">
            <h2 className="text-2xl font-bold mb-6">Log Your Mood</h2>

            {message && (
              <div className={`mb-4 p-4 rounded-lg ${
                message.includes('success')
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">How are you feeling?</label>
                <div className="grid grid-cols-5 gap-2">
                  {Object.keys(moodEmojis).map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMood(m)}
                      className={`p-3 rounded-lg transition text-2xl ${
                        mood === m
                          ? 'bg-primary-500 text-white scale-110'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {moodEmojis[m]}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 capitalize">
                  Selected: {mood}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Intensity: {intensity}/10
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Notes (optional)</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="input-field"
                  rows="4"
                  maxLength="500"
                  placeholder="What's affecting your mood today?"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn btn-primary disabled:opacity-50"
              >
                {submitting ? 'Saving...' : 'Save Entry'}
              </button>
            </form>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold mb-4">30-Day Overview</h2>
              {loading ? (
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
              ) : stats.length > 0 ? (
                <div className="grid grid-cols-5 gap-2">
                  {stats.map(stat => (
                    <div key={stat._id} className="text-center p-3 bg-primary-50 dark:bg-primary-900 rounded-lg">
                      <div className="text-2xl">{moodEmojis[stat._id]}</div>
                      <p className="font-bold text-lg">{stat.count}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{stat._id}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No data yet — log your first mood!</p>
              )}
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4">Recent Entries</h3>
              {loading ? (
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
              ) : moodLogs.length > 0 ? (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {moodLogs.map(log => (
                    <div key={log._id} className="flex items-center justify-between p-3 border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900 rounded">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{moodEmojis[log.mood]}</span>
                        <div>
                          <p className="font-semibold capitalize">{log.mood}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            Intensity: {log.intensity}/10
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(log.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No entries yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
