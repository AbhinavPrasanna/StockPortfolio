import logo from './logo.svg';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';
import LoginScreen from './Components/LoginScreen';
import SignupScreen from './Components/SignUpScreen';
import Navbar from './Components/Navbar';
import CardsScreen from './Components/CardsScreen';
import SearchScreen from './Components/SearchScreen';
import BankScreen from './Components/BankScreen';
import RatingScreen from './Components/RatingScreen';
import HomeScreen from './Components/HomeScreen';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/cards" element={<CardsScreen />} />
        <Route path="/search" element={<SearchScreen />} />
        <Route path="/bank" element={<BankScreen />} />
        <Route path="/ratings" element={<RatingScreen />} />  
      </Routes>
    </Router>
  );
}

export default App;
