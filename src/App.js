import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Reservation from './pages/Reservation';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Switch>
          <Route path="/" exact element={<Dashboard/>}/>
          <Route path="/reservation" element={<Reservation/>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
