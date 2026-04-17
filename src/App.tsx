
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import LoginPage from './components/login/LoginPage';
import SignupPage from './components/signup/signupPage';
import AdminPage from './components/admin/adminPage';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        {/* default */}
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

