import FullPageScroll from "./FullPageScroll";

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
  ];

  const colors = ["#9b59b6", "#f1c40f", "#1abc9c"];

  return <FullPageScroll sections={sections} colors={colors} prevSlide="/" />;
}
