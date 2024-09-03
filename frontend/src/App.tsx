import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Compatibility from "./pages/Compatibility";
import Wardrobe from "./pages/Wardrobe";
import Coaches from "./pages/Coaches";
import Customers from "./pages/Customers";
import Statistics from "./pages/Statistics";
import Tips from "./pages/Tips";
import Events from "./pages/Events";
import Nopage from "./pages/Nopage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/compatibility" element={<Compatibility />} />
          <Route path="/wardrobe" element={<Wardrobe />} />
          <Route path="/coaches" element={<Coaches />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/tips" element={<Tips />} />
          <Route path="/events" element={<Events />} />
          <Route path="*" element={<Nopage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
