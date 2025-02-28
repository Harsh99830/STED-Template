import React from "react";
import "../App.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { ref, set, onValue } from "firebase/database";

export default function FullPageScroll({ sections, colors, nextSlide, prevSlide, guideSections }) {
  const navigate = useNavigate();
  const sectionsRef = useRef([]);
  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const isTeacher = window.location.pathname.includes("teacher");

  // Reset index when sections change
  useEffect(() => {
    setIndex(0);
  }, [sections]);

  // Scroll to a specific section
  const scrollToSection = (newIndex) => {
    if (newIndex >= 0 && newIndex < sections.length) {
      setIndex(newIndex);
      sectionsRef.current[newIndex]?.scrollIntoView({ behavior: "smooth" });

      // Update the teacher's slide in Firebase if the user is a teacher
      if (isTeacher) {
        set(ref(db, "teacherSlide"), newIndex);
      }

      // Prevent multiple scrolls within 700ms
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 700);
    }
  };

  // Listen for changes to the teacher's slide in Firebase (for students)
  useEffect(() => {
    if (!isTeacher) {
      const slideRef = ref(db, "teacherSlide");
      return onValue(slideRef, (snapshot) => {
        const slideIndex = snapshot.val();
        if (slideIndex !== null) {
          setIndex(slideIndex);
          setTimeout(() => {
            sectionsRef.current[slideIndex]?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      });
    }
  }, [isTeacher]);

  // Listen for changes to the teacher's route in Firebase
  useEffect(() => {
    const routeRef = ref(db, "teacherRoute");
    return onValue(routeRef, (snapshot) => {
      const newRoute = snapshot.val();
      console.log("New Firebase Route:", newRoute);
  
      // Ensure only valid routes are used
      if (newRoute && newRoute !== "/teacher-slide-0") {
        if (isTeacher) {
          navigate(newRoute, { replace: true });
        } else {
          const studentRoute = newRoute.replace("teacher-", "");
          navigate(studentRoute, { replace: true });
          setTimeout(() => {
            setIndex(0);
            sectionsRef.current[0]?.scrollIntoView({ behavior: "instant" });
          }, 100);
        }
      }
    });
  }, [navigate, isTeacher]);
  

  // Handle wheel events for scrolling between sections (for teachers)
  useEffect(() => {
    const handleScroll = (event) => {
      if (isScrolling || !isTeacher) return;
      event.preventDefault();

      if (event.deltaY > 50) {
        scrollToSection(index + 1);
      } else if (event.deltaY < -50) {
        scrollToSection(index - 1);
      }
    };

    const container = document.querySelector(".teacher-container");
    if (container) {
      container.addEventListener("wheel", handleScroll, { passive: false });
    }

    // Cleanup the event listener
    return () => {
      if (container) {
        container.removeEventListener("wheel", handleScroll);
      }
    };
  }, [isScrolling, isTeacher, index]);

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
  if (!isTeacher) return; // Prevent students from using keyboard navigation

  if (event.key === "ArrowRight" && nextSlide) {
    set(ref(db, "teacherRoute"), nextSlide).then(() => {
      console.log("Updated Firebase Route:", nextSlide);
      navigate(nextSlide);
      setTimeout(() => set(ref(db, "teacherSlide"), 0), 300);
    });
  } else if (event.key === "ArrowLeft" && prevSlide) {
    set(ref(db, "teacherRoute"), prevSlide).then(() => {
      console.log("Updated Firebase Route:", prevSlide);
      navigate(prevSlide);
      setTimeout(() => set(ref(db, "teacherSlide"), 0), 300);
    });
  } else if (event.key === "ArrowDown") {
    scrollToSection(index + 1);
  } else if (event.key === "ArrowUp") {
    scrollToSection(index - 1);
  }
};

  

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="main-container">
      <div className={isTeacher ? "teacher-container" : "student-container"}>
        {sections.map((section, i) => (
          <section
            key={i}
            ref={(el) => (sectionsRef.current[i] = el)}
            className={isTeacher ? "teacher-section" : "student-section"}
            style={{ backgroundColor: colors[i] }}
          >
            {section}
          </section>
        ))}
        {isTeacher && (
          <div className="route-buttons">
            {prevSlide && <button onClick={() => navigate(prevSlide)}>←</button>}
            {nextSlide && <button onClick={() => navigate(nextSlide)}>→</button>}
          </div>
        )}
      </div>

      {/* Guide Section */}
      {isTeacher && guideSections && (
        <div className="guide-container">
          <div className="guide-section">
            {guideSections[index]}
          </div>
        </div>
      )}

      {/* Preview Section */}
      {/* Preview Section */}
{/* Preview Section */}
{isTeacher && sections.length > 0 && index + 1 < sections.length && colors[index + 1] && (
  <div className="preview-container">
    <section className="preview-section" style={{ backgroundColor: colors[index + 1] }}>
      <div className="preview-content">
        {React.cloneElement(sections[index + 1], {
          style: { transform: "scale(0.5)", transformOrigin: "center" },
        })}
      </div>
    </section>
  </div>
)}


    </div>
  );
}