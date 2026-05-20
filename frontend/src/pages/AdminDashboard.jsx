/**
 * Admin Dashboard Page
 * Admin functions for moderation and analytics
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const [statsRes, usersRes] = await Promise.all([
          api.get('/admin/dashboard'),
          api.get('/admin/users')
        ]);

        setStats(statsRes.data.stats);
        setUsers(usersRes.data.users);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, [user, navigate]);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="fade-in py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard 🔧</h1>

        {/* Stats */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Total Users</h3>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
            <div className="card">
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Active Posts</h3>
              <p className="text-3xl font-bold">{stats.totalPosts}</p>
            </div>
            <div className="card bg-red-50 dark:bg-red-900">
              <h3 className="text-red-600 dark:text-red-400 text-sm font-medium mb-2">Flagged Posts</h3>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{stats.flaggedPosts}</p>
            </div>
            <div className="card">
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Growth</h3>
              <p className="text-3xl font-bold">📈</p>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 font-semibold">Role</th>
                  <th className="text-left py-3 px-4 font-semibold">Joined</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-sm font-semibold ${
                        user.role === 'admin'
                          ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-100'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span className={user.isActive ? 'text-green-600' : 'text-red-600'}>
                        {user.isActive ? '✓ Active' : '✗ Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Moderation Tools</h3>
            <ul className="space-y-2">
              <li>✓ View and flag inappropriate posts</li>
              <li>✓ Remove flagged content</li>
              <li>✓ Monitor user activity</li>
              <li>✓ Generate reports</li>
            </ul>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-4">System Management</h3>
            <ul className="space-y-2">
              <li>✓ View system analytics</li>
              <li>✓ Manage user roles</li>
              <li>✓ Configure settings</li>
              <li>✓ View activity logs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
