import './App.css'
import { useNavigate } from "react-router-dom";

export default function Slide({ index, color, text }) {
  const navigate = useNavigate();

  const goNext = () => {
    if (index < 2) navigate(`/slide-${index + 1}`);
  };

  const goPrev = () => {
    if (index > 0) navigate(index === 1 ? "/" : `/slide-${index - 1}`);
  };

  return (
    <div className="slide" style={{ background: color }}>
      <h1>{text}</h1>

      <div className="nav-buttons">
        <button onClick={goPrev} disabled={index === 0}>←</button>
        <button onClick={goNext} disabled={index === 2}>→</button>
      </div>
    </div>
  );
}
