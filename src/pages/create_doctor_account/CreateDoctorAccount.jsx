import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './createdoctoraccount.css';

const CreateDoctorAccount = () => {
    const navigate = useNavigate();
    const [jobTypes, setJobTypes] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [selectedJob, setSelectedJob] = useState("");

    useEffect(() => {
        const fetchJobTypes = async () => {
            try {
                const res = await axios.get("https://prescripto-backend.up.railway.app/def/page");
                setJobTypes(res.data.types || []);
            } catch (error) {
                console.error("Error fetching job types:", error);
                alert("Failed to load job types. Please try again later.");
            }
        };
        fetchJobTypes();
    }, []);

    const validateForm = async () => {
        const allFields = document.querySelectorAll("input");
        const formData = new FormData();

        const requiredFields = [
            { key: "username", index: 0, message: "Full Name is required" },
            { key: "email", index: 1, message: "Valid Email is required" },
            { key: "phonenumber", index: 2, message: "Phone Number is required" },
            { key: "password", index: 3, message: "Password is required" },
            { key: "age", index: 4, message: "Age is required" },
            { key: "appoimentprise", index: 5, message: "Appointment Price is required" },
            { key: "about", index: 6, message: "About is required" },
            { key: "location", index: 7, message: "Location is required" },
        ];

        const errors = {};
        requiredFields.forEach(({ key, index, message }) => {
            if (!allFields[index]?.value) {
                errors[key] = message;
            } else {
                formData.append(key, allFields[index].value);
            }
        });

        if (!selectedJob) {
            errors.job = "Please select a job type";
        } else {
            formData.append("job", selectedJob);
        }

        const fileInput = document.getElementById("fileField");
        if (!fileInput?.files || fileInput.files.length === 0) {
            errors.profilePic = "Profile picture is required";
        } else {
            formData.append('profilePic', fileInput.files[0]);
        }

        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        // Check if doctor already exists
        try {
            const response = await axios.get("https://prescripto-backend.up.railway.app/mng/alldoctors");
            const existingDoctor = response.data.find((doctor) => doctor.email === allFields[1].value);
            if (existingDoctor) {
                window.localStorage.setItem("doctor", existingDoctor._id);
                return;
            }
        } catch (error) {
            console.error("Error checking existing doctor:", error);
            return;
        }

        // Submit form
        try {
            await axios.post(
                "https://prescripto-backend.up.railway.app/signup/doctor",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            alert("Your application has been submitted. Wait for admin approval.");
            window.localStorage.setItem("doctor_waiting", allFields[1].value);
            navigate("/");
        } catch (error) {
            console.error("Error submitting form:", error.response ? error.response.data : error.message);
            alert("Error creating account. Please try again.");
        }
    };

    return (
        <div className='container'>
            <div className="create-doctor-contaiener">
                <div className="login-field">
                    <div className="login">
                        <h1>Create Doctor Account</h1>
                        <p>Please sign up as a doctor to start working.</p>
                        <form>
                            {['Full Name', 'Email', 'Phone Number', 'Password', 'Age', 'Appointment Price', 'About', 'Location'].map((label, index) => (
                                <div className="field" key={index}>
                                    <span>{label}</span>
                                    <input 
                                        type={label === "Email" ? "email" : label === "Password" ? "password" : label === "Age" || label === "Appointment Price" ? "number" : "text"} 
                                    />
                                    {formErrors[label.toLowerCase().replace(/\s+/g, '')] && (
                                        <span className="error">
                                            <p className="red-dot"></p>
                                            <p>{formErrors[label.toLowerCase().replace(/\s+/g, '')]}</p>
                                        </span>
                                    )}
                                </div>
                            ))}
                            <div className="field">
                                <span>Job</span>
                                <select
                                    value={selectedJob}
                                    onChange={(e) => setSelectedJob(e.target.value)}
                                >
                                    <option value="">Select a job type</option>
                                    {jobTypes.map((type, index) => (
                                        <option key={index} value={type}>
                                            {type}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.job && (
                                    <span className="error">
                                        <p className="red-dot"></p>
                                        <p>{formErrors.job}</p>
                                    </span>
                                )}
                            </div>
                            <div className="field1">
                                <label htmlFor="fileField">Upload Profile Image</label>
                                <input type="file" id="fileField" />
                                {formErrors.profilePic && (
                                    <span className="error">
                                        <p className="red-dot"></p>
                                        <p>{formErrors.profilePic}</p>
                                    </span>
                                )}
                            </div>
                            <button type="button" onClick={validateForm}>
                                Create Doctor Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateDoctorAccount;
