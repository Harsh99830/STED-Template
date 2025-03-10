import '../App.css'
import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

export default function TeacherFeedbackList() {
  const [feedbackStudents, setFeedbackStudents] = useState([]);

  useEffect(() => {
    const feedbackRef = ref(db, "feedback");
    onValue(feedbackRef, (snapshot) => {
      if (snapshot.exists()) {
        const feedbackData = Object.entries(snapshot.val()).map(([studentName, feedbackEntries]) => {
          const latestFeedback = Object.values(feedbackEntries).pop(); // Get the latest feedback entry
  
          return {
            name: studentName,
            regNumber: latestFeedback.regNumber || "N/A", // Fetch correct reg number
          };
        });
        setFeedbackStudents(feedbackData);
      } else {
        setFeedbackStudents([]);
      }
    });
  }, []);

  return (
    <div className="section-content">
      <h1>Students Who Submitted Feedback</h1>
      {feedbackStudents.length > 0 ? (
        <div className="table-container">
          <table className="feedback-table">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Registration Number</th>
              </tr>
            </thead>
            <tbody>
              {feedbackStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.regNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No feedback submitted yet.</p>
      )}
    </div>
  );
}
