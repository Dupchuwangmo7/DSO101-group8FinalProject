/**
 * Community Page
 * Anonymous community posts
 */

import { useState, useEffect } from 'react';
import api from '../utils/api';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await api.get('/posts');
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/posts', { title, content, category, isAnonymous: true });
      setTitle('');
      setContent('');
      setCategory('general');
      fetchPosts();
    } catch (error) {
      console.error('Error posting:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fade-in max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold mb-8">Community Support</h1>

      {/* Create Post */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Share Your Experience</h2>
        <form onSubmit={handleSubmitPost} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field"
              placeholder="What's on your mind?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              <option value="general">General</option>
              <option value="anxiety">Anxiety</option>
              <option value="depression">Depression</option>
              <option value="stress">Stress</option>
              <option value="motivation">Motivation</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your Thoughts</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input-field"
              rows="5"
              placeholder="Share your thoughts (completely anonymous)..."
              required
            />
          </div>

          <button type="submit" disabled={submitting} className="btn btn-primary disabled:opacity-50">
            {submitting ? 'Posting...' : 'Post Anonymously'}
          </button>
        </form>
      </div>

      {/* Posts List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
        {loading ? (
          <p className="text-gray-600 dark:text-gray-400">Loading posts...</p>
        ) : posts.length > 0 ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post._id} className="card">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold">{post.title}</h3>
                    <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-100 px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                  {post.isAnonymous && (
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 px-2 py-1 rounded">
                      Anonymous
                    </span>
                  )}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{post.content}</p>
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>👍 {post.likes} likes</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No posts yet. Be the first to share!</p>
        )}
      </div>
    </div>
  );
}
