import { Phone, Clock, Heart } from 'lucide-react';

const Resources = () => {
  return (
    <div className="page-content">
      <h1 className="page-title">📖 Mental Health Resources</h1>

      <div className="card crisis-card">
        <Phone className="crisis-icon" size={40} />
        <h3>🆘 988 Suicide & Crisis Lifeline</h3>
        <p className="crisis-number">
          <strong>Call or Text:</strong> <span className="phone-number">988</span>
        </p>
        <p>
          <strong>Available:</strong> 24/7 - Free and Confidential
        </p>
        <p className="crisis-text">
          If you or someone you know is in crisis, call or text 988. Help is always available.
        </p>
      </div>

      <div className="card">
        <Heart className="inline-block mb-4" size={40} strokeWidth={1.5} />
        <h3>🏥 Campus Counseling Center</h3>
        <p>
          <strong>Phone:</strong> (555) 123-4567
        </p>
        <p>
          <strong>Hours:</strong> 9 AM - 5 PM, Monday - Friday
        </p>
        <p>
          <strong>Services:</strong> Individual counseling, group therapy, crisis intervention
        </p>
        <p className="resource-note">Free mental health services for all enrolled students</p>
      </div>

      <div className="card">
        <Clock className="inline-block mb-4" size={40} strokeWidth={1.5} />
        <h3>💤 Sleep Optimization Tips</h3>
        <ul className="resource-list">
          <li>Maintain a consistent sleep schedule (same bedtime/wake time daily)</li>
          <li>Keep your bedroom cool (60-67°F) and completely dark</li>
          <li>Avoid screens 1-2 hours before bed (blue light disrupts sleep)</li>
          <li>Aim for 7-9 hours per night - essential for memory consolidation</li>
          <li>Avoid caffeine after 2 PM and limit alcohol</li>
          <li>Exercise regularly, but not within 3 hours of bedtime</li>
        </ul>
      </div>

      <div className="card">
        <h3>🍎 Nutrition for Mental Health</h3>
        <ul className="resource-list">
          <li>Eat regular, balanced meals (don't skip breakfast!)</li>
          <li>Stay hydrated - drink 8-10 glasses of water daily</li>
          <li>Limit caffeine after 2 PM (disrupts sleep and increases anxiety)</li>
          <li>Include omega-3 rich foods (salmon, walnuts, flaxseeds)</li>
          <li>Eat plenty of fruits, vegetables, and whole grains</li>
          <li>Limit processed foods and excessive sugar</li>
        </ul>
      </div>

      <div className="card">
        <h3>🏃 Exercise & Movement</h3>
        <ul className="resource-list">
          <li>Aim for 30 minutes of moderate activity most days</li>
          <li>Take study breaks every 50 minutes - walk around campus</li>
          <li>Try yoga or tai chi for stress relief and flexibility</li>
          <li>Join intramural sports or campus fitness classes</li>
          <li>Even 10-minute walks can boost mood and focus</li>
        </ul>
      </div>
    </div>
  );
};

export default Resources;
