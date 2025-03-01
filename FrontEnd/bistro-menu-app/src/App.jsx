import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Map from './pages/Map';
import Home from './pages/Home';

import { Button, Container } from 'react-bootstrap';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/menu" element={<h2>Menu Page</h2>} /> */}
          <Route path="/Map" element={<Map />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>

      <Container className="text-center mt-4">
        {/* <div className="row">
          <h1>Welcome to Bistro Menu</h1>
        </div> */}

        

        <div className='footer'></div>
      </Container>

    </>
  )
}

export default App
