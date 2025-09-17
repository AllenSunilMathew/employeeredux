import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Edit from "./Pages/Edit";
import AddData from "./Pages/AddData";
import Pnf from "./Pages/Pnf";
import Header from "./Compoents/Header";
import Footer from "./Compoents/Footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/add" element={<AddData />} />
          <Route path="/*" element={<Pnf />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
