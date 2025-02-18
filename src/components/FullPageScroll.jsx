import "../App.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function FullPageScroll({ sections, colors, nextSlide, prevSlide, role }) {
  const navigate = useNavigate();
  const location = useLocation();
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

      if (role === "teacher") {
        localStorage.setItem("currentSection", newIndex); // Sync section scroll
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

  const changeSlide = (slide) => {
    if (role === "teacher") {
      localStorage.setItem("currentSlide", slide); // Save teacher's slide for students
    }
    navigate(slide);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") scrollToSection(index + 1);
    else if (event.key === "ArrowUp") scrollToSection(index - 1);
    else if (event.key === "ArrowRight" && nextSlide) changeSlide(nextSlide);
    else if (event.key === "ArrowLeft" && prevSlide) changeSlide(prevSlide);
  };

  // Sync students with teacher's scroll position
  useEffect(() => {
    if (role === "student") {
      const syncScroll = () => {
        const storedSection = localStorage.getItem("currentSection");
        if (storedSection !== null) {
          setIndex(Number(storedSection));
          sectionsRef.current[Number(storedSection)]?.scrollIntoView({ behavior: "smooth" });
        }
      };

      syncScroll();
      window.addEventListener("storage", syncScroll);

      return () => {
        window.removeEventListener("storage", syncScroll);
      };
    }
  }, [role]);

  // Sync students with teacher's slide navigation
  useEffect(() => {
    if (role === "student") {
      const syncSlide = () => {
        const teacherSlide = localStorage.getItem("currentSlide");
        if (teacherSlide && teacherSlide !== location.pathname) {
          navigate(teacherSlide.replace("teacher-slide", "slide"));
        }
      };

      syncSlide();
      window.addEventListener("storage", syncSlide);

      return () => {
        window.removeEventListener("storage", syncSlide);
      };
    }
  }, [role, location.pathname]);

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
        {prevSlide && <button onClick={() => changeSlide(prevSlide)}>←</button>}
        {nextSlide && <button onClick={() => changeSlide(nextSlide)}>→</button>}
      </div>
    </div>
  );
}
