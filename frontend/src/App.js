import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/scss/main.scss';

import RequireAuth from './features/auth/requireAuth';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';

function App() {
  return (
    <>
      <Router>
        <div className='main'>
          <Header />
          <div className='px-6 md:px-[100px]'>
            <Routes>
              {/* public routes */}
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              {/* private routes */}
              <Route element={<RequireAuth />}>
                <Route path='/' element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
