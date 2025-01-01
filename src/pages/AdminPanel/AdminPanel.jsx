import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './adminpanel.css';

const AdminPanel = () => {
    const [admin, setAdmin] = useState();

    const getAdmin = async () => {
        try {
            const res = await axios.get("https://prescripto-backend.up.railway.app/mng/admin");
            setAdmin(res.data[0]);
        } catch (err) {
            console.error("Error fetching admin data:", err);
        }
    };

    useEffect(() => {
        getAdmin();
    }, []);

    const handleDoctorAction = async (doctor, action) => {
        try {
            const endpoint = action === "accept"
                ? `https://prescripto-backend.up.railway.app/mng/acceptdoctor/${doctor._id}`
                : `https://prescripto-backend.up.railway.app/mng/disagreedoctor/${doctor._id}`;

            await axios.post(endpoint);
            console.log(`Doctor ${action === "accept" ? "accepted" : "denied"}.`);


            // Reload page to reflect changes
            window.location.reload();
        } catch (err) {
            console.error(`Error ${action === "accept" ? "accepting" : "denying"} doctor:`, err);
        }
    };

    return (
        <div className="container">
            {admin ? (
                <div className="admin">
                    <div className="head">
                        <div className="intro-card">
                            <div className="userImg">
                                <img src={admin.profilepic} alt="" />
                            </div>
                            <div className="admin-description">
                                <h1>Hello, <span>{admin.username}</span></h1>
                            </div>
                        </div>
                        <div className="total-appoinments">
                            <div className="data">
                                <h1>All Doctors</h1>
                                <h2>{admin.doctors.length}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="heading">
                        <h1 style={{
                            padding: "20px",
                            color: "rgb(95 111 255 / 1)",
                            borderBottom: "1px solid rgb(173 173 173 / 1)",
                            paddingBottom: "20px"
                        }}>
                            Doctors
                        </h1>
                    </div>
                    <div className="body">
                        {admin.doctors.map((doctor) => (
                            <div className="Data" key={doctor._id}>
                                <div className="patient">
                                    <img src={doctor.profilepic} alt="Patient" />
                                    <h2>{doctor.username}</h2>
                                    <div className="age">
                                        <p>{doctor.age} Years</p>
                                    </div>
                                </div>
                                <div className="btns">
                                    <button className="accept" onClick={() => handleDoctorAction(doctor, "accept")}>Accept</button>
                                    <button className="reject" onClick={() => handleDoctorAction(doctor, "deny")}>Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
};

export default AdminPanel;
