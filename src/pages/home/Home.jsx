import React from 'react';
import Header from '../../component/Header/Header';
import BlueBox from '../../component/blueBox/Box';
import Speciality from '../../component/Speciality/Speciality';
import TopDoctors from '../../component/TopDoctors/Doctors';

const Home = () => {
  return (
    <div className='container'>
      <BlueBox></BlueBox>
      <Speciality></Speciality>
      <TopDoctors />
    </div>
  );
};

export default Home;