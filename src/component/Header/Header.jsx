import React, { useEffect, useState } from 'react';
import './header.css';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState(null); // Tracks whether the user is a patient or a doctor
    const navigate = useNavigate();
    const [IsBlock,SetIsBlock] = useState();
    const changeActiveState = (e) => {
        if (e.target.classList.contains("active")) {
            console.log("You already activated this item.");
            return;
        }

        document.querySelectorAll("li").forEach((li) => li.classList.remove("active"));
        if (e.target.tagName === "LI") {
            e.target.classList.add("active");
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const patientId = window.localStorage.getItem('patient');
            const doctorId = window.localStorage.getItem('doctor');
            const userId = patientId || doctorId;

            if (!userId) {
                setLoading(false);
                return;
            }

            try {
                const [patientsRes, doctorsRes] = await Promise.all([
                    axios.get('https://prescripto-backend.up.railway.app/mng/allpatients'),
                    axios.get('https://prescripto-backend.up.railway.app/mng/alldoctors'),
                ]);

                const patient = patientsRes.data.find((user) => user._id === userId);
                const doctor = doctorsRes.data.find((doc) => doc._id === userId);

                if (patient) {
                    setProfilePic(patient.profilepic || '/default-patient-pic.svg');
                    setUserType('patient');
                } else if (doctor) {
                    setProfilePic(doctor.profilepic || '/default-doctor-pic.svg');
                    setUserType('doctor');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <header>
            <div className="logo">
                <img src="/Logo2.svg" alt="Logo" style={{ width: '11rem', height: 'auto' }} />
            </div>
            <nav className={IsBlock ? 'block' : ''}>
                <li className="Home active" onClick={(e) => {
                    changeActiveState(e);
                    navigate("/");
                }}>HOME</li>
                <li className="alldoctors" onClick={(e) => {
                    changeActiveState(e);
                    navigate("/allDoctors");
                }}>ALLDOCTORS</li>
                    <li className="adminpanel">
                        <button onClick={() => navigate('/adminPanel')}>Admin Panel</button>
                    </li>
            </nav>
            <section className={IsBlock ? 'block' : ''}>
                {loading ? (
                    <p>Loading...</p>
                ) : profilePic ? (
                 
                    <div className='userdata'>
                        <div className="profilePic">
                            <img src={profilePic} alt="Profile" />
                        </div>
                        <div className="LogOut" onClick={() => {
                            if (window.confirm('Are you sure you want to log out?')) {
                                window.localStorage.removeItem(userType); // Remove either 'patient' or 'doctor'
                                window.location.reload();
                            }
                        }}>
                            <button>LogOut</button>
                        </div>
                        {
                            window.localStorage.getItem('doctor') ?
                            <div className="go_dashBoard">
                                <button onClick={()=>navigate('/doctor/dashboard')}>DashBoard</button>
                            </div>
                             : null
                             
                        }
                    </div>
                ) : (
                    <div className="btn">
                        <aside className='create-btn-aside'>
                        <button className="create-btn" onClick={() => navigate('/createAccount')}>
                            Create Account
                        </button>
                        </aside>
                    </div>
                )}
            </section>
            <div className="menu" onClick={()=>{IsBlock ? SetIsBlock(false) : SetIsBlock(true)}}>
                                    <span className='menu-span'></span>
                                    <span className='menu-span'></span>
                                    <span className='menu-span'></span>
                                </div>
        </header>
    );
};

export default Header;
