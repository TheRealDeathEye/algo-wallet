import './App.css';
import Home from './components/home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  document.body.style = 'background: black;'
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
