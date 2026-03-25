import logo from './logo.svg';
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import './App.css';
import LoginScreen from './Components/LoginScreen';
import SignupScreen from './Components/SignUpScreen';
import Navbar from './Components/Navbar';
import CardsScreen from './Components/CardsScreen';
import BankScreen from './Components/BankScreen';
import HomeScreen from './Components/HomeScreen';
import ArticlesScreen from './Components/ArticlesScreen';
import CardDetailsScreen from './Components/CardDetailsScreen';
import ArticleDetailsScreen from './Components/ArticleDetailsScreen';
import LineupOptimizerScreen from './Components/LineupOptimizerScreen';

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
        <Route path="/bank" element={<BankScreen />} />
        <Route path="/articles" element={<ArticlesScreen/>} />
        <Route path="/article-details" element={<ArticleDetailsScreen />} />
        <Route path="/card-details" element={<CardDetailsScreen />} />
        <Route path="/optimizer" element={<LineupOptimizerScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
