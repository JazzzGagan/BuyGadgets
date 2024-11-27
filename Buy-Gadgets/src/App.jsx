import { Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Home from './Components/Home/Home'
import CartItems from './Pages/CartPage'
import MacBookAirs from './Pages/Apple/MacBookAirs'
import MacBookAirInfo from './Pages/Apple/MacBookAirInfo'
import MacBookPros from './Pages/Apple/MacBookPros'
import MacBookProInfo from './Pages/Apple/MacBookProInfo'
import InEar from './Pages/Marshall/InEar'
import InEarInfo from './Pages/Marshall/InEarInfo'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="/macbook-air" element={<MacBookAirs />} />
          <Route
            path="/macbook-air/:ProductName"
            element={<MacBookAirInfo />}
          />
          <Route path="/macbook-pro" element={<MacBookPros />} />
          <Route
            path="/macbook-pro/:ProductName"
            element={<MacBookProInfo />}
          />
          <Route path="/cartitems" element={<CartItems />} />
          <Route path="/inear" element={<InEar />} />
          <Route path="/inear/:ProductName" element={<InEarInfo />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
