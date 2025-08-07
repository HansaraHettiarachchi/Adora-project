import React from 'react';
import './App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductGrid from './components/ProductGrid';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      <SearchBar />
      <div className="main-content">
        <ProductGrid />
        <Sidebar />
      </div>
      <Footer />
    </div>
  );
}

export default App;
