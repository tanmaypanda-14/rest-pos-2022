import 'antd/dist/antd.min.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home.js'
import Items from './pages/Items.js'
import Cart from './pages/Cart.js'
import Register from './pages/Register.js'
import Login from './pages/Login.js'
import Bills from './pages/Bill.js';
import Customers from './pages/Customer.js';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/items" element={<ProtectedRoute><Items /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/bills" element={<ProtectedRoute><Bills /></ProtectedRoute>} />
        <Route path="/customer" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
    );
}

export default App;


export function ProtectedRoute({children}){

  if(localStorage.getItem('rest-user'))
  {
    return children
  }
  else{
    return <Navigate to='/login' />
  }

}
