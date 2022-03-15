import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";



function App() {
  return (
    <>
      <Navbar></Navbar>
     <h1>this is notebook </h1>
    </>
  );
}

export default App;
