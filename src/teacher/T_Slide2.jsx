import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";
import FullPageScroll from "../components/FullPageScroll";

export default function T_Slide2() {
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
      <h1>Teachers Section 4</h1>
      <p>Different content here.</p>
    </div>,
    <div className="section-content">
      <h1>Section 5</h1>
      <p>Another customizable section.</p>
    </div>,
    <div className="section-content">
      <h1>Section 6</h1>
      <p>Modify this as needed.</p>
    </div>
  ];

  const guideSections = [
    <div>
      <h2>Guide for slide 2 Section 1</h2>
      <p>This is the guide content for section 1.</p>
    </div>,
    <div>
      <h2>Guide for slide 2 Section 2</h2>
      <p>This is the guide content for section 2.</p>
    </div>,
    <div>
      <h2>Guide for slide 2 Section 3</h2>
      <p>This is the guide content for section 3.</p>
    </div>
  ];

  const colors = ["#9b59b6", "#f1c40f", "#1abc9c"];

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
        prevSlide="/teacher-slide-1"
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
                    <strong>{student.name}</strong> (Reg No: {student.regNumber}) - Joined at {student.time}
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
