import 'antd/dist/antd.min.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home.js'
import Items from './pages/Items.js'
import Cart from './pages/Cart.js'
import Register from './pages/Register.js'
import Login from './pages/Login.js'
import Bills from './pages/Bill.js';
import Customers from './pages/Customer.js';
import Orders from './pages/Orders.js';
import Stats from './pages/Stats.js';
import Noauth from './pages/Noauth.js';
import Settings from './pages/Settings.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<ProtectedRouteEmployee><Home /></ProtectedRouteEmployee>} />
        <Route path="/items" element={<ProtectedRouteAdmin><Items /></ProtectedRouteAdmin>} />
        <Route path="/cart" element={<ProtectedRouteEmployee><Cart /></ProtectedRouteEmployee>} />
        <Route path="/orders" element={<ProtectedRouteEmployee><Orders /></ProtectedRouteEmployee>} />
        <Route path="/bills" element={<ProtectedRouteEmployee><Bills /></ProtectedRouteEmployee>} />
        <Route path="/customer" element={<ProtectedRouteAdmin><Customers /></ProtectedRouteAdmin>} />
        <Route path="/noauth" element={<ProtectedRouteEmployee><Noauth /></ProtectedRouteEmployee>} />
        <Route path="/stats" element={<ProtectedRouteAdmin><Stats /></ProtectedRouteAdmin>} />
        <Route path="/settings" element={<ProtectedRouteAdmin><Settings /></ProtectedRouteAdmin>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//Employee basic route 
// access to home, cart, orders, bills
export function ProtectedRouteEmployee({ children }) {

  if (localStorage.getItem('rest-user')) {
    return children
  }
  else {
    return <Navigate to='/login' />
  }

}
//Admin route
// access to home, cart, orders, bills, customer, items
export function ProtectedRouteAdmin({ children }) {
  if (localStorage.getItem('rest-user') && JSON.parse(localStorage.getItem('rest-user')).roles === 'admin') {
    return children
  }
  else {
    return <Navigate to='/noauth' />
  }
}
