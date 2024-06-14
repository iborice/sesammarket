import {React,  Suspense} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/PrivateRoute.jsx';
import Login from './components/auth/Login.jsx';
import Home from './components/Home.jsx';

const App = () => {
  return (
    <Suspense fallback="...is loading" >
      <Router>
        <main className='container content'>
          <Routes>
            <Route path='/login' element={<Login/>} />
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Home/>} />
            </Route>
          </Routes>
        </main>
      </Router>
    </Suspense>
  )
};

export default App;