import "../App.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig"; // Import Firebase Database
import { ref, set, onValue } from "firebase/database"; // Firebase functions

export default function FullPageScroll({ sections, colors, nextSlide, prevSlide }) {
  const navigate = useNavigate();
  const sectionsRef = useRef([]);
  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    setIndex(0); // Reset to first section when slide changes
  }, [sections]);

  const scrollToSection = (newIndex) => {
    if (newIndex >= 0 && newIndex < sections.length) {
      setIndex(newIndex);
      sectionsRef.current[newIndex]?.scrollIntoView({ behavior: "smooth" });
      
      const isTeacher = window.location.pathname.includes("teacher");
      if (isTeacher) {
        set(ref(db, "teacherSlide"), newIndex); // ✅ Update Firebase
      }
      
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 700);
    }
  };

  // ✅ Sync students with teacher’s slide index
  useEffect(() => {
    const slideRef = ref(db, "teacherSlide");
    return onValue(slideRef, (snapshot) => {
      const slideIndex = snapshot.val();
      if (slideIndex !== null) {
        setIndex(slideIndex);
        
        // Ensure the correct section is shown
        setTimeout(() => {
          sectionsRef.current[slideIndex]?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    });
  }, []);

  // ✅ Sync student and teacher route
  useEffect(() => {
    const routeRef = ref(db, "teacherRoute");
    return onValue(routeRef, (snapshot) => {
      const newRoute = snapshot.val();
      const isTeacher = window.location.pathname.includes("teacher");
    
      if (newRoute) {
        if (isTeacher) {
          navigate(newRoute, { replace: true });
        } else {
          navigate(newRoute.replace("teacher-", ""), { replace: true });
          
          // Reset index and ensure the first section is visible for students
          setTimeout(() => {
            setIndex(0);
            sectionsRef.current[0]?.scrollIntoView({ behavior: "instant" });
          }, 100);
        }
      }
    });
  }, [navigate, sectionsRef]);

  const handleScroll = (event) => {
    if (isScrolling) return;
    event.preventDefault();
    
    const isTeacher = window.location.pathname.includes("teacher");
    
    if (isTeacher) {
      if (event.deltaY > 50) {
        scrollToSection(index + 1);
      } else if (event.deltaY < -50) {
        scrollToSection(index - 1);
      }
    }
  };

  const handleKeyDown = (event) => {
    const isTeacher = window.location.pathname.includes("teacher");
  
    if (event.key === "ArrowRight" && nextSlide) {
      navigate(nextSlide);
      setIndex(0);
  
      if (isTeacher) {
        set(ref(db, "teacherRoute"), nextSlide);
        setTimeout(() => set(ref(db, "teacherSlide"), 0), 300);
      }
    } else if (event.key === "ArrowLeft" && prevSlide) {
      navigate(prevSlide);
      setIndex(0);
  
      if (isTeacher) {
        set(ref(db, "teacherRoute"), prevSlide);
        setTimeout(() => set(ref(db, "teacherSlide"), 0), 300);
      }
    } else if (event.key === "ArrowDown") {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        scrollToSection(newIndex);
        return newIndex;
      });
    } else if (event.key === "ArrowUp") {
      setIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        scrollToSection(newIndex);
        return newIndex;
      });
    }
  };
  
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div onWheel={handleScroll} className="container">
      {sections.map((section, i) => (
        <section
          key={i}
          ref={(el) => (sectionsRef.current[i] = el)}
          className="section"
          style={{ backgroundColor: colors[i] }}
        >
          {section}
        </section>
      ))}
      {window.location.pathname.includes("teacher") && (
        <div className="route-buttons">
          {prevSlide && <button onClick={() => navigate(prevSlide)}>←</button>}
          {nextSlide && <button onClick={() => navigate(nextSlide)}>→</button>}
        </div>
      )}
    </div>
  );
}
