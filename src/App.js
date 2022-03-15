import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './components/home';

function App() {
  document.body.style = 'background: black;'
  return (
    <div className="App">
      <div>
        <Routes>
          <Route index element={<Home />} /> 
          {/* <Route path='about' element={<About />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
