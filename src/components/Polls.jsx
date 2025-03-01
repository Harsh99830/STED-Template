import { useState } from "react";
import PollTimer from "./PollTimer";
import PollLeaderboard from "./PollLeaderboard";
import { db } from "../firebaseConfig";
import { ref, push } from "firebase/database";

export default function Polls({ question, options, pollId, studentRegNumber }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isLeaderboardEnabled, setIsLeaderboardEnabled] = useState(false);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      const pollRef = ref(db, `polls/${pollId}/responses`);
      push(pollRef, {
        studentId: studentRegNumber,
        answer: selectedOption,
      });
      setIsSubmitDisabled(true);
    }
  };

  const handleTimerEnd = () => {
    setIsSubmitDisabled(true);
    setIsLeaderboardEnabled(true);
  };

  return (
    <div className="poll-container">
      <h2>{question}</h2>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOptionSelect(option)}
          disabled={isSubmitDisabled}
          className={selectedOption === option ? "selected" : ""}
        >
          {option}
        </button>
      ))}
      <br />
      <button onClick={handleSubmit} disabled={isSubmitDisabled}>
        Submit Answer
      </button>

      <PollTimer onTimerEnd={handleTimerEnd} />

      <button disabled={!isLeaderboardEnabled}>
        View Leaderboard
      </button>

      {isLeaderboardEnabled && <PollLeaderboard pollId={pollId} />}
    </div>
  );
}
