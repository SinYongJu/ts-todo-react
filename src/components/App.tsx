import React from 'react';
import '../assets/css/App.css';
import Header from './Header';
import Counter from './Counter';


function App() {
  const user = { user :'me' }
  return (
    <div className="App">
      <div className="App-header">
        <Header {...user}/>
        <main>
          <Counter/>
          Contents...
        </main>
      </div>
    </div>
  );
}

export default App;
