import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue, set } from "firebase/database";

export default function PollLeaderboard({ pollId }) {
  const [pollData, setPollData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(8);
  const [pollStarted, setPollStarted] = useState(false);

  useEffect(() => {
    const pollRef = ref(db, `polls/${pollId}`);
    onValue(pollRef, (snapshot) => {
      if (snapshot.exists()) {
        setPollData(snapshot.val());
      }
    });
  }, [pollId]);

  useEffect(() => {
    let timer;
    if (pollStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [pollStarted, timeLeft]);

  const handleStartPoll = () => {
    setPollStarted(true);
    setTimeLeft(8);
  };

  const handleVote = () => {
    if (selectedOption && pollId) {
      const voteRef = ref(db, `polls/${pollId}/options/${selectedOption}/votes`);
      set(voteRef, (pollData.options[selectedOption].votes || 0) + 1);
      setSubmitted(true);
    }
  };

  return (
    <div className="poll-container">
      {pollData ? (
        <>
          <h2>{pollData.question}</h2>
          {Object.keys(pollData.options).map((optionKey) => (
            <button
              key={optionKey}
              onClick={() => setSelectedOption(optionKey)}
              disabled={submitted || timeLeft === 0}
              className={selectedOption === optionKey ? "selected" : ""}
            >
              {pollData.options[optionKey].text}
            </button>
          ))}
          <button onClick={handleVote} disabled={submitted || timeLeft === 0}>
            Submit Answer
          </button>
          <button onClick={handleStartPoll} disabled={pollStarted}>
            Start Poll
          </button>
          <p>Time Left: {timeLeft} seconds</p>
          <button disabled={timeLeft > 0}>View Leaderboard</button>
        </>
      ) : (
        <p>Loading poll...</p>
      )}
    </div>
  );
}
