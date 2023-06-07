import React from 'react';
import Posts from './components/Posts';
import Posts2 from './components/Posts2'
import './App.css';

function App() {

  return (
    <div className="App">
      <h1>Two Ways to use Fetch</h1>
      <p className="text-center">
        Both columns use different versions of fetch, but otherwise use similar calls
      </p>
      <div className="flex">
        <Posts />
        <Posts2 />
      </div>
    </div>
  );
}

export default App;
