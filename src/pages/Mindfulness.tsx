import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

const Mindfulness = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [instruction, setInstruction] = useState('Ready?');
  const [breathingText, setBreathingText] = useState('Click "Start Exercise" to begin');
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    if (isBreathing) {
      const runCycle = (currentCycle: number) => {
        if (currentCycle >= 4) {
          setInstruction('Complete! 🎉');
          setBreathingText('Excellent! You completed all 4 cycles.');
          setIsBreathing(false);
          return;
        }

        setInstruction('Breathe IN');
        setBreathingText('Slowly inhale through your nose...');

        timeouts.push(
          setTimeout(() => {
            setInstruction('HOLD');
            setBreathingText('Hold your breath...');
          }, 4000)
        );

        timeouts.push(
          setTimeout(() => {
            setInstruction('Breathe OUT');
            setBreathingText('Slowly exhale through your mouth...');
          }, 11000)
        );

        timeouts.push(
          setTimeout(() => {
            setCycle(currentCycle + 1);
            setBreathingText(`Cycle ${currentCycle + 1}/4 complete`);
            if (currentCycle + 1 < 4) {
              timeouts.push(setTimeout(() => runCycle(currentCycle + 1), 2000));
            } else {
              setInstruction('Complete! 🎉');
              setBreathingText('Excellent! You completed all 4 cycles.');
              setIsBreathing(false);
            }
          }, 19000)
        );
      };

      runCycle(cycle);
    }

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [isBreathing]);

  const startBreathing = () => {
    if (isBreathing) {
      setIsBreathing(false);
      setInstruction('Ready?');
      setBreathingText('Click "Start Exercise" to begin');
      setCycle(0);
    } else {
      setIsBreathing(true);
      setCycle(0);
    }
  };

  return (
    <div className="page-content">
      <h1 className="page-title">🧘 Mindfulness & Breathing</h1>

      <div className="card">
        <h2>4-7-8 Breathing Exercise</h2>
        <p className="breathing-description">
          This technique helps reduce anxiety and promote relaxation. Perfect before exams or when feeling stressed!
        </p>

        <div className={`breathing-circle ${isBreathing ? 'breathing' : ''}`}>
          <span className="breathing-instruction">{instruction}</span>
        </div>

        <p className="breathing-text">{breathingText}</p>

        <div className="text-center">
          <button onClick={startBreathing} className="btn-success btn-large">
            {isBreathing ? (
              <>
                <Pause className="inline-block mr-2" size={20} />
                Stop Exercise
              </>
            ) : (
              <>
                <Play className="inline-block mr-2" size={20} />
                Start Exercise
              </>
            )}
          </button>
        </div>

        <div className="breathing-instructions">
          <h3>How it works:</h3>
          <ul>
            <li>
              <strong>Breathe IN</strong> through your nose for 4 seconds
            </li>
            <li>
              <strong>HOLD</strong> your breath for 7 seconds
            </li>
            <li>
              <strong>Breathe OUT</strong> through your mouth for 8 seconds
            </li>
            <li>Repeat for 4 cycles (about 1 minute)</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h2>🧘 More Mindfulness Exercises</h2>
        <div className="grid">
          <div className="card">
            <h3>5-Minute Body Scan</h3>
            <p>Progressive muscle relaxation from head to toe</p>
          </div>
          <div className="card">
            <h3>Gratitude Practice</h3>
            <p>List 3 things you're grateful for today</p>
          </div>
          <div className="card">
            <h3>Guided Meditation</h3>
            <p>10-minute mindfulness meditation for focus</p>
          </div>
        </div>
        <p className="coming-soon">More exercises coming soon!</p>
      </div>
    </div>
  );
};

export default Mindfulness;
