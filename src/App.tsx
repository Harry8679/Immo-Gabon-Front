// import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/layout/Navbar';

const App = () => {

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/inscription' element={<Register />}/>
          <Route path='/connexion' element={<Login />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
