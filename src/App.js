// import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Header from "./components/Header";
function App() {
  return (
      <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <style jsx>{`
      body {
        background-color: #f6f3f1;
      }
      `}</style>
    </Router>
  );
}

export default App;
