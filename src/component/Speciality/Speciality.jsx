import React, { useEffect, useState } from 'react';
import './speciality.css';
import axios from 'axios';

const Speciality = () => {
    const [UserserverData, SetserverData] = useState([]); // Initialize as an empty array

    const getData = async () => {
        try {
            const res = await axios.get("https://prescripto-backend.up.railway.app/def/page");
            SetserverData(res.data.types || []); // Fallback to an empty array if `res.data.types` is undefined
        } catch (e) {
            console.error("Error While Getting Data From Server", e);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className='Speciality'>
            <div className="heading">
                <h1>Find by Speciality</h1>
                <div className="p">
                    <p>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
                </div>
            </div>
            <div className="d">
            <div className="data">
                {UserserverData.length > 0 ? (
                    UserserverData.map((element, index) => (
                        <div className="type" key={index}>
                            <img src="https://prescripto.vercel.app/assets/Pediatricians-C6nmx5n8.svg" alt="" />
                            <h1 key={index}>{element}</h1>
                        </div>
                    ))
                ) : (
                    <p>Loading data or no specialities found...</p>
                )}
            </div>
                </div>
        </div>
    );
};

export default Speciality;
