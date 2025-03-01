import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import FullPageScroll from "../components/FullPageScroll";

export default function T_Slide1() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch real-time student data from Firebase
  useEffect(() => {
    const presentRef = ref(db, "presentStudents");

    onValue(presentRef, (snapshot) => {
      if (snapshot.exists()) {
        const studentData = Object.values(snapshot.val());
        setStudents(studentData);
      } else {
        setStudents([]);
      }
    });
  }, []);

  const sections = [
    <div className="section-content">
      <h1>Welcome to Teachers Section 1</h1>
      <p>This is a customizable section.</p>
      <img src="https://via.placeholder.com/300" alt="Placeholder" />
    </div>,
    <div className="section-content">
      <h1>Explore Section 2</h1>
      <p>More custom content goes here.</p>
      <img src="/bugatti.png" alt="hlo" style={{ marginLeft: "100px" }} />
    </div>,
    <div className="section-content">
      <h1>Final Section</h1>
      <p>Customize this as well.</p>
    </div>
  ];

  const guideSections = [
    <div>
      <h2>Guide for Section 1</h2>
      <p>This is the guide content for section 1.</p>
    </div>,
    <div>
      <h2>Guide for Section 2</h2>
      <p>This is the guide content for section 2.</p>
    </div>,
    <div>
      <h2>Guide for Section 3</h2>
      <p>This is the guide content for section 3.</p>
    </div>
  ];

  const colors = ["#3498db", "#e74c3c", "#2ecc71"];

  return (
    <>
      {/* "Total Students" Button at the top */}
      <div className="total-students-container">
        <button onClick={() => setShowModal(true)} className="total-students-btn">
          Total Students
        </button>
      </div>

      <FullPageScroll
        sections={sections}
        colors={colors}
        nextSlide="/teacher-slide-2"
        role="teacher"
        guideSections={guideSections}
      />

      {/* Modal Popup for Student List */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Present Students</h2>
            <ul>
              {students.length > 0 ? (
                students.map((student, index) => (
                  <li key={index}>
                    <strong>{student.name}</strong> ({student.regNumber}) - Joined at {student.time}
                  </li>
                ))
              ) : (
                <p>No students present</p>
              )}
            </ul>
            <button onClick={() => setShowModal(false)} className="close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
