import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './doctors.css';

const Doctors = () => {
    const [UseallDoctors, SetallDoctors] = useState([]); // State for all doctors
    const [UseallTypes, SetallTypes] = useState([]); // State for doctor categories (types)
    const [filteredDoctors, setFilteredDoctors] = useState([]); // State for filtered doctors
    const [NoFilters, SetNoFilter] = useState(false); // Optional state if you need to toggle filters
    const Navigate = useNavigate();

    const getData = async () => {
        try {
            const res = await axios.get("https://prescripto-back-end.vercel.app/mng/alldoctors");
            const response1 = await axios.get("https://prescripto-back-end.vercel.app/def/page");
            SetallDoctors(res.data); // Set all doctors data
            SetallTypes(response1.data.types); // Set types/categories of doctors
            setFilteredDoctors(res.data); // Initially show all doctors
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        getData(); // Call the function to fetch data on component mount
    }, []); // Empty dependency array ensures this only runs once

    const handleFilter = (category) => {
        if (category === 'All') {
            setFilteredDoctors(UseallDoctors); // Show all doctors if "All" is selected
        } else {
            const filtered = UseallDoctors.filter((doctor) => doctor.job === category);
            setFilteredDoctors(filtered); // Filter doctors by selected job
        }
    };

    return (
        <div className='container'>
            <div className="top-doctors">
                <div className="heading">
                    <h1>Browse through the doctors specialist.</h1>
                    <div className="p">
                        <p>Simply browse Doctors</p>
                    </div>
                    <div className="filters">
                        <div className="filter-buttons">
                            <button onClick={() => handleFilter('All')}>All</button>
                            {UseallTypes.length > 0 && UseallTypes.map((type, index) => (
                                <button key={index} onClick={() => handleFilter(type)}>
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {filteredDoctors.length > 0 ? (
                    <div className="top_doctors">
                        {filteredDoctors.map((doctor, index) => (
                            <div
                                className="doctor"
                                key={index}
                                onClick={() => Navigate(`/doctor/${doctor._id}`)} // Navigate to doctor detail page
                                style={{ cursor: "pointer" }} // Indicating clickable item
                            >
                                <div className="img">
                                    <img
                                        src={doctor.profilepic || "https://res.cloudinary.com/dzalji6cp/image/upload/v1735307774/uploads/profilePic-1735307776476.png"}
                                        alt="Doctor Profile"
                                    />
                                </div>
                                <div className="desc">
                                    <div className="available">
                                        <p className="green-n"></p>
                                        <p>Available</p>
                                    </div>
                                    <p className="he">DR. {doctor.username}</p>
                                    <p>{doctor.job}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='ErrorP'>No doctors found :(</p> // If no doctors match the filter
                )}
            </div>
        </div>
    );
};

export default Doctors;
