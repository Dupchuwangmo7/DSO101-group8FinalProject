/**
 * Dashboard Page
 * Main user dashboard with mood tracker and quick actions
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

export default function Dashboard() {
  const [moodEntries, setMoodEntries] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState('good');
  const [intensity, setIntensity] = useState(5);

  useEffect(() => {
    fetchMoodData();
  }, []);

  const fetchMoodData = async () => {
    try {
      const [historyRes, statsRes] = await Promise.all([
        api.get('/mood/history?days=7&limit=5'),
        api.get('/mood/stats?days=30')
      ]);
      setMoodEntries(historyRes.data.moodLogs);
      setStats(statsRes.data.stats);
    } catch (error) {
      console.error('Error fetching mood data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMood = async (e) => {
    e.preventDefault();
    try {
      await api.post('/mood', { mood: selectedMood, intensity });
      setSelectedMood('good');
      setIntensity(5);
      fetchMoodData();
    } catch (error) {
      console.error('Error adding mood:', error);
    }
  };

  return (
    <div className="fade-in max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Quick Add Mood */}
        <div className="card md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Log Your Mood</h2>
          <form onSubmit={handleAddMood} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">How are you feeling?</label>
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="input-field"
              >
                <option value="terrible">😢 Terrible</option>
                <option value="bad">😞 Bad</option>
                <option value="okay">😐 Okay</option>
                <option value="good">🙂 Good</option>
                <option value="excellent">😄 Excellent</option>
              </select>
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

            <button type="submit" className="w-full btn btn-primary">
              Log Mood
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="card md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/mood" className="p-4 border-2 border-primary-200 dark:border-primary-800 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900 transition text-center">
              <div className="text-3xl mb-2">😊</div>
              <span className="font-semibold text-sm">Mood Tracker</span>
            </Link>
            <Link to="/journal" className="p-4 border-2 border-primary-200 dark:border-primary-800 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900 transition text-center">
              <div className="text-3xl mb-2">📝</div>
              <span className="font-semibold text-sm">Journal</span>
            </Link>
            <Link to="/community" className="p-4 border-2 border-primary-200 dark:border-primary-800 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900 transition text-center">
              <div className="text-3xl mb-2">👥</div>
              <span className="font-semibold text-sm">Community</span>
            </Link>
            <Link to="/resources" className="p-4 border-2 border-primary-200 dark:border-primary-800 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900 transition text-center">
              <div className="text-3xl mb-2">📚</div>
              <span className="font-semibold text-sm">Resources</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Moods */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Mood Entries</h2>
        {loading ? (
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        ) : moodEntries.length > 0 ? (
          <div className="space-y-3">
            {moodEntries.map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-l-4 border-primary-500 bg-primary-50 dark:bg-primary-900">
                <div>
                  <p className="font-semibold capitalize">{entry.mood}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Intensity: {entry.intensity}/10
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No mood entries yet</p>
        )}
      </div>

      {/* Statistics */}
      {stats && stats.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">30-Day Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-primary-50 dark:bg-primary-900 rounded-lg">
                <div className="text-2xl mb-2">
                  {stat._id === 'terrible' && '😢'}
                  {stat._id === 'bad' && '😞'}
                  {stat._id === 'okay' && '😐'}
                  {stat._id === 'good' && '🙂'}
                  {stat._id === 'excellent' && '😄'}
                </div>
                <p className="font-bold">{stat.count}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{stat._id}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
