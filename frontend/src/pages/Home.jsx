/**
 * Home Page
 * Landing page with features overview and call-to-action
 */

import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-800 dark:to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <span className="text-6xl">🧠</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary-900 dark:text-primary-100">
            Mental Health Matters
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Semzung is a safe, anonymous community where you can share experiences, 
            track your mental health, and find support when you need it most.
          </p>
          {!user ? (
            <div className="flex gap-4 justify-center">
              <Link to="/register" className="btn btn-primary text-lg px-8 py-3">
                Get Started Free
              </Link>
              <Link to="/login" className="btn btn-outline text-lg px-8 py-3">
                Sign In
              </Link>
            </div>
          ) : (
            <Link to="/dashboard" className="btn btn-primary text-lg px-8 py-3 inline-block">
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Core Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card">
              <div className="text-4xl mb-4">😊</div>
              <h3 className="text-xl font-bold mb-3">Mood Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your daily mood and identify patterns to better understand your mental health.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-3">Private Journaling</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Write freely in your personal journal with complete privacy and security.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3">Community Support</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect anonymously with others, share experiences, and find support.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Analytics</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get insights into your mental health with visual analytics and statistics.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold mb-3">Privacy First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your data is encrypted and your privacy is our top priority.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-3">Resources</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access curated mental health resources and support information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of students taking control of their mental health.
          </p>
          {!user && (
            <Link to="/register" className="btn bg-white text-primary-500 hover:bg-gray-100 text-lg px-8 py-3 inline-block">
              Start Free Today
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
