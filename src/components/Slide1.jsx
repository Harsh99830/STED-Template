import FullPageScroll from "./FullPageScroll";

export default function Slide1() {
  const sections = [
    <div className="section-content">
      <h1>Welcome to Section 1</h1>
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
    </div>,
  ];

  const colors = ["#3498db", "#e74c3c", "#2ecc71"];

  return <FullPageScroll sections={sections} colors={colors} nextSlide="/slide-2" role="student" />;
}
