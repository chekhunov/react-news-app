import React from 'react'
import { Route } from 'react-router-dom';
import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'

function App() {
  return (
    <>
      <Header />

      <Route path="/" exact render={() => <Home />} />
      
      <Footer />
    </>
  );
}

export default App;
