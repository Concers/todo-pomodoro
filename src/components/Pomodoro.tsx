import React, { useState, useEffect } from "react";

const Pomodoro: React.FC = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [pomodoroLength, setPomodoroLength] = useState(25);
  const [showInput, setShowInput] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
          setSeconds(59);
        } else {
          setIsRunning(false);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds]);

  const startTimer = () => {
    setIsRunning(true);
    setShowInput(false);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setMinutes(pomodoroLength);
    setSeconds(0);
    setIsRunning(false);
    setShowInput(true);
  };

  const handlePomodoroLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPomodoroLength = parseInt(event.target.value, 10);
    if (!isNaN(newPomodoroLength)) {
      setPomodoroLength(newPomodoroLength);
      setMinutes(newPomodoroLength);
      setSeconds(0);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <h1 className="text-2xl font-bold mb-4">Pomodoro Timer</h1>
      {showInput && (
        <div className="text-center mb-4">
          <input
            type="number"
            className="text-center border border-gray-400 p-2 rounded"
            value={pomodoroLength}
            onChange={handlePomodoroLengthChange}
          />
        </div>
      )}
      <div className="text-center mb-4">
        <span className="text-6xl">
          {minutes < 10 ? "0" + minutes : minutes}:
          {seconds < 10 ? "0" + seconds : seconds}
        </span>
      </div>
      <div className="flex justify-center space-x-4">
        {!isRunning && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={startTimer}
          >
            Start
          </button>
        )}
        {isRunning && (
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            onClick={pauseTimer}
          >
            Pause
          </button>
        )}
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
