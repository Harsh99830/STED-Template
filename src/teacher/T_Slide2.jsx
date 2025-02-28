import FullPageScroll from "../components/FullPageScroll";

export default function T_Slide2() {
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
    </div>,
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

  return <FullPageScroll 
  sections={sections} 
  colors={colors} 
  prevSlide="/teacher-slide-1" 
  role="teacher"
  guideSections={guideSections}
  />

}
