import '../App.css'
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db, ref, set, onValue } from "../firebaseConfig";

export default function FullPageScroll({ sections, colors, nextSlide, prevSlide, role }) {
  const navigate = useNavigate();
  const sectionsRef = useRef([]);
  const [index, setIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();

  // Reference in Firebase
  const slideRef = ref(db, "slides/current");

  useEffect(() => {
    if (role === "student") {
      // Listen for slide changes from Firebase
      onValue(slideRef, (snapshot) => {
        if (snapshot.exists()) {
          const newIndex = snapshot.val();
          setIndex(newIndex);
          sectionsRef.current[newIndex]?.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }, []);

  const scrollToSection = (newIndex) => {
    if (newIndex >= 0 && newIndex < sections.length) {
      setIndex(newIndex);
      sectionsRef.current[newIndex]?.scrollIntoView({ behavior: "smooth" });

      // If teacher, update Firebase
      if (role === "teacher") {
        set(slideRef, newIndex);
      }

      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 700);
    }
  };

  const handleScroll = (event) => {
    if (isScrolling) return;
    event.preventDefault();
    if (event.deltaY > 50) scrollToSection(index + 1);
    else if (event.deltaY < -50) scrollToSection(index - 1);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") scrollToSection(index + 1);
    else if (event.key === "ArrowUp") scrollToSection(index - 1);
    else if (event.key === "ArrowRight") nextSlide && navigate(nextSlide);
    else if (event.key === "ArrowLeft") prevSlide && navigate(prevSlide);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index]);

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
      {/* Navigation Buttons */}
      <div className="route-buttons">
        {prevSlide && <button onClick={() => navigate(prevSlide)}>←</button>}
        {nextSlide && <button onClick={() => navigate(nextSlide)}>→</button>}
      </div>
    </div>
  );
}
