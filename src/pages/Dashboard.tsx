import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';

interface CheckIn {
  id: number;
  date: string;
  mood: number;
  stress: number;
  hoursSlept: number;
  studyHours: number;
  notes: string;
}

const Dashboard = () => {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const loadedCheckIns = JSON.parse(localStorage.getItem('dailyCheckIns') || '[]');
    setCheckIns(loadedCheckIns);
    setStreak(calculateStreak(loadedCheckIns));
  }, []);

  const calculateStreak = (checkIns: CheckIn[]) => {
    if (checkIns.length === 0) return 0;

    let streakCount = 0;
    const today = new Date();

    for (let i = 0; i < checkIns.length; i++) {
      const checkInDate = new Date(checkIns[i].date);
      const expectedDate = new Date(today);
      expectedDate.setDate(expectedDate.getDate() - i);

      if (checkInDate.toDateString() === expectedDate.toDateString()) {
        streakCount++;
      } else {
        break;
      }
    }

    return streakCount;
  };

  if (checkIns.length === 0) {
    return (
      <div className="page-content">
        <h1 className="page-title">Your Wellness Dashboard</h1>
        <div className="card empty-state">
          <h2>📊 No Data Yet</h2>
          <p>Start checking in daily to see your wellness insights and trends!</p>
          <Link to="/check-in">
            <button className="btn-success">Start First Check-in</button>
          </Link>
        </div>
      </div>
    );
  }

  const last7Days = checkIns.slice(0, 7);
  const avgMood = (last7Days.reduce((sum, ci) => sum + ci.mood, 0) / last7Days.length).toFixed(1);
  const avgStress = (last7Days.reduce((sum, ci) => sum + ci.stress, 0) / last7Days.length).toFixed(1);
  const avgSleep = (last7Days.reduce((sum, ci) => sum + ci.hoursSlept, 0) / last7Days.length).toFixed(1);
  const avgStudy = (last7Days.reduce((sum, ci) => sum + ci.studyHours, 0) / last7Days.length).toFixed(1);

  return (
    <div className="page-content">
      <h1 className="page-title">Your Wellness Dashboard</h1>

      {streak > 0 && (
        <div className="streak">
          <Flame className="flame" size={32} />
          <div className="streak-info">
            <p className="streak-label">Current Streak</p>
            <p className="streak-count">{streak} day{streak > 1 ? 's' : ''}</p>
          </div>
        </div>
      )}

      <div className="stats-grid">
        <div className="card stat-card">
          <h3>Average Mood</h3>
          <div className="stat-value stat-primary">{avgMood}/5</div>
        </div>
        <div className="card stat-card">
          <h3>Average Stress</h3>
          <div className="stat-value stat-warning">{avgStress}/10</div>
        </div>
        <div className="card stat-card">
          <h3>Average Sleep</h3>
          <div className="stat-value stat-success">{avgSleep}h</div>
        </div>
        <div className="card stat-card">
          <h3>Study Hours</h3>
          <div className="stat-value stat-secondary">{avgStudy}h</div>
        </div>
        <div className="card stat-card">
          <h3>Total Check-ins</h3>
          <div className="stat-value">{checkIns.length}</div>
        </div>
      </div>

      <div className="card">
        <h2>Mood Trend (Last 7 Days)</h2>
        <div className="chart">
          {last7Days.reverse().map((entry, index) => {
            const date = new Date(entry.date);
            const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const height = (entry.mood / 5) * 270;
            let barClass = 'bar';
            if (entry.mood > 3) barClass += '';
            else if (entry.mood === 3) barClass += ' medium';
            else barClass += ' low';

            return (
              <div key={index} className="chart-bar">
                <div className={barClass} style={{ height: `${height}px` }}></div>
                <div className="bar-label">{dateStr}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
