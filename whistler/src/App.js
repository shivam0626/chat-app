import './App.css';
import Navigation from './components/Navigation';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
       <Navigation />
       <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element ={<Signup />} />
          <Route path='/chat' element={<Chat />} />
       </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={3000} theme='colored' newestOnTop={true} />
    </div>
  );
}

export default App;
