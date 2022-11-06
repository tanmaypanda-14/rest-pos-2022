import 'antd/dist/antd.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.js'
import Items from './pages/Items.js'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </BrowserRouter>
    );
}

export default App;
