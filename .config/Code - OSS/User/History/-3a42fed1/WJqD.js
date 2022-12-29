import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col justify-between h-screen">
        <Navbar/>
        <main className='container mx-auto px-3 pb-12'>
          <Routes>
            <Route path='/' element={<Home/>} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
