import FullPageScroll from "../components/FullPageScroll";

export default function T_Slide1() {
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
    <FullPageScroll
      sections={sections}
      colors={colors}
      nextSlide="/teacher-slide-2"
      prevSlide="/teacher-slide-0"
      guideSections={guideSections}
    />
  );
}