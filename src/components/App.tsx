import React from 'react';
import '../assets/css/App.css';
import Header from './Header';
import Counter from './Counter';
import Counter2 from './Counter2';
import Todo from './Todo';
import TodoWithReducer from './TodoWithReducer';


function App() {
  const user = { user :'me' }
  return (
    <div className="App">
      <div className="App-header">
        <Header {...user}/>
        <main>
          <Counter initCount={0}/>
          <Counter2 />
          <Todo/>
          <TodoWithReducer/>
          Contents...
        </main>
      </div>
    </div>
  );
}

export default App;
