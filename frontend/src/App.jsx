import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import './App.css';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function App() {
  const [habits, setHabits] = useState([]);
  const [completions, setCompletions] = useState({});
  const [newHabitName, setNewHabitName] = useState('');
  
  //(workshop) TO DO: Set up useEffectto fetch habits db from server

  const toggleCompletion = (habitId, day) => {
    const key = `${habitId}-${day}`;
    setCompletions(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const addHabit = () => {
    if (newHabitName.trim()) {
      const newHabit = {
        id: Date.now().toString(),
        name: newHabitName.trim(),
      };
      setHabits([...habits, newHabit]);
      setNewHabitName('');
    }
  };

  const deleteHabit = (habitId) => {
    setHabits(habits.filter(h => h.id !== habitId));
  };

  const calculateCompletion = (habitId) => {
    let completed = 0;
    for (let i = 0; i < DAYS.length; i++) {
      const key = `${habitId}-${DAYS[i]}`;
      if (completions[key]) {
        completed++;
      }
    }
    const percentage = Math.round((completed / DAYS.length) * 100);
    return { completed, total: DAYS.length, percentage };
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        {/* Glass Header */}
        <div className="glass-header">
          <h1 className="main-title">Whiteboard Habit Tracker</h1>
          <p className="subtitle">Track your habits with a clean, visual approach</p>
        </div>

        {/* Whiteboard Card */}
        <div className="whiteboard-card">
          {/* Table */}
          <div className="table-container">
            <table className="habit-table">
              <thead>
                <tr>
                  <th className="habit-col">Habit</th>
                  {DAYS.map(day => (
                    <th key={day} className="day-col">{day}</th>
                  ))}
                  <th className="completion-col">Completion</th>
                  <th className="delete-col"></th>
                </tr>
              </thead>
              <tbody>
                {habits.map(habit => {
                  const { completed, total, percentage } = calculateCompletion(habit.id);
                  return (
                    <tr key={habit.id}>
                      <td className="habit-name">{habit.name}</td>
                      {DAYS.map(day => {
                        const key = `${habit.id}-${day}`;
                        const isCompleted = completions[key];
                        return (
                          <td key={day} className="day-cell">
                            <button
                              onClick={() => toggleCompletion(habit.id, day)}
                              className={`day-button ${isCompleted ? 'completed' : ''}`}
                            >
                              {isCompleted && <div className="day-button-pattern" />}
                            </button>
                          </td>
                        );
                      })}
                      <td className="completion-cell">
                        {completed > 0 ? `${completed}/${total} (${percentage}%)` : '-'}
                      </td>
                      <td className="delete-cell">
                        <button onClick={() => deleteHabit(habit.id)} className="delete-button">
                          <Trash2 className="delete-icon" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Add Habit Form */}
          <form className="add-habit-form" onSubmit={(e) => { e.preventDefault(); addHabit(); }}>
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="New habit name..."
              className="habit-input"
            />
            <button type="submit" className="add-button">
              <Plus className="add-button-icon" />
              Add Habit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;