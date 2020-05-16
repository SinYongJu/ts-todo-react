import React from 'react';
import '../assets/css/App.css';
import Header from './Header';
import Counter from './Counter';
import Counter2 from './Counter2';


function App() {
  const user = { user :'me' }
  return (
    <div className="App">
      <div className="App-header">
        <Header {...user}/>
        <main>
          <Counter initCount={0}/>
          <Counter2 />
          Contents...
        </main>
      </div>
    </div>
  );
}

export default App;
