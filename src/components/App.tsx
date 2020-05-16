import React from 'react';
import '../assets/css/App.css';
import Header from './Header';


function App() {
  const user = { user :'me' }
  return (
    <div className="App">
      <div className="App-header">
        <Header {...user}/>
        <main>
          Contents...
        </main>
      </div>
    </div>
  );
}

export default App;
