import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home/Home';
import Header from './component/Header/Header';
import { Route, Routes } from 'react-router-dom';
import TopDoctors from './component/TopDoctors/Doctors';
import Doctor from './pages/doctor/Doctor';
import CreateAccount from './pages/createaccount/Create';
import Doctors from './pages/AllDoctors/Doctors';
import Doctor_DashBoard from './pages/Doctor_DashBoard/DoctorDashboard';
import Create_Doctor_Account from './pages/create_doctor_account/CreateDoctorAccount';
import Admin_Panel from './pages/AdminPanel/AdminPanel';
import FindDoctorAccount from './pages/Find_doctor_account/FindDoctorAccount';
import FindAccount from './pages/FindAccount/Findaccount';

function App() {
  function getPage() {
    let PageKind_f = null;
    if(window.localStorage.getItem("doctor")){
      PageKind_f = 'doctor';
    }else if(window.localStorage.getItem("admin")){
      PageKind_f = 'admin';
    }else if(window.localStorage.getItem("patient")){
      PageKind_f = 'patient';
    }
    return PageKind_f;
  }
  const PageKind =  getPage();

  return (
      <>
      <div className='container'>
        <Header></Header>
      </div>
    <Routes>
      (
        {PageKind == 'patient' || null} ?
      <Route path="/" element={<Home />} />
      <Route path="/doctor/:id" element={<Doctor />} />
      <Route path="/createAccount" element={<CreateAccount />} />
      <Route path="/allDoctors" element={<Doctors />} />
      <Route path="/doctor/dashboard" element={<Doctor_DashBoard />} />
      <Route path="/create/doctor" element={<Create_Doctor_Account />} />
      <Route path="/adminPanel" element={<Admin_Panel></Admin_Panel>} />
      <Route path="/findaccount" element={<FindAccount></FindAccount>} />
      <Route path="/find/doctoraccount" element={<FindDoctorAccount />} />
    </Routes>
  )
      </>
  )
}

export default App
