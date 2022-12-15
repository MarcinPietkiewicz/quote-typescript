import React from 'react';
import "./App.css";
import QuoteBox from "./QuoteBox/QuoteBox";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="title">Inspirational Quotes</div>
      </header>
      <main>
        <QuoteBox />
      </main>
    </div>
  );
}

export default App;
