import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import FullPageScroll from "./FullPageScroll";
import Polls from "./Polls";

export default function Slide1() {
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("studentName");
    if (name) {
      setStudentName(name);
      if (!sessionStorage.getItem("alertShown")) {
        alert(`Welcome, ${name}!`);
        sessionStorage.setItem("alertShown", "true");
      }
    }
  }, []);

  const sections = [
    <div key="section-1" className="section-content">
      <h1>Welcome, {studentName}!</h1>
      <p>This is a customizable section.</p>
      <img src="https://via.placeholder.com/300" alt="Placeholder" />
    </div>,
    <div key="section-2" className="section-content">
      <Polls role="student" pollId="poll1" /> {/* First poll */}
    </div>,
    <div key="section-3" className="section-content">
      <Polls role="student" pollId="poll2" /> {/* Second poll */}
    </div>,
  <div key="section-4" className="section-content">
  <Polls role="student" pollId="poll2" /> {/* Second poll */}
</div>,
  ];

  const colors = ["#3498db", "#e74c3c", "#2ecc71"];

  return <FullPageScroll sections={sections} colors={colors} nextSlide="/slide-2" />;
}