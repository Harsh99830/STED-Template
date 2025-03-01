import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue, set, update } from "firebase/database";
import PollLeaderboard from "./PollLeaderboard";

const Polls = ({ role, pollId }) => {
  const [pollActive, setPollActive] = useState(false);
  const [leaderboardEnabled, setLeaderboardEnabled] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [pollData, setPollData] = useState(null);

  // Fetch poll data based on pollId
  useEffect(() => {
    const pollRef = ref(db, `polls/${pollId}`);
    onValue(pollRef, (snapshot) => {
      if (snapshot.exists()) {
        const pollData = snapshot.val();
        setPollData(pollData);
        setPollActive(pollData.isActive);

        if (pollData.isActive && pollData.startTime) {
          const elapsedTime = Date.now() - pollData.startTime;
          const remainingTime = Math.max(0, 8000 - elapsedTime);
          setSecondsRemaining(Math.floor(remainingTime / 1000));

          // Update remaining time every second
          const interval = setInterval(() => {
            const updatedElapsedTime = Date.now() - pollData.startTime;
            const updatedRemainingTime = Math.max(0, 8000 - updatedElapsedTime);
            setSecondsRemaining(Math.floor(updatedRemainingTime / 1000));

            if (updatedRemainingTime <= 0) {
              clearInterval(interval);
              setLeaderboardEnabled(true);
            }
          }, 1000);

          return () => clearInterval(interval);
        }
      }
    });
  }, [pollId]);

  // Start Poll Function (for teachers)
  const startPoll = () => {
    const pollRef = ref(db, `polls/${pollId}`);
    const startTime = Date.now();
    set(pollRef, {
      ...pollData,
      isActive: true,
      startTime: startTime,
    });

    // Disable poll after 8 seconds
    setTimeout(() => {
      update(pollRef, { isActive: false });
      setPollActive(false);
      setLeaderboardEnabled(true);
    }, 8000);
  };

  // Submit Poll Function (for students)
  const submitPoll = async () => {
    if (selectedOption) {
      const studentName = localStorage.getItem("studentName");
      if (!studentName) {
        alert("Please log in to submit your response.");
        return;
      }

      const pollRef = ref(db, `polls/${pollId}/options/${selectedOption}`);
      onValue(pollRef, (snapshot) => {
        if (snapshot.exists()) {
          const optionData = snapshot.val();
          const voters = Array.isArray(optionData.voters) ? optionData.voters : [];
          const updatedVoters = [...voters, studentName];
          const updatedCount = optionData.count + 1;

          update(pollRef, { count: updatedCount, voters: updatedVoters })
            .then(() => {
              alert("Response submitted!");
            })
            .catch((error) => {
              console.error("Error updating poll:", error);
            });
        }
      }, { onlyOnce: true });
    }
  };

  return (
    <div>
      {role === "teacher" ? (
        <>
          <h1>Poll Section</h1>
          <p>Click the button to start the poll.</p>
          <button onClick={startPoll} disabled={pollActive}>
            Start Poll
          </button>
          {pollActive && <p>Time remaining: {secondsRemaining} seconds</p>}
        </>
      ) : (
        <>
          <h1>Poll Section</h1>
          {pollActive ? (
            <>
              <p>{pollData?.question}</p>
              <form>
                {pollData &&
                  Object.keys(pollData.options).map((option) => (
                    <label key={option}>
                      <input
                        type="radio"
                        name="pollOption"
                        value={option}
                        onChange={(e) => setSelectedOption(e.target.value)}
                      />
                      {option}
                    </label>
                  ))}
              </form>
              <button onClick={submitPoll}>Submit</button>
              <p>Time remaining: {secondsRemaining} seconds</p>
            </>
          ) : (
            leaderboardEnabled && pollData && (
              <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
                <PollLeaderboard pollData={pollData} />
              </div>
            )
          )}
        </>
      )}
    </div>
  );
};

export default Polls;