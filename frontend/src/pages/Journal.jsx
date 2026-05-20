/**
 * Journal Page
 * Private journal entries
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';

export default function Journal() {
  const { user } = useAuth();
  const [journals, setJournals] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('good');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedJournal, setSelectedJournal] = useState(null);

  const fetchJournals = async () => {
    try {
      const response = await api.get('/journal');
      setJournals(response.data.journals);
    } catch (error) {
      console.error('Error fetching journals:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchJournals();
    }
  }, [user]);

  const handleCreateJournal = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/journal', { title, content, mood });
      setMessage('Journal entry created! 📝');
      setTitle('');
      setContent('');
      setMood('good');

      await fetchJournals();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Failed to create entry');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJournal = async (id) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        await api.delete(`/journal/${id}`);
        setMessage('Entry deleted');
        await fetchJournals();
      } catch (error) {
        setMessage('Failed to delete entry');
      }
    }
  };

  const moodEmojis = { terrible: '😢', bad: '😔', okay: '😐', good: '😊', excellent: '😄' };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl mb-4">Please log in to access your journal</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">My Journal 📝</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Create Entry */}
          <div className="md:col-span-2 card">
            <h2 className="text-2xl font-bold mb-6">Write New Entry</h2>

            {message && (
              <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-lg">
                {message}
              </div>
            )}

            <form onSubmit={handleCreateJournal} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  className="input-field"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Today's entry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">How are you feeling?</label>
                <div className="grid grid-cols-5 gap-2">
                  {['terrible', 'bad', 'okay', 'good', 'excellent'].map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMood(m)}
                      className={`p-3 rounded-lg transition ${
                        mood === m
                          ? 'bg-primary-500 text-white scale-110'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {moodEmojis[m]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Entry</label>
                <textarea
                  className="input-field h-48 resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  placeholder="Write your thoughts, feelings, and experiences..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? 'Saving...' : 'Save Entry'}
              </button>
            </form>
          </div>

          {/* Past Entries */}
          <div className="md:col-span-1">
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Recent Entries</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {journals.length > 0 ? (
                  journals.map(journal => (
                    <div
                      key={journal._id}
                      className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                      onClick={() => setSelectedJournal(journal)}
                    >
                      <p className="font-semibold text-sm truncate">{journal.title}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {new Date(journal.createdAt).toLocaleDateString()} {moodEmojis[journal.mood]}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">No entries yet</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Entry Details */}
        {selectedJournal && (
          <div className="mt-8 card">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{selectedJournal.title}</h2>
              <button
                onClick={() => handleDeleteJournal(selectedJournal._id)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️ Delete
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {new Date(selectedJournal.createdAt).toLocaleString()} • Mood: {moodEmojis[selectedJournal.mood]}
            </p>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{selectedJournal.content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
