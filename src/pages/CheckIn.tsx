import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const moods = [
  { emoji: '😢', label: 'Very Bad', value: 1 },
  { emoji: '😔', label: 'Bad', value: 2 },
  { emoji: '😐', label: 'Okay', value: 3 },
  { emoji: '🙂', label: 'Good', value: 4 },
  { emoji: '😄', label: 'Great', value: 5 },
];

const CheckIn = () => {
  const [selectedMood, setSelectedMood] = useState(3);
  const [stressLevel, setStressLevel] = useState(5);
  const [hoursSlept, setHoursSlept] = useState(7);
  const [studyHours, setStudyHours] = useState(2);
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();

  const saveCheckIn = () => {
    const checkIns = JSON.parse(localStorage.getItem('dailyCheckIns') || '[]');
    const today = new Date().toDateString();

    const alreadyCheckedIn = checkIns.some((ci: any) =>
      new Date(ci.date).toDateString() === today
    );

    if (alreadyCheckedIn) {
      alert('✅ You have already checked in today! Come back tomorrow to continue your streak 🔥');
      return;
    }

    const checkIn = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood: selectedMood,
      stress: stressLevel,
      hoursSlept,
      studyHours,
      notes,
    };

    checkIns.unshift(checkIn);
    localStorage.setItem('dailyCheckIns', JSON.stringify(checkIns));

    alert('✅ Check-in saved successfully! Keep up the great work! 🎉');

    setSelectedMood(3);
    setStressLevel(5);
    setHoursSlept(7);
    setStudyHours(2);
    setNotes('');

    navigate('/dashboard');
  };

  return (
    <div className="page-content">
      <h1 className="page-title">Daily Mental Check-in</h1>
      <div className="card check-in-card">
        <h2>How are you feeling right now?</h2>
        <div className="mood-selector">
          {moods.map((mood) => (
            <button
              key={mood.value}
              className={`mood-btn ${selectedMood === mood.value ? 'selected' : ''}`}
              onClick={() => setSelectedMood(mood.value)}
            >
              <span className="mood-emoji">{mood.emoji}</span>
              <span className="mood-label">{mood.label}</span>
            </button>
          ))}
        </div>

        <div className="form-group">
          <label>Stress Level (1-10)</label>
          <input
            type="range"
            min="1"
            max="10"
            value={stressLevel}
            onChange={(e) => setStressLevel(parseInt(e.target.value))}
          />
          <p className="stress-value">
            Current: <strong>{stressLevel}</strong>/10
          </p>
        </div>

        <div className="form-group">
          <label>Hours of Sleep Last Night</label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={hoursSlept}
            onChange={(e) => setHoursSlept(parseFloat(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Study Hours Today</label>
          <input
            type="number"
            min="0"
            max="24"
            step="0.5"
            value={studyHours}
            onChange={(e) => setStudyHours(parseFloat(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label>Notes (Optional)</label>
          <textarea
            rows={5}
            placeholder="What's on your mind? How was your day?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button onClick={saveCheckIn} className="btn-success btn-full">
          💾 Save Check-in
        </button>
      </div>
    </div>
  );
};

export default CheckIn;
