import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Slide1 from "./components/Slide1";
import Slide2 from "./components/Slide2";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Slide1 />} />
        <Route path="/slide-2" element={<Slide2 />} />
      </Routes>
    </Router>
  );
}
