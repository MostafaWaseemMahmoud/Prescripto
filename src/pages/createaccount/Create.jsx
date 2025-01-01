import React from 'react';
import Header from '../../component/Header/Header';
import './create.css';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const Navigate = useNavigate()
    const validateForm = async () => {
        const allFields = document.querySelectorAll("input");
        const allErrors = document.querySelectorAll(".error");
    
        // Validation logic (same as before)...
    
        const formData = new FormData();
        formData.append('username', allFields[0].value);
        formData.append('email', allFields[1].value);
        formData.append('phonenumber', allFields[2].value);
        formData.append('password', allFields[3].value);
        formData.append('illness', allFields[4].value);
    
        const fileInput = allFields[5];
        if (!fileInput.files || fileInput.files.length === 0) {
            alert("Please upload a profile picture.");
            return;
        }else{
            window.document.querySelector(".hh").textContent == "Image Uploded!"
        }
        formData.append('profilePic', fileInput.files[0]);
    
        // Log FormData for debugging
        for (const pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        const res = await axios.get("https://prescripto-backend.up.railway.app/mng/allpatients");
        for (let i = 0; i < res.data.length; i++) {
            const element = res.data[i];
            if(element.email == allFields[1].value){
                console.log("This User Already Exist");
                window.localStorage.setItem("patient" , element._id);
                Navigate("/")
                return
            }
        } 
    
        try {
            const response = await axios.post(
                "https://prescripto-backend.up.railway.app/signup/patient",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Response: ", response.data);
            window.localStorage.setItem("patient" , response.data._id);
            window.location.reload();
            Navigate("/")
        } catch (error) {
            console.error("Error: ", error.response ? error.response.data : error.message);
            alert("Error creating account. Please try again.");
        }
    };

    return (
        <div className='container'>
            <div className="login-field">
                <div className="login">
                    <h1>Create Account</h1>
                    <p>Please sign up to book an appointment</p>
                    <form>
                        <div className="field">
                            <span>Full Name</span>
                            <br />
                            <input type="text" required />
                            <span className="error">
                                <p className="red-dot"></p>
                                <p>Please Fill This Field</p>
                            </span>
                        </div>
                        <div className="field">
                            <span>Email</span>
                            <br />
                            <input type="email" required />
                            <span className="error">
                                <p className="red-dot"></p>
                                <p>Please Fill This Field</p>
                            </span>
                            <span className="error">
                                <p className="red-dot"></p>
                                <p>Please Enter A Valid Email</p>
                            </span>
                        </div>
                        <div className="field">
                            <span>Phone Number</span>
                            <br />
                            <input type="text" required />
                            <span className="error">
                                <p className="red-dot"></p>
                                <p>Please Enter A Valid Phone Number</p>
                            </span>
                        </div>
                        <div className="field">
                            <span>Password</span>
                            <br />
                            <input type="password" required />
                            <span className="error">
                                <p className="red-dot"></p>
                                <p>Please Fill This Field</p>
                            </span>
                        </div>
                        <div className="field">
                            <span>Illness</span>
                            <br />
                            <input type="text" required />
                            <span className="error">
                                <p className="red-dot"></p>
                                <p>Please Fill This Field</p>
                            </span>
                        </div>
                        <div className="field1">
                            <label htmlFor="fileField" className='hh'>Upload Profile Image</label>
                            <input type="file" id="fileField" required />
                        </div>
                        <button type="button" onClick={validateForm}>
                            Create account
                        </button>
                    </form>
                    <p className="outLink">Are You Doctor? <a onClick={()=>Navigate("/create/doctor")}>Create Doctor Account</a></p>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
