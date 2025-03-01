import "../style/Main.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig"; // Ensure correct Firebase import
import { ref, get, set } from "firebase/database";

const Main = () => {
  const [regNumber, setRegNumber] = useState("");
  const [students, setStudents] = useState({});
  const navigate = useNavigate();

  // Fetch all students on component mount
  useEffect(() => {
    const studentsRef = ref(db, "students");
    get(studentsRef).then((snapshot) => {
      if (snapshot.exists()) {
        setStudents(snapshot.val());
      }
    });
  }, []);

  const handleSubmit = async () => {
    if (!regNumber.trim()) {
      alert("Please enter your registration number");
      return;
    }

    if (students[regNumber]) {
      const studentData = students[regNumber];
      const loginTime = new Date().toLocaleTimeString(); // Get current time

      // Data to store in "presentStudents"
      const presentStudentData = {
        name: studentData.name,
        regNumber: regNumber,
        time: loginTime,
      };

      // Store student data in Firebase
      const presentRef = ref(db, `presentStudents/${regNumber}`);
      await set(presentRef, presentStudentData);

      // Store data in localStorage
      localStorage.setItem("regNumber", regNumber);
      localStorage.setItem("studentName", studentData.name);
      localStorage.setItem("loginTime", loginTime);

      // Redirect to "/slide-1"
      navigate("/slide-1");
    } else {
      alert("Invalid Registration Number!");
    }
  };

  return (
    <div className="container">
      <h2 className="regHeading">Enter Your Registration Number</h2>
      <input
        type="text"
        placeholder="Reg. No."
        value={regNumber}
        onChange={(e) => setRegNumber(e.target.value)}
        className="regInput"
      />
      <button onClick={handleSubmit} className="regBtn">
        Submit
      </button>
    </div>
  );
};

export default Main;
