import React, { useEffect } from 'react';
import './Box.css'
import { useNavigate } from 'react-router-dom';
const BlueBox = () => {
  const Navigate = useNavigate()
// 612
  const GoToDoctors = () => {
    Navigate('/allDoctors')
  }
  return (
    <div className='box'>
      <div className="text-desc">
        <h1>Book Appointment
        With Trusted Doctors</h1>
        <div className="desc">
            <img src="https://prescripto.vercel.app/assets/group_profiles-BCL6AVF5.png" alt="" />
            <p>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        </div>
        <div className="btn">
            <button onClick={GoToDoctors}>Book Appoiment<img src="data:image/svg+xml,<svg%20width='16'%20height='12'%20viewBox='0%200%2016%2012'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'><path%20d='M1%206H15M15%206L10.8378%201M15%206L10.8378%2011'%20stroke='%23595959'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/></svg>" alt="" /></button>
        </div>
      </div>
      <div className="img"></div>
    </div>
  );
};

export default BlueBox;