import FullPageScroll from "./FullPageScroll";
import FeedbackForm from "./FeedbackForm";

export default function Slide2() {
  const sections = [
    <div className="section-content">
      <h1>Section 4</h1>
      <p>Different content here.</p>
    </div>,
    <div className="section-content">
      <h1>Section 5</h1>
      <p>Another customizable section.</p>
    </div>,
    <div className="section-content">
      <h1>Section 6</h1>
      <p>Modify this as needed.</p>
    </div>,
    <FeedbackForm />, // Imported FeedbackForm Component
  ];

  const colors = ["#9b59b6", "#f1c40f", "#1abc9c", "#e67e22"];

  return <FullPageScroll sections={sections} colors={colors} prevSlide="/slide-1" />;
}
