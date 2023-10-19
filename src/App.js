import './App.css';
import Navbar from './components/navbar'
import { Button } from 'react-bootstrap';
import Home from './pages/home'
import Sell from './pages/sell'
import About from './pages/about'
import Contact from './pages/contact'
import SellerLogin from './pages/authentications/sellerLogin'
import SellProducts from './pages/authentications/sellProducts'
import SellerRegister from './pages/authentications/sellerRegister'
import SellerDashboard from './pages/authentications/sellerDashboard'
import Register from './pages/register'
import Login from './pages/login'
import {UserProvider} from './context/context'
import {BrowserRouter as Router, Route, Routes}  from  'react-router-dom'

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/sell' element={<Sell />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/about' element={<About />} />
            <Route path='/register' element={<Register />} />
            <Route path='/sellerLogin' element={<SellerLogin />} />
            <Route path='/sellerRegister' element={<SellerRegister />} />
            <Route path='/sellerDashboard' element={<SellerDashboard />} />
            <Route path='/sellProducts' element={<SellProducts />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
      </UserProvider> 
    </div>
  );
}

export default App;
