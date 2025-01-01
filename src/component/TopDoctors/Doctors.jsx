import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './doctors.css';
import axios from 'axios';

const TopDoctors = () => {
    const [Usedoctors, Setdoctors] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // Track loading state
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const getDoctors = async () => {
        try {
            const res = await axios.get("https://prescripto-backend.up.railway.app/mng/alldoctors");
            if(res.data.length > 5) {
                res.data.length = res.data.length - 5  
            }
            Setdoctors(res.data || []); // Fallback to an empty array if `res.data` is undefined
            setLoading(false); // Stop loading once data is fetched
        } catch (e) {
            console.error("Error While Getting Data From Server", e);
            setLoading(false); // Stop loading in case of an error
        }
    };

    useEffect(() => {
        getDoctors();
    }, []); // Empty dependency array to run only once

    const handleDoctorClick = (doctorId) => {
        navigate(`/doctor/${doctorId}`); // Navigate to the doctor's detail page
    };

    if (loading) {
        return (
            <div className="loader-overlay">
                <div className="loader"></div>
            </div>
        ); // Show loader while fetching data
    }

    return (
        <div className="top-doctors">
            <div className="heading">
                <h1>Top Doctors to Book</h1>
                <div className="p">
                    <p>Simply browse through our extensive list of trusted doctors.</p>
                </div>
            </div>
            <div className="top_doctors">
                {Usedoctors.length > 0 ? (
                    Usedoctors.map((e, index) => (
                        <div
                            className="doctor"
                            key={index}
                            onClick={() => handleDoctorClick(e._id)} // Pass the doctor's ID to the handler
                            style={{ cursor: "pointer" }} // Add a pointer cursor to indicate interactivity
                        >
                            <div className="img">
                                <img
                                    src={
                                        e.profilepic ||
                                        "https://res.cloudinary.com/dzalji6cp/image/upload/v1735307774/uploads/profilePic-1735307776476.png"
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="desc">
                                <div className="available">
                                    <p className="green-n"></p>
                                    <p>Available</p>
                                </div>
                                <p className="he">DR.{e.username}</p>
                                <p>{e.job}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No doctors found</p> // If no doctors are available, display this message
                )}
            </div>
        </div>
    );
};

export default TopDoctors;
