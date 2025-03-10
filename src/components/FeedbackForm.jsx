import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { ref, push } from "firebase/database";
import FullPageScroll from "./FullPageScroll";

export default function FeedbackForm() {
  const [studentName, setStudentName] = useState("");
  const [studentRegNumber, setStudentRegNumber] = useState(""); // New state for registration number
  const [feedback, setFeedback] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    additionalFeedback: "",
  });

  // Fetch Student Name & Registration Number from Local Storage
  useEffect(() => {
    const storedName = localStorage.getItem("studentName");
    const storedRegNumber = localStorage.getItem("regNumber"); // Fetch regNumber

    if (storedName) setStudentName(storedName);
    if (storedRegNumber) setStudentRegNumber(storedRegNumber);
  }, []);

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!studentName || !studentRegNumber) {
      alert("Student details not found. Please log in again.");
      return;
    }
  
    const feedbackRef = ref(db, `feedback/${studentName}`); // Store under studentName
    push(feedbackRef, {
      regNumber: studentRegNumber, // Save registration number properly
      ...feedback,
      submittedAt: new Date().toISOString(),
    })
      .then(() => {
        alert("Feedback submitted successfully!");
        setFeedback({ q1: "", q2: "", q3: "", q4: "", additionalFeedback: "" });
      })
      .catch((error) => {
        console.error("Error submitting feedback:", error);
      });
  };
  


  

  const sections = [
    <div className="section-content">
      <h1>Feedback Form</h1>
      <p>
        Hi, {studentName || "Student"} ({studentRegNumber || "Reg No."})! Please provide your feedback:
      </p>

      <label>1. Did you find the lecture engaging?</label>
      <select name="q1" value={feedback.q1} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <label>2. Was the pace of the lecture comfortable?</label>
      <select name="q2" value={feedback.q2} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Too Fast">Too Fast</option>
        <option value="Just Right">Just Right</option>
        <option value="Too Slow">Too Slow</option>
      </select>

      <label>3. Did the teacher explain concepts clearly?</label>
      <select name="q3" value={feedback.q3} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <label>4. Would you like more interactive elements?</label>
      <select name="q4" value={feedback.q4} onChange={handleChange}>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <label>Additional Comments:</label>
      <textarea name="additionalFeedback" value={feedback.additionalFeedback} onChange={handleChange} />

      <button onClick={handleSubmit}>Submit</button>
    </div>,
  ];

  const colors = ["#9b59b6", "#f1c40f", "#1abc9c", "#e67e22"];

  return <FullPageScroll sections={sections} colors={colors} prevSlide="/slide-1" />;
}
