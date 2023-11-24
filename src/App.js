import logo from './logo.svg';
import './App.css';

import Game from './components/Game';

function App() {
  return (
    <div class="relative h-16">
    <div class="absolute p-4 text-center transform -translate-x-1/2 left-1/2 border border-solid border-gray-200">
      <h1 className='text-white text-3xl font-bold'>CRSdle</h1>
      <Game />
    </div>
    </div>
  );
}

export default App;
