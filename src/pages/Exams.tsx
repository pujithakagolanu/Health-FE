import { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';

interface Exam {
  id: number;
  name: string;
  date: string;
  added: string;
}

const Exams = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [examName, setExamName] = useState('');
  const [examDate, setExamDate] = useState('');

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = () => {
    const loadedExams = JSON.parse(localStorage.getItem('exams') || '[]');
    setExams(loadedExams);
  };

  const addExam = () => {
    if (!examName.trim() || !examDate) {
      alert('Please enter both exam name and date!');
      return;
    }

    const newExam: Exam = {
      id: Date.now(),
      name: examName,
      date: examDate,
      added: new Date().toISOString(),
    };

    const updatedExams = [...exams, newExam];
    localStorage.setItem('exams', JSON.stringify(updatedExams));
    setExams(updatedExams);
    setExamName('');
    setExamDate('');

    alert('📚 Exam added successfully!');
  };

  const deleteExam = (id: number) => {
    if (!confirm('Are you sure you want to delete this exam?')) return;

    const updatedExams = exams.filter((e) => e.id !== id);
    localStorage.setItem('exams', JSON.stringify(updatedExams));
    setExams(updatedExams);
  };

  const getDaysUntilExam = (examDate: string) => {
    const exam = new Date(examDate);
    const today = new Date();
    const diffTime = exam.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const sortedExams = [...exams].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="page-content">
      <h1 className="page-title">📚 Exam Stress Manager</h1>

      <div className="card">
        <h2>Add Upcoming Exam</h2>
        <div className="form-group">
          <label>Exam Name/Subject</label>
          <input
            type="text"
            placeholder="e.g., Calculus Final"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Exam Date</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />
        </div>
        <button onClick={addExam} className="btn-success">
          <Plus className="inline-block mr-2" size={20} />
          Add Exam
        </button>
      </div>

      <div className="card exam-list-card">
        <h2>Your Upcoming Exams</h2>
        {sortedExams.length === 0 ? (
          <p className="no-exams">No exams added yet. Add your first exam above!</p>
        ) : (
          <div className="exam-list">
            {sortedExams.map((exam) => {
              const daysUntil = getDaysUntilExam(exam.date);
              let urgencyClass = '';
              let urgencyText = '';

              if (daysUntil < 0) {
                urgencyText = 'Past';
                urgencyClass = '';
              } else if (daysUntil === 0) {
                urgencyText = 'Today!';
                urgencyClass = 'urgent';
              } else if (daysUntil === 1) {
                urgencyText = 'Tomorrow!';
                urgencyClass = 'urgent';
              } else if (daysUntil <= 7) {
                urgencyText = `${daysUntil} days`;
                urgencyClass = 'soon';
              } else {
                urgencyText = `${daysUntil} days`;
              }

              const examDateObj = new Date(exam.date);
              const dateStr = examDateObj.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <div key={exam.id} className={`exam-card ${urgencyClass}`}>
                  <h3>{exam.name}</h3>
                  <p>
                    <strong>Date:</strong> {dateStr}
                  </p>
                  <div className={`exam-countdown ${urgencyClass}`}>{urgencyText}</div>
                  <button onClick={() => deleteExam(exam.id)} className="btn-danger btn-sm">
                    <Trash2 className="inline-block mr-1" size={16} />
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="card">
        <h2>📝 Study Tips for Exam Success</h2>
        <ul className="tips-list">
          <li>
            <strong>Pomodoro Technique:</strong> Study for 25 minutes, take 5-minute breaks
          </li>
          <li>
            <strong>Active Recall:</strong> Test yourself rather than just re-reading notes
          </li>
          <li>
            <strong>Spaced Repetition:</strong> Review material at increasing intervals
          </li>
          <li>
            <strong>Study Groups:</strong> Explain concepts to others to reinforce learning
          </li>
          <li>
            <strong>Practice Problems:</strong> Solve past exam papers and practice questions
          </li>
          <li>
            <strong>Sleep Well:</strong> Get 7-9 hours before exam day - no all-nighters!
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Exams;
