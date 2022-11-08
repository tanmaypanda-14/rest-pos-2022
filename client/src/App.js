import 'antd/dist/antd.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.js'
import Items from './pages/Items.js'
import Cart from './pages/Cart.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/items" element={<Items />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
    );
}

export default App;
