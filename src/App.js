import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Footer from "./Footer";
import StudentForm from './StudentForm';
import EmployeeForm from './EmployeeForm';
import './App.css';
import Form3 from './Form3';

function App() {
  return (
    <Router>
      {/* <EmployeeForm/> */}
      <Header/>
      <StudentForm/>
      {/* <Form3/> */}
      <Footer/>
    </Router>
  );
}

export default App;
