import React, { useEffect, useState } from 'react';
import './header.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userType, setUserType] = useState(null); // 'doctor' أو 'patient'
    const [isBlock, setIsBlock] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = () => {
            const patientId = window.localStorage.getItem('patient');
            const doctorId = window.localStorage.getItem('doctor');

            if (doctorId) {
                setUserType('doctor');
            } else if (patientId) {
                setUserType('patient');
            } else {
                setUserType(null);
            }
        };

        const interval = setInterval(checkUser, 1000);

        return () => clearInterval(interval);
    }, []);

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
        <>
            <div className="menu" onClick={() => setIsBlock(!isBlock)}>
                <span className='menu-span'></span>
                <span className='menu-span'></span>
                <span className='menu-span'></span>
            </div>
            <header className={isBlock ? 'block' : ''}>
                <div className="logo">
                    <img src="/Logo2.svg" alt="Logo" style={{ width: '11rem', height: 'auto' }} />
                </div>
                <nav>
                    <li className="Home active" onClick={() => navigate("/")}>HOME</li>
                    <li className="alldoctors" onClick={() => navigate("/allDoctors")}>ALL DOCTORS</li>
                    <li className="adminpanel">
                        <button onClick={() => navigate('/adminPanel')}>Admin Panel</button>
                    </li>
                </nav>
                <section>
                    {loading ? (
                        <p>Loading...</p>
                    ) : profilePic ? (
                        <div className='userdata'>
                            <div className="profilePic">
                                <img src={profilePic} alt="Profile" />
                            </div>
                            <div className="LogOut" onClick={() => {
                                if (window.confirm('Are you sure you want to log out?')) {
                                    window.localStorage.removeItem(userType);
                                    window.location.reload();
                                }
                            }}>
                                <button>LogOut</button>
                            </div>
                            {userType === 'doctor' && (
                                <div className="go_dashBoard">
                                    <button onClick={() => navigate('/doctor/dashboard')}>DashBoard</button>
                                </div>
                            )}
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
            </header>
        </>
    );
};

export default Header;
