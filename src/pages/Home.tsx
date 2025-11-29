import { Link } from 'react-router-dom';
import { CheckCircle, BarChart3, BookOpen, Heart, Users, BookMarked } from 'lucide-react';

const Home = () => {
  const cards = [
    {
      title: 'Daily Check-in',
      description: 'Track your mood, stress, and sleep patterns',
      path: '/check-in',
      icon: CheckCircle,
      buttonText: 'Start Check-in',
      buttonClass: 'btn-success'
    },
    {
      title: 'Dashboard',
      description: 'Visualize your wellness journey',
      path: '/dashboard',
      icon: BarChart3,
      buttonText: 'View Stats',
      buttonClass: 'btn-secondary'
    },
    {
      title: 'Exam Stress Hub',
      description: 'Manage exam prep and reduce anxiety',
      path: '/exams',
      icon: BookOpen,
      buttonText: 'Manage Exams',
      buttonClass: ''
    },
    {
      title: 'Mindfulness',
      description: 'Guided breathing and relaxation',
      path: '/mindfulness',
      icon: Heart,
      buttonText: 'Start Exercise',
      buttonClass: ''
    },
    {
      title: 'Community',
      description: 'Connect with fellow students',
      path: '/community',
      icon: Users,
      buttonText: 'Join Community',
      buttonClass: ''
    },
    {
      title: 'Resources',
      description: 'Mental health tips and support',
      path: '/resources',
      icon: BookMarked,
      buttonText: 'Explore',
      buttonClass: ''
    }
  ];

  return (
    <div className="page-content">
      <h1 className="page-title">Welcome to StudentWell</h1>
      <p className="subtitle">Your Complete Mental Health Companion for College Success</p>

      <div className="grid">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="card text-center">
              <Icon className="mx-auto mb-4" size={48} strokeWidth={1.5} />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <Link to={card.path}>
                <button className={card.buttonClass}>{card.buttonText}</button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
