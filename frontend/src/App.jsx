import React from 'react'
import Signup from './components/signup'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from './components/login'
 
function App() {
  return (
    <div>
      
<Router>
 
  <Routes>
    <Route path="/" element={<Signup />} />
    <Route path="/login" element={<Login />} />
  </Routes>
</Router>
    </div>
  )
}

export default App
