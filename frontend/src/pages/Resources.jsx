/**
 * Resources Page
 * Mental health resources and support
 */

export default function Resources() {
  const resources = [
    {
      title: 'Crisis Helpline',
      description: 'Immediate support available 24/7',
      contact: '1-800-273-8255',
      icon: '📞'
    },
    {
      title: 'Mental Health Awareness',
      description: 'Learn about mental health conditions and support',
      link: 'https://www.nami.org',
      icon: '🧠'
    },
    {
      title: 'Meditation Apps',
      description: 'Try guided meditation for stress relief',
      link: 'https://www.headspace.com',
      icon: '🧘'
    },
    {
      title: 'Therapy Resources',
      description: 'Find professional therapists and counselors',
      link: 'https://www.psychologytoday.com',
      icon: '👨‍⚕️'
    },
    {
      title: 'Wellness Blog',
      description: 'Read articles about mental health and wellness',
      link: 'https://www.verywellmind.com',
      icon: '📚'
    },
    {
      title: 'Support Groups',
      description: 'Join communities with shared experiences',
      link: 'https://www.aa.org',
      icon: '👥'
    }
  ];

  const tips = [
    'Get adequate sleep (7-9 hours per night)',
    'Exercise regularly (at least 30 minutes daily)',
    'Maintain a balanced diet',
    'Practice mindfulness and meditation',
    'Stay connected with friends and family',
    'Seek professional help when needed',
    'Avoid alcohol and substance abuse',
    'Set healthy boundaries'
  ];

  return (
    <div className="fade-in py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Mental Health Resources 📚</h1>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Helpful Resources</h2>
            <div className="space-y-4">
              {resources.map((resource, idx) => (
                <div key={idx} className="card">
                  <div className="flex items-start space-x-4">
                    <span className="text-3xl">{resource.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg">{resource.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{resource.description}</p>
                      {resource.contact && (
                        <p className="font-semibold text-primary-500">{resource.contact}</p>
                      )}
                      {resource.link && (
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-500 hover:underline"
                        >
                          Learn More →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wellness Tips */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Wellness Tips</h2>
            <div className="space-y-3">
              {tips.map((tip, idx) => (
                <div key={idx} className="card flex items-center space-x-4">
                  <span className="text-2xl">✨</span>
                  <p>{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Emergency Info */}
        <div className="bg-red-50 dark:bg-red-900 border-2 border-red-200 dark:border-red-700 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-800 dark:text-red-100">In Crisis?</h2>
          <p className="text-red-700 dark:text-red-200 mb-4">
            If you're experiencing a mental health emergency, please reach out immediately:
          </p>
          <div className="flex justify-center gap-8 flex-wrap">
            <div>
              <p className="font-bold text-lg text-red-800 dark:text-red-100">National Suicide Prevention</p>
              <p className="text-2xl font-bold text-red-600">988</p>
            </div>
            <div>
              <p className="font-bold text-lg text-red-800 dark:text-red-100">Crisis Text Line</p>
              <p className="text-lg text-red-600">Text HOME to 741741</p>
            </div>
            <div>
              <p className="font-bold text-lg text-red-800 dark:text-red-100">International Association</p>
              <p className="text-sm text-red-600">findahelpline.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
