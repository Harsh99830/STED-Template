import FullPageScroll from "../components/FullPageScroll";

export default function T_Slide1() {
  const sections = [
    <div className="section-content">
      <h1>Welcome to Teachers Section 1</h1>
      <p>This is a customizable section.</p>
    </div>,
    <div className="section-content">
      <h1>Explore Section 2</h1>
      <p>More custom content goes here.</p>
    </div>,
    <div className="section-content">
      <h1>Final Section</h1>
      <p>Customize this as well.</p>
    </div>,
  ];

  const colors = ["#3498db", "#e74c3c", "#2ecc71"];

  return <FullPageScroll sections={sections} colors={colors} nextSlide="/teacher-slide-2" role="teacher" />;
}
