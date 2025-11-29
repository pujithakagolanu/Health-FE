import { MessageCircle, Users as UsersIcon, MessageSquare } from 'lucide-react';

const Community = () => {
  return (
    <div className="page-content">
      <h1 className="page-title">👥 Student Community</h1>
      <div className="card">
        <h2>Connect with Fellow Students</h2>
        <p className="community-description">
          You're not alone in this journey. Connect with other students, share experiences, and support each other.
        </p>
        <p className="coming-soon-large">Community feature coming soon!</p>
        <div className="grid">
          <div className="card community-feature">
            <MessageCircle className="feature-icon" size={48} strokeWidth={1.5} />
            <h3>💬 Discussion Forums</h3>
            <p>Share your thoughts and get support</p>
          </div>
          <div className="card community-feature">
            <UsersIcon className="feature-icon" size={48} strokeWidth={1.5} />
            <h3>🤝 Study Groups</h3>
            <p>Find study partners for your courses</p>
          </div>
          <div className="card community-feature">
            <MessageSquare className="feature-icon" size={48} strokeWidth={1.5} />
            <h3>📢 Anonymous Posts</h3>
            <p>Share freely without judgment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
