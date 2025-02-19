import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Slide1 from "./components/Slide1";
import Slide2 from "./components/Slide2";
import T_Slide1 from "./teacher/T_Slide1";
import T_Slide2 from "./teacher/T_Slide2";
import Main from "./components/Main";
export default function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Main/>} />
        <Route path="/slide-1" element={<Slide1 />} />
        <Route path="/slide-2" element={<Slide2 />} />
        <Route path="/teacher-slide-1" element={<T_Slide1/>} />
        <Route path="/teacher-slide-2" element={<T_Slide2/>} />
      </Routes>
    </Router>
  );
}
