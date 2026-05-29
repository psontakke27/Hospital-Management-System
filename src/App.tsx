
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import LoginPage from './components/login/LoginPage';
import SignupPage from './components/signup/signupPage';
import AdminPage from './components/admin/adminPage';
import HospitalForm from './components/hospital/hospitalPage';
import DepartmentPage from './components/department/departmentPage';
import RoomPage from './components/room/roomPage';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        {/* default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path='/hospital' element={<HospitalForm/>}/>
        <Route path='/:hospitalId/department' element={<DepartmentPage/>}/>
        <Route path='/:hospitalId/:departmentId/room' element={<RoomPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

