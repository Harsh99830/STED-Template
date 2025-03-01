import { useState, useEffect } from "react";

export default function PollTimer({ onTimerEnd }) {
  const [timeLeft, setTimeLeft] = useState(8);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
      onTimerEnd(); // Notify Polls.jsx that the timer has ended
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onTimerEnd]);

  const startTimer = () => {
    setIsRunning(true);
  };

  return (
    <div className="poll-timer">
      <p>Time Left: {timeLeft} sec</p>
      {!isRunning && (
        <button onClick={startTimer} className="start-btn">
          Start Poll
        </button>
      )}
    </div>
  );
}
